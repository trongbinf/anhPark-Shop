using Microsoft.AspNetCore.Http;
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
    public class SliderVM
    {
        public Slider slider { get; set; }
      
        [NotMapped]
        public IFormFile? ImageUrl { get; set; }
    }
}
