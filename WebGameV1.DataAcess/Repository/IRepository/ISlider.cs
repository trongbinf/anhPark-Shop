using System.Threading.Tasks;
using Webbansach.DataAcess.Repository;
using WebGameV1.Models;

namespace WebGameV1.DataAcess.Repository.IRepository
{
    public interface ISlider : IRepository<Slider>
    {     
        Task UpdateAsync(Slider slider); 
    }
}
