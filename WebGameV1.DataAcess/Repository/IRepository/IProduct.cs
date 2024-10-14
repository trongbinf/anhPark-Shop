using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebGameV1.Models;

namespace WebGameV1.DataAcess.Repository.IRepository
{
	public interface IProduct: IRepository<Product>
	{
        Task UpdateAsync(Product product);
	}
}
