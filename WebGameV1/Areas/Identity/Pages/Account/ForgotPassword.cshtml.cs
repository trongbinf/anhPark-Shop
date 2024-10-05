using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using WebGameV1.Models;
using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Identity.UI.Services;
using System.ComponentModel.DataAnnotations;
using WebGameV1.DataAcess.Repository.IRepository;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System.Drawing;

namespace WebGameV1.Areas.Identity.Pages.Account
{
    public class ForgotPasswordModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly ICacheService _cacheService;
        private const string CachePrefix = "PasswordReset:";
        public ForgotPasswordModel(UserManager<ApplicationUser> userManager, IEmailSender emailSender, ICacheService cacheService)
        {
            _userManager = userManager;
            _emailSender = emailSender;
            _cacheService = cacheService;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public string ReturnUrl { get; set; }

        public class InputModel
        {
            [Required(ErrorMessage = "Vui lòng nhập địa chỉ email.")]
            [EmailAddress(ErrorMessage = "Địa chỉ email không hợp lệ.")]
            public string Email { get; set; }
        }

        public void OnGet(string returnUrl = null)
        {
            ReturnUrl = returnUrl;
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
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
            else if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                ModelState.AddModelError(string.Empty, "Email này chưa được kích hoạt.");
                return Page();
            }

          
            var vietnamTime = DateTime.UtcNow.AddHours(7);
            var currentTime = vietnamTime;

            var cacheKey = CachePrefix + Input.Email+"Valid";
            var rateLimitData = await _cacheService.GetAsync<RateLimitData> (cacheKey);

            if (rateLimitData != null)
            {
                if ((currentTime - rateLimitData.LastAttempt).TotalMinutes < 1)
                {
                    ModelState.AddModelError(string.Empty, "Vui lòng đợi 1 phút trước khi gửi lại email.");
                    return Page();
                }

                
                if (rateLimitData.Attempts >= 5 && (currentTime - rateLimitData.FirstAttempt).TotalMinutes < 60)
                {
                    ModelState.AddModelError(string.Empty, "Bạn đã gửi quá nhiều yêu cầu. Vui lòng đợi 60 phút trước khi gửi lại.");
                    return Page();
                }

                
                if ((currentTime - rateLimitData.FirstAttempt).TotalMinutes >= 60)
                {
                    rateLimitData.Attempts = 0;
                }
            }
            else
            {
                rateLimitData = new RateLimitData();
            }

      
            rateLimitData.Attempts++;
            if (rateLimitData.FirstAttempt == DateTime.MinValue)
            {
                rateLimitData.FirstAttempt = currentTime;
            }
            rateLimitData.LastAttempt = currentTime;

            await _cacheService.SetAsync(cacheKey, rateLimitData, TimeSpan.FromMinutes(60));

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
            var callbackUrl = Url.Page(
                "/Account/ResetPassword",
                pageHandler: null,
                values: new { area = "Identity", code, email = user.Email },
                protocol: Request.Scheme);

            var tokenExpiry = currentTime.AddMinutes(5);           
            await _cacheService.SetAsync($"{CachePrefix}{code}", new TokenData { Token = code, Expiry = tokenExpiry }, TimeSpan.FromMinutes(5));

            var emailSubject = "Đặt Lại Mật Khẩu";
            var emailBody = $@"
       <!DOCTYPE html>
<html lang=""vi"">
<head>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
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
                <h1>{emailSubject}</h1>
            </div>

       <div class='content'>
            <h2>Chào {user.UserName},</h2>
            <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
            <p>Vui lòng nhấp vào liên kết dưới đây để đặt lại mật khẩu:</p>
            <p><a href='{HtmlEncoder.Default.Encode(callbackUrl)}'class='button'>Đặt lại mật khẩu</a></p>
            <p>Lưu ý: Mã xác nhận này sẽ hết hạn sau 5 phút. Nếu liên kết không hoạt động, hãy yêu cầu gửi lại email xác nhận.</p
            <p>Trân trọng,<br>Đội ngũ hỗ trợ WebGameV1<p>
           
       <div>

       </div>
       <div class='footer'>
        <p>Nếu bạn không yêu cầu xác nhận này, vui lòng bỏ qua email này.</p>
       </div>
</body>
</html>
";

            await _emailSender.SendEmailAsync(
                Input.Email,
                emailSubject,
                emailBody);

            return RedirectToPage("./ForgotPasswordConfirmation");
        }

    }
}
