using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace WebGameV1.Models
{
    public class Product
    {
        [Key]
        public int ProductID { get; set; }

        public string? ProductTitle { get; set; }


        [Required(ErrorMessage = "Mật khẩu là bắt buộc.")]
        [StringLength(20, ErrorMessage = "Mật khẩu phải có ít nhất {2} ký tự và tối đa {1} ký tự.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Tài khoản là bắt buộc.")]
        [StringLength(20, ErrorMessage = "Tài khoản  có ít nhất {2} ký tự và tối đa {1} ký tự.", MinimumLength = 6)]
        [Display(Name = "Tài khoản")]
        public string Username { get; set; }

       
        [Display(Name = "Mô tả")]
        public string? Description { get; set; }

     
        public string Status { get; set; } = "unavailable";

        [Required(ErrorMessage = "Giá tiền là bắt buộc.")]
        [Range(20000, 100000000, ErrorMessage = "Giá phải nằm trong khoảng từ 20.000 đến 100.000.000.")]
        [Display(Name = "Giá")]
        public double Price { get; set; }

        [Range(0, 1, ErrorMessage = "Giá phải nằm trong khoảng từ 0 đến 1 (tỷ lệ quy đổi 0.1 : 10%)")]
        public double? Discount { get; set; } = 0;

        public string? MainImageUrl { get; set; }
        public string? DetailImageUrl { get; set; }

        public DateOnly CreateDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public DateOnly? UpdateDate { get; set; }

        [Required(ErrorMessage = "Loại game là bắt buộc")]
        public int CategoryID { get; set; }

        [ValidateNever]

        [ForeignKey("CategoryID")]
        public Category Category { get; set; }

        [Required(ErrorMessage = "Loại phụ game là bắt buộc")]
        public int SubCategoryID { get; set; }

        [ValidateNever]

        [ForeignKey("SubCategoryID")]
        public SubCategory SubCategory { get; set; }
      

        public double CalculateDiscountedPrice()
        {
            if (Discount.HasValue && Discount.Value > 0)
            {
                return Price * (1 - Discount.Value);
            }
            return Price;
        }

       
        public string FormatPrice(double price)
        {
            return price.ToString("C0", new CultureInfo("vi-VN"));
        }

       
        public string GetFormattedOriginalPrice()
        {
            return FormatPrice(Price);
        }

     
        public string GetFormattedDiscountedPrice()
        {
            return FormatPrice(CalculateDiscountedPrice());
        }
    }
}
