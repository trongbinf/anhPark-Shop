using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebGameV1.Models;

namespace WebGameV1.DataAcess.Repository.IRepository
{
    public interface ICategory: IRepository<Category>
    {
        void Update(Category category);
    }
}
