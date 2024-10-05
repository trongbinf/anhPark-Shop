using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGameV1.DataAcess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICategory Category { get; }
		IProduct Product { get; }
		ISlider Slider  { get; }
		void Save();
    }
}
