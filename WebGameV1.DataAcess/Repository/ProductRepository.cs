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
    public class ProductRepository : Repository<Product>, IProduct
    {
        private readonly ApplicationDBContext _db;

        public ProductRepository(ApplicationDBContext db) : base(db)
        {
            _db = db;
        }

        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }  

        public async Task UpdateAsync(Product product)
        {
            var objFromDb = await _db.Products.FindAsync(product.ProductID);
            if (objFromDb != null)
            {
              
                objFromDb.Description = product.Description;
                objFromDb.Price = product.Price;
                objFromDb.Discount = product.Discount;
                objFromDb.Status = product.Status;
                objFromDb.Username = product.Username;
                objFromDb.Password = product.Password;
                objFromDb.CategoryID = product.CategoryID;
                objFromDb.SubCategory = product.SubCategory;
                objFromDb.UpdateDate = DateOnly.FromDateTime(DateTime.Now);

                if (!string.IsNullOrEmpty(product.MainImageUrl))
                {
                    objFromDb.MainImageUrl = product.MainImageUrl;
                }

                if (!string.IsNullOrEmpty(product.DetailImageUrl))
                {
                    objFromDb.DetailImageUrl = product.DetailImageUrl;
                }
            }
        }
     }
    }
