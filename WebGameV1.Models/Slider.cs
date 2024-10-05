using System;
using System.ComponentModel.DataAnnotations;

namespace WebGameV1.Models
{
	public class Slider
	{

		[Key]
		public int Id { get; set; }

        [Required(ErrorMessage = "Tiêu đề slider là bắt buộc.")]
        public string Title { get; set; }

		public string Status { get; set; } = "unavailable";

		public string? ImageUrl { get; set; }

		public string? LinkUrl { get; set; }

		public DateOnly CreateDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

		public DateOnly? UpdateDate { get; set; }
		
		public DateOnly? StartDate { get; set; }
		public DateOnly? EndDate { get; set; }   
	}
}
