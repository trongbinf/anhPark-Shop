using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Webbansach.DataAcess.Repository;
using WebGameV1.DataAcess.Data;
using WebGameV1.DataAcess.Repository.IRepository;
using WebGameV1.Models;

namespace WebGameV1.DataAcess.Repository
{
	public class ProductRepository:Repository<Product>, IProduct
	{
		private readonly ApplicationDBContext _db;

		public ProductRepository(ApplicationDBContext db) : base(db)
		{
			_db = db;
		}

		public void Save()
		{
			_db.SaveChanges();
		}

		public void Update(Product product)
		{
			var objfromDb = _db.Products.FirstOrDefault(a => a.ProductID == product.ProductID);
			if (objfromDb != null)
			{
				objfromDb.ProductTitle = product.ProductTitle;
				objfromDb.Description = product.Description;			
				objfromDb.Price = product.Price;
				objfromDb.Discount = product.Discount;
				objfromDb.Status = product.Status;
                objfromDb.Password = product.Password;
                objfromDb.Username = product.Username;
				objfromDb.CategoryID = product.CategoryID;
				objfromDb.UpdateDate = DateOnly.FromDateTime(DateTime.Now);
				objfromDb.Password = product.Password;

				if (objfromDb.MainImageUrl != null)
				{
					objfromDb.MainImageUrl = product.MainImageUrl;
				}
			
				if (objfromDb.DetailImageUrl != null)
				{
					objfromDb.DetailImageUrl = product.DetailImageUrl;
				}
			}

			_db.Products.Update(objfromDb);
		}
	}
}
