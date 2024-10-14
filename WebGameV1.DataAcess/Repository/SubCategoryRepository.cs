using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webbansach.DataAcess.Repository;
using WebGameV1.DataAcess.Data;
using WebGameV1.DataAcess.Repository.IRepository;
using WebGameV1.Models;

namespace WebGameV1.DataAcess.Repository
{
    public class SubCategoryRepository : Repository<SubCategory>, ISubCategory
    {
        private readonly ApplicationDBContext _db;

        public SubCategoryRepository(ApplicationDBContext db) : base(db)
        {
            _db = db;
        }

        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(SubCategory subCategory)
        {
            _db.SubCategories.Update(subCategory);
        }

        public async Task<IEnumerable<SubCategory>> GetAllByCategoryIDAsync(int categoryId)
        {
            return await _db.SubCategories
                .Where(sc => sc.CategoryID == categoryId)
                .ToListAsync();
        }
    }
}
