using System.Threading.Tasks;
using WebGameV1.Models;

namespace WebGameV1.DataAcess.Repository.IRepository
{
    public interface ICategory : IRepository<Category>
    {
        Task UpdateAsync(Category category);
        Task<Category> GetAsync(int categoryId);
    }
}
