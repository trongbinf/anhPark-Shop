using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Webbansach.DataAcess.Repository;
using WebGameV1.Models;

namespace WebGameV1.DataAcess.Repository.IRepository
{
	public interface ISlider: IRepository<Slider>
	{
		void Update(Slider slider);
	}
}
