// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable

using System;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using WebGameV1.Models;
using WebGameV1.DataAcess.Repository.IRepository;

namespace WebGameV1.Areas.Identity.Pages.Account
{

    public class ResetPasswordModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICacheService _cacheService;
        private const string CachePrefix = "PasswordReset:";

        public ResetPasswordModel(UserManager<ApplicationUser> userManager, ICacheService cacheService)
        {
            _userManager = userManager;
            _cacheService = cacheService;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Required(ErrorMessage = "Email là bắt buộc.")]
            [EmailAddress(ErrorMessage = "Email không hợp lệ.")]
            public string Email { get; set; }

            [Required(ErrorMessage = "Mật khẩu là bắt buộc.")]
            [Display(Name = "Mật khẩu")]
            [CustomPasswordValidation(ErrorMessage = "Mật khẩu phải bắt đầu bằng chữ cái viết hoa và chứa ít nhất một ký tự đặc biệt.")]
            [StringLength(100, ErrorMessage = "Mật khẩu phải có ít nhất {2} ký tự và tối đa {1} ký tự.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [DataType(DataType.Password)]
            [Required(ErrorMessage = " khẩu là bắt buộc.")]
            [Display(Name = "Xác nhận mật khẩu")]
            [Compare("Password", ErrorMessage = "Mật khẩu và xác nhận mật khẩu không khớp.")]
            public string ConfirmPassword { get; set; }

            [Required(ErrorMessage = "Mã xác nhận là bắt buộc.")]
            public string Code { get; set; }
        }

        public async Task<IActionResult> OnGetAsync(string code = null, string email = null)
        {

            var vietnamTime = DateTime.UtcNow.AddHours(7);
            var currentTime = vietnamTime;

            if (code == null || email == null)
            {
                TempData["Message"] = "Không hợp lệ! Xin vui lòng thử lại.";
                return RedirectToPage("./ResetPasswordConfirmation", new { success = false });
            }

            var decodedCode = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var tokenData = await _cacheService.GetAsync<TokenData>($"{CachePrefix}{code}");

            if (tokenData == null || tokenData.Expiry < currentTime)
            {
                TempData["Message"] = "Mã xác nhận đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu đặt lại mật khẩu mới.";
                return RedirectToPage("./ResetPasswordConfirmation", new { success = false });
            }

            Input = new InputModel
            {
                Code = decodedCode,
                Email = email,
            };

            return Page();
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
                TempData["Message"] = "Không tìm thấy người dùng. Vui lòng thử lại.";
                return RedirectToPage("./ResetPasswordConfirmation", new { success = false });
            }

            var result = await _userManager.ResetPasswordAsync(user, Input.Code, Input.Password);
            if (result.Succeeded)
            {
                await _cacheService.RemoveAsync($"{CachePrefix}{Input.Code}");
                TempData["Message"] = "Đặt lại mật khẩu thành công.";
                return RedirectToPage("./ResetPasswordConfirmation", new { success = true });
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            TempData["Message"] = "Đặt lại mật khẩu thất bại. Vui lòng thử lại.";
            return RedirectToPage("./ResetPasswordConfirmation", new { success = false });
        }

    }
}