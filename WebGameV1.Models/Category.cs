using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebGameV1.Models
{
    public class Category
    {
        [Key]
        public int CategoryID { get; set; }
        [Display(Name = "Loại trò chơi")]
        [Required(ErrorMessage = "Tên sản loại trò chơi là bắt buộc")]
        [StringLength(30, ErrorMessage = "Tên loại trò chơi phải có ít nhất {2} ký tự và tối đa {1} ký tự.", MinimumLength = 2)]
        public string CategoryName { get; set; }
        
        public DateOnly CreateDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public DateOnly? UpdateDate { get; set; }
        [ValidateNever]
        [JsonIgnore] 
        public virtual ICollection<SubCategory> SubCategories { get; set; }
    }
}
