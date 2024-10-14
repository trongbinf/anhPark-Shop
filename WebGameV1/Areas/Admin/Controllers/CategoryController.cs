using Microsoft.AspNetCore.Mvc;
using WebGameV1.DataAcess.Repository.IRepository;
using WebGameV1.Models;
using WebGameV1.Models.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebGameV1.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class CategoryController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public CategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IActionResult> Index()
        {
            IEnumerable<Category> listCategory = await _unitOfWork.Category.GetAllAsync(includeProperties: "SubCategories");
            return View(listCategory);
        }

        public async Task<IActionResult> Detail(int? id)
        {
            if (id == null || id == 0)
            {
                return NotFound();
            }

            var category = await _unitOfWork.Category.GetFirstOrDefaultAsync(x => x.CategoryID == id, includeProperties: "SubCategories");

            if (category == null)
            {
                return NotFound();
            }

            var categoryVM = new CategoryVM
            {
                Category = category,
                SubCategories = category.SubCategories
            };

            return View(categoryVM);
        }

        public async Task<IActionResult> Upsert(int? id)
        {
            var categoryVM = new CategoryVM
            {
                Category = new Category(),
                SubCategories = new List<SubCategory>() 
            };

            if (id == null || id == 0)
            {
                return View(categoryVM);
            }
            else
            {
                var category = await _unitOfWork.Category.GetFirstOrDefaultAsync(x => x.CategoryID == id, includeProperties: "SubCategories");
                if (category != null)
                {
                    categoryVM.Category = category;
                    categoryVM.SubCategories = category.SubCategories; 
                }
                return View(categoryVM);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddSubCategory(string subCategoryName, int categoryID)
        {
            if (!string.IsNullOrEmpty(subCategoryName) && categoryID > 0)
            {
                var subCategory = new SubCategory
                {
                    SubCategoryName = subCategoryName.ToUpper(),
                    CategoryID = categoryID
                };

                await _unitOfWork.SubCategory.AddAsync(subCategory);
                await _unitOfWork.SaveAsync();

          
                var categoryVM = new CategoryVM
                {
                    Category = await _unitOfWork.Category.GetAsync(categoryID),
                    SubCategories = await _unitOfWork.SubCategory.GetAllByCategoryIDAsync(categoryID)
                };
                TempData["Success"] = "Cập nhật danh mục trò chơi thành công!";
                return View("Upsert", categoryVM);
            }

            return NotFound();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditSubCategory(int subCategoryID, string subCategoryName)
        {
            if (!string.IsNullOrEmpty(subCategoryName) && subCategoryID > 0)
            {
                var subCategoryFromDb = await _unitOfWork.SubCategory.GetFirstOrDefaultAsync(s => s.SubCategoryID == subCategoryID);
                if (subCategoryFromDb != null)
                {
                    subCategoryFromDb.SubCategoryName = subCategoryName;
                    await _unitOfWork.SubCategory.UpdateAsync(subCategoryFromDb);
                    await _unitOfWork.SaveAsync();
                    TempData["Success"] = "Cập nhật danh mục con thành công!";
                }
                else
                {
                    ModelState.AddModelError("", "Danh mục con không tìm thấy.");
                }
            }
            else
            {
                ModelState.AddModelError("", "Lỗi dữ liệu đầu vào.");
            }
            var categoryID = (await _unitOfWork.SubCategory.GetFirstOrDefaultAsync(s => s.SubCategoryID == subCategoryID))?.CategoryID ?? 0;

            var categoryVM = new CategoryVM
            {
                Category = await _unitOfWork.Category.GetAsync(categoryID),
                SubCategories = await _unitOfWork.SubCategory.GetAllByCategoryIDAsync(categoryID)
            };

            return View("Upsert", categoryVM);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Upsert(CategoryVM categoryVM)
        {
            if (ModelState.IsValid)
            {
                if (categoryVM.Category.CategoryID == 0)
                {
                    await _unitOfWork.Category.AddAsync(categoryVM.Category);
                    TempData["Success"] = "Loại sản phẩm đã được tạo thành công!";
                }
                else
                {
                    await _unitOfWork.Category.UpdateAsync(categoryVM.Category);
                    TempData["Success"] = "Loại sản phẩm đã được cập nhật thành công!";
                }

                await _unitOfWork.SaveAsync();
                return RedirectToAction("Index");
            }
            else
            {
                return View(categoryVM);
            }
        }

        #region API_CALLS
        [HttpGet]
        [Route("api/admin/categories")]
        public async Task<IActionResult> GetCategory()
        {
            IEnumerable<Category> listCategory = await _unitOfWork.Category.GetAllAsync();
            return Json(new { data = listCategory });
        }

        [HttpGet]
        [Route("api/admin/sub-categories")]
        public async Task<IActionResult> GetSubCategory()
        {
            IEnumerable<SubCategory> listSubCategory = await _unitOfWork.SubCategory.GetAllAsync();
            return Json(new { data = listSubCategory });
        }

      

        [HttpGet("api/admin/subcategories/{categoryId}")]
        public async Task<IActionResult> GetSubCategories(int categoryId)
        {
            var subCategories = await _unitOfWork.SubCategory.GetAllAsync();
            var filteredSubCategories = subCategories
                .Where(sc => sc.CategoryID == categoryId)
                .Select(sc => new
                {
                    sc.SubCategoryID,
                    sc.SubCategoryName
                });

            return Json(new { data = filteredSubCategories });
        }

        #endregion
    }
}
