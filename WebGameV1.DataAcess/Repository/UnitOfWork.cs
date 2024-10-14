using System.Threading.Tasks;
using Webbansach.DataAcess.Repository;
using WebGameV1.DataAcess.Data;
using WebGameV1.DataAcess.Repository.IRepository;

namespace WebGameV1.DataAcess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        public ICategory Category { get; private set; }
        public IProduct Product { get; private set; }
        public ISlider Slider { get; private set; }
        public ISubCategory SubCategory { get; private set; }

        private readonly ApplicationDBContext _db;

        public UnitOfWork(ApplicationDBContext db)
        {
            _db = db;
            Category = new CategoryRepository(_db);
            Product = new ProductRepository(_db);
            Slider = new SliderRepository(_db);
            SubCategory = new SubCategoryRepository(_db);
        }

        public async Task SaveAsync() // Changed to asynchronous method
        {
            await _db.SaveChangesAsync();
        }
    }
}
