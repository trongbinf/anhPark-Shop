using System.Threading.Tasks;

namespace WebGameV1.DataAcess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICategory Category { get; }
        IProduct Product { get; }
        ISlider Slider { get; }
        ISubCategory SubCategory { get; }
        Task SaveAsync(); 
    }
}
