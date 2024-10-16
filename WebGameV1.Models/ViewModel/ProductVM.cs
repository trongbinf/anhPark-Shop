﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGameV1.Models.ViewModel
{
    public class ProductVM
    {
        public Product product { get; set; }
        public SubCategory sub { get; set; }
        public IEnumerable<Product> Products { get; set; } = new List<Product>();

        [ValidateNever]
        public IEnumerable<SelectListItem> CategoryList { get; set; }


        [ValidateNever]
        public IEnumerable<SelectListItem> SubCategoryList { get; set; }

        [NotMapped]
        public IFormFile? MainImage { get; set; }

        [NotMapped]
        public List<IFormFile>? DetailImages { get; set; }
    }
}
