using System;
using System.Linq;
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

        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }


        public async Task UpdateAsync(Slider slider)
        {
            var objFromDb = await _db.Sliders.FindAsync(slider.Id);
            if (objFromDb != null)
            {
                objFromDb.Title = slider.Title;
                objFromDb.LinkUrl = slider.LinkUrl;
                objFromDb.ImageUrl = slider.ImageUrl;
                objFromDb.Status = slider.Status;
                objFromDb.UpdateDate = DateOnly.FromDateTime(DateTime.Now);
                objFromDb.StartDate = slider.StartDate;
                objFromDb.EndDate = slider.EndDate;
            }
        }
    }
}
