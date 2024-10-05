using System;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using WebGameV1.Models;
using WebGameV1.DataAcess.Repository.IRepository;

namespace WebGameV1.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class ResendEmailConfirmationModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly ICacheService _cacheService;
        private const string CachePrefix = "EmailConfirmation:";

        public ResendEmailConfirmationModel(UserManager<ApplicationUser> userManager, IEmailSender emailSender, ICacheService cacheService)
        {
            _userManager = userManager;
            _emailSender = emailSender;
            _cacheService = cacheService;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Required(ErrorMessage = "Vui lòng nhập địa chỉ email.")]
            [EmailAddress(ErrorMessage = "Địa chỉ email không hợp lệ.")]
            public string Email { get; set; }
        }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var user = await _userManager.FindByEmailAsync(Input.Email);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "Email này không tồn tại trong hệ thống.");
                return Page();
            }

            if (user.EmailConfirmed)
            {
                ModelState.AddModelError(string.Empty, "Email này của bạn đã được kích hoạt.");
                return Page();
            }

            var cacheKey = CachePrefix + Input.Email;
            var rateLimitData = await _cacheService.GetAsync<RateLimitData>(cacheKey);

          
            var vietnamTime = DateTime.UtcNow.AddHours(7);
            var currentTime = vietnamTime;

            if (rateLimitData != null)
            {
                // Kiểm tra nếu hơn 1 phút đã trôi qua kể từ lần thử cuối
                if ((currentTime - rateLimitData.LastAttempt).TotalMinutes < 1)
                {
                    ModelState.AddModelError(string.Empty, "Vui lòng đợi 1 phút trước khi gửi lại email.");
                    return Page();
                }

                // Kiểm tra nếu số lần thử đã vượt quá giới hạn
                if (rateLimitData.Attempts >= 5 && (currentTime - rateLimitData.FirstAttempt).TotalMinutes < 60)
                {
                    ModelState.AddModelError(string.Empty, "Bạn đã gửi quá nhiều yêu cầu. Vui lòng đợi 60 phút trước khi gửi lại.");
                    return Page();
                }

                // Đặt lại số lần thử nếu đã hơn 60 phút
                if ((currentTime - rateLimitData.FirstAttempt).TotalMinutes >= 60)
                {
                    rateLimitData.Attempts = 0;
                }
            }
            else
            {
                rateLimitData = new RateLimitData();
            }

            // Tăng số lần thử
            rateLimitData.Attempts++;
            if (rateLimitData.FirstAttempt == DateTime.MinValue)
            {
                rateLimitData.FirstAttempt = currentTime;
            }
            rateLimitData.LastAttempt = currentTime;

            await _cacheService.SetAsync(cacheKey, rateLimitData, TimeSpan.FromMinutes(60));

            var userId = await _userManager.GetUserIdAsync(user);
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
            var callbackUrl = Url.Page(
                "/Account/ConfirmEmail",
                pageHandler: null,
                values: new { userId = userId, code = code },
                protocol: Request.Scheme);

      
            var tokenExpiry = currentTime.AddMinutes(5); 
            await _cacheService.SetAsync($"{CachePrefix}{userId}", new TokenData { Token = code, Expiry = tokenExpiry }, TimeSpan.FromMinutes(5));
            var emailSubject = "Xác nhận email của bạn.";
            var emailBody = $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <style>
        body {{
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }}
        .container {{
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        .header {{
            text-align: center;
            padding-bottom: 20px;
        }}
        .header img {{
            max-width: 150px;
        }}
        .content {{
            font-size: 16px;
            line-height: 1.5;
        }}
        .button {{
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
           color: #fff !important;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 4px;
            text-align: center;
        }}
        .footer {{
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #777;
        }}
       
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>Xác Nhận Email</h1>
        </div>
        <div class='content'>
            <p>Chào bạn,</p>
            <p>Để hoàn tất quá trình đăng ký, vui lòng xác nhận địa chỉ email của bạn bằng cách nhấp vào liên kết dưới đây:</p>
            <p><a href='{HtmlEncoder.Default.Encode(callbackUrl)}' class='button'>Xác Nhận Email</a></p>
            <p>Lưu ý: Mã xác nhận này sẽ hết hạn sau 5 phút. Nếu liên kết không hoạt động, hãy yêu cầu gửi lại email xác nhận.</p>
            <p>Xin cảm ơn!</p>
        </div>
        <div class='footer'>
            <p>Nếu bạn không yêu cầu xác nhận này, vui lòng bỏ qua email này.</p>
        </div>
    </div>
</body>
</html>";

            await _emailSender.SendEmailAsync(
                Input.Email,
               emailSubject,
                emailBody);

            ModelState.AddModelError(string.Empty, "Đã gửi email xác minh. Vui lòng kiểm tra email của bạn.");
            return Page();
        }

      

       
    }
}
