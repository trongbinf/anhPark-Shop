using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using WebGameV1.DataAcess.Repository.IRepository;
using WebGameV1.Models;

namespace WebGameV1.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class ConfirmEmailModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICacheService _cacheService;
        private const string CachePrefix = "EmailConfirmation:";

        public ConfirmEmailModel(UserManager<ApplicationUser> userManager, ICacheService cacheService)
        {
            _userManager = userManager;
            _cacheService = cacheService;
        }

        [TempData]
        public string StatusMessage { get; set; }

        public async Task<IActionResult> OnGetAsync(string userId, string code)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(code))
            {
                return RedirectToPage("/Index");
            }

            var cacheKey = $"{CachePrefix}{userId}";         
            var tokenData = await _cacheService.GetAsync<TokenData>(cacheKey);         
            var vietnamTime = DateTime.UtcNow.AddHours(7);
           

            if (tokenData == null || tokenData.Expiry < vietnamTime || tokenData.Token != code)
            {
                StatusMessage = "Mã xác nhận không hợp lệ hoặc đã hết hạn.";
                return Page();
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound($"Không thể tải người dùng với ID '{userId}'.");
            }

            try
            {
                code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
               
               
                var result = await _userManager.ConfirmEmailAsync(user, code);
                if (result.Succeeded)
                {
                    StatusMessage = "Cảm ơn bạn đã xác nhận email.";
                    await _cacheService.RemoveAsync(cacheKey); // Xóa token sau khi xác nhận thành công
                }
                else
                {
                    StatusMessage = "Xác nhận email không thành công.";
                }
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework here)
                StatusMessage = "Đã xảy ra lỗi khi xác nhận email của bạn. Vui lòng thử lại sau.";
            }

            return Page();
        }

      
    }
}
