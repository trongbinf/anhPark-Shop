using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGameV1.Models
{
    public class Category
    {
        [Key]
        public int CategoryID { get; set; }

        [Required(ErrorMessage = "Tên sản loại sản phẩm là bắt buộc")]
        public string CategoryName { get; set; }
        
        public DateOnly CreateDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public DateOnly? UpdateDate { get; set; } 

    }
}
