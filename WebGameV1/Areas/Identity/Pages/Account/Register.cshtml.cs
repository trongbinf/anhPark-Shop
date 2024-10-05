using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading;
using System.Threading.Tasks;
using WebGameV1.DataAcess.Repository.IRepository;
using WebGameV1.Models;
using WebGameV1.Utility;

namespace WebGameV1.Areas.Identity.Pages.Account
{
    
    public class RegisterModel : PageModel
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserStore<ApplicationUser> _userStore;
        private readonly IUserEmailStore<ApplicationUser> _emailStore;
        private readonly ILogger<RegisterModel> _logger;
        private readonly IEmailSender _emailSender;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ICacheService _cacheService;
        private const string CachePrefix = "EmailConfirmation:";
        public RegisterModel(
            UserManager<ApplicationUser> userManager,
            IUserStore<ApplicationUser> userStore,
            SignInManager<ApplicationUser> signInManager,
            ILogger<RegisterModel> logger,
            IEmailSender emailSender,
            RoleManager<IdentityRole> roleManager,
            ICacheService cacheService)
        {
            _userManager = userManager;
            _userStore = userStore;
            _emailStore = GetEmailStore();
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
            _roleManager = roleManager;
            _cacheService = cacheService;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public string ReturnUrl { get; set; }
        public IList<AuthenticationScheme> ExternalLogins { get; set; }

       
        public class InputModel
        {
            [Required(ErrorMessage = "Email là bắt buộc.")]
            [EmailAddress(ErrorMessage = "Địa chỉ email không hợp lệ.")]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required(ErrorMessage = "Mật khẩu là bắt buộc.")]
            [StringLength(20, ErrorMessage = "Mật khẩu phải có ít nhất {2} ký tự và tối đa {1} ký tự.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "Mật khẩu")]
            public string Password { get; set; }

            [Required(ErrorMessage = "Xác nhận mật khẩu là bắt buộc.")]
            [DataType(DataType.Password)]           
            [Compare("Password", ErrorMessage = "Mật khẩu và mật khẩu xác nhận không khớp.")]
            public string ConfirmPassword { get; set; }

            [Required(ErrorMessage =" Tên hiển thị là bắt buộc.")]
            [Display(Name = "Tên hiển thị")]
            public string Name { get; set; }
        }



        public async Task OnGetAsync(string returnUrl = null)
        {
            if (!_roleManager.RoleExistsAsync(SD.Role_User_Admin).GetAwaiter().GetResult())
            {
                await _roleManager.CreateAsync(new IdentityRole(SD.Role_User_Admin));
                await _roleManager.CreateAsync(new IdentityRole(SD.Role_User_Customer));
                await _roleManager.CreateAsync(new IdentityRole(SD.Role_User_Manager));
                
            }

            ReturnUrl = returnUrl;
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl ??= Url.Content("~/");
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            if (ModelState.IsValid)
            {
                var user = CreateUser();
                await _userStore.SetUserNameAsync(user, Input.Email, CancellationToken.None);
                await _emailStore.SetEmailAsync(user, Input.Email, CancellationToken.None);
                user.Name = Input.Name;

               
                var vietnamTime = DateTime.UtcNow.AddHours(7);
                var currentTime = vietnamTime;
                user.RegistrationDate = currentTime;

                var result = await _userManager.CreateAsync(user, Input.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User created a new account with password.");

                    // Assign a default role to the user
                    await _userManager.AddToRoleAsync(user, SD.Role_User_Customer);

                    // Generate the email confirmation token
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

                    var callbackUrl = Url.Page(
                        "/Account/ConfirmEmail",
                        pageHandler: null,
                        values: new { area = "Identity", userId = user.Id, code = code, returnUrl = returnUrl },
                        protocol: Request.Scheme);

                    // Lưu token với thời hạn hết hạn
                    var tokenExpiry = currentTime.AddMinutes(5); // Token có hiệu lực trong 5 phút
                    await _cacheService.SetAsync($"{CachePrefix}{user.Id}", new TokenData { Token = code, Expiry = tokenExpiry }, TimeSpan.FromMinutes(5));

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


                    if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    {
                        return RedirectToPage("RegisterConfirmation", new { email = Input.Email, returnUrl = returnUrl });
                    }
                    else
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        return LocalRedirect(returnUrl);
                    }
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }

        private ApplicationUser CreateUser()
        {
            try
            {
                return Activator.CreateInstance<ApplicationUser>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(ApplicationUser)}'. " +
                    $"Ensure that '{nameof(ApplicationUser)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }

        private IUserEmailStore<ApplicationUser> GetEmailStore()
        {
            if (!_userManager.SupportsUserEmail)
            {
                throw new NotSupportedException("The default UI requires a user store with email support.");
            }
            return (IUserEmailStore<ApplicationUser>)_userStore;
        }
    }
}
