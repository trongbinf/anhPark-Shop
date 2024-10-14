using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Text.Json.Serialization;

namespace WebGameV1.Models
{
    public class SubCategory
    {

        [Key]
        public int SubCategoryID { get; set; }

        [Display(Name = "Danh mục con")]
        [Required(ErrorMessage = "Danh mục con là bắt buộc")]
        [StringLength(30, ErrorMessage = "Danh mục con phải có ít nhất {2} ký tự và tối đa {1} ký tự.", MinimumLength = 2)]
        public string SubCategoryName { get; set; }
        public int CategoryID { get; set; }

        [ForeignKey("CategoryID")]    
        [ValidateNever]
        [JsonIgnore]  
        public virtual Category Category { get; set; }

    }
}
