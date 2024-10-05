using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Webbansach.DataAcess.Repository;
using WebGameV1.DataAcess.Data;
using WebGameV1.DataAcess.Repository.IRepository;
using WebGameV1.Models;

namespace WebGameV1.DataAcess.Repository
{
    public class CategoryRepository : Repository<Category>, ICategory
    {
        private readonly ApplicationDBContext _db;

        public CategoryRepository(ApplicationDBContext db) : base(db)
        {
            _db = db;

        } 

       
        public void Save()
        {
            _db.SaveChanges();
        }
        public void Update(Category category)
        {
             category.UpdateDate = DateOnly.FromDateTime(DateTime.Now);
            _db.Categories.Update(category);
        }

        
}
}
