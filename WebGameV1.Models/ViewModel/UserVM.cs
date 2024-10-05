using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace WebGameV1.Models.ViewModel
{
    public class UserVM
    {
        public ApplicationUser user { get; set; }
    
        public List<string> SelectedRoleIds { get; set; }

        [ValidateNever]
        public IEnumerable<SelectListItem> RoleList { get; set; }


        [Required(ErrorMessage = "Mật khẩu là bắt buộc.")]
        [StringLength(20, ErrorMessage = "Mật khẩu phải có ít nhất {2} ký tự và tối đa {1} ký tự.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Xác nhận mật khẩu là bắt buộc.")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Mật khẩu và mật khẩu xác nhận không khớp.")]
        public string ConfirmPassword { get; set; }

        public bool UpdatePassword { get; set; }
    }
}
