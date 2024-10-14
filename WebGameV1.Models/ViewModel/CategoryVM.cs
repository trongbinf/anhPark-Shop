using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGameV1.Models.ViewModel
{
    public class CategoryVM
    {
        public Category Category { get; set; }
        [ValidateNever]
        public SubCategory SubCategory { get; set; }
        [ValidateNever]
        public IEnumerable<SubCategory> SubCategories { get; set; }
    }
}
