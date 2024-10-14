using System.Collections.Generic;
using System.Threading.Tasks;
using WebGameV1.Models;

namespace WebGameV1.DataAcess.Repository.IRepository
{
    public interface ISubCategory : IRepository<SubCategory>
    {
        Task UpdateAsync(SubCategory category); 

        Task<IEnumerable<SubCategory>> GetAllByCategoryIDAsync(int categoryId); 
    }
}
