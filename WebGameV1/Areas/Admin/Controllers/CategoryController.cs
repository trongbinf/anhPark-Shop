using Microsoft.AspNetCore.Mvc;
using WebGameV1.DataAcess.Repository.IRepository;
using WebGameV1.Models;

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

        public IActionResult Index()
        {
            IEnumerable<Category> listCategory = _unitOfWork.Category.GetAll();
            return View(listCategory);
        }
        public IActionResult Upsert(int? id)
        {
             if(id == null || id == 0)
            {
                Category cate =  new Category();
                return View(cate);
            }
            else
            {
                var slectCategory = _unitOfWork.Category.GetFirstOrDefault(x => x.CategoryID == id);
                return View(slectCategory);
            }
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Upsert(Category category)
        {
            if (ModelState.IsValid)
            {
                if (category.CategoryID ==0) 
                {
                    _unitOfWork.Category.Add(category);
                    TempData["Success"] = "Loại sản phẩm đã được tạo thành công!";
                }
                else
                {
                    _unitOfWork.Category.Update(category);
                    TempData["Success"] = "Loại sản phẩm đã được cập nhật thành công!";
                }

                _unitOfWork.Save();
                return RedirectToAction("Index");
            }
            else
            {
              
                return View(category);
            }
        }


        #region API_CALLS
        [HttpGet]
        [Route("api/admin/categories")]
        public IActionResult GetCategory()
        {
            IEnumerable<Category> listCategory = _unitOfWork.Category.GetAll();
            return Json(new  {data= listCategory });
        }



        #endregion
    }
}
