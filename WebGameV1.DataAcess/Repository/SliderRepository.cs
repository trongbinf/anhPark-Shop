using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Webbansach.DataAcess.Repository;
using WebGameV1.DataAcess.Data;
using WebGameV1.DataAcess.Repository.IRepository;
using WebGameV1.Models;

namespace WebGameV1.DataAcess.Repository
{
	public class SliderRepository : Repository<Slider>, ISlider
	{
		private readonly ApplicationDBContext _db;

		public SliderRepository(ApplicationDBContext db) : base(db)
		{
			_db = db;
		}
		public void Save()
		{
			_db.SaveChanges();
		}
		public void Update(Slider slider)
		{
			var objfromDb = _db.Sliders.FirstOrDefault(a => a.Id == slider.Id);

			if (objfromDb != null)
			{
				objfromDb.Title = slider.Title;
				objfromDb.LinkUrl = slider.LinkUrl;
				objfromDb.ImageUrl = slider.ImageUrl;
				objfromDb.Status = slider.Status;
				objfromDb.UpdateDate = DateOnly.FromDateTime(DateTime.Now);
				objfromDb.StartDate = slider.StartDate;
				objfromDb.EndDate = slider.EndDate;


			}
		}
	}
}
