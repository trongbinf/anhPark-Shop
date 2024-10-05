
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebGameV1.Models
{
    public class ApplicationUser:IdentityUser
    {
        [Required(ErrorMessage = "Tên là bắt buộc.")]
        public string Name { get; set; }

        public DateTime? RegistrationDate { get; set; } 
    }
}
