using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using WebGameV1.DataAcess.Repository.IRepository;
using WebGameV1.Models;
using WebGameV1.Models.ViewModel;

namespace WebGameV1.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class ProductController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private IWebHostEnvironment _webHostEnvironment;


        public ProductController(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment)
        {
            _unitOfWork = unitOfWork;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index()
        {
            IEnumerable<Product> objProductList = _unitOfWork.Product.GetAll();
            return View(objProductList);
        }


        public IActionResult Detail(int? id)
        {
            ProductVM productVM = new ProductVM()
            {
                CategoryList = _unitOfWork.Category.GetAll().Select(u => new SelectListItem
                {
                    Text = u.CategoryName,
                    Value = u.CategoryID.ToString()
                }),
            };

            if (id == null || id == 0)
            {
                return NotFound();
            }
            else
            {

                productVM.product = _unitOfWork.Product.GetFirstOrDefault(x => x.ProductID == id);
                if (productVM.product == null)
                {
                    return NotFound();
                }
                return View(productVM);
            }

        }



        public IActionResult Upsert(int? id)
        {
            ProductVM productVM = new ProductVM()
            {
                CategoryList = _unitOfWork.Category.GetAll().Select(u => new SelectListItem
                {
                    Text = u.CategoryName,
                    Value = u.CategoryID.ToString()
                }),
            };

            if (id == null || id == 0)
            {
                productVM.product = new Product();
                return View(productVM);
            }
            else
            {

                productVM.product = _unitOfWork.Product.GetFirstOrDefault(x => x.ProductID == id);
                if (productVM.product == null)
                {
                    return NotFound();
                }
                return View(productVM);
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Upsert(ProductVM productVM)
        {
            if (!ModelState.IsValid)
            {
                productVM.CategoryList = _unitOfWork.Category.GetAll()
                    .Select(u => new SelectListItem
                    {
                        Text = u.CategoryName,
                        Value = u.CategoryID.ToString()
                    });
                return View(productVM);
            }

            string wwwRootPath = _webHostEnvironment.WebRootPath;         
            var existProduct = _unitOfWork.Product.GetFirstOrDefault(p => p.ProductID == productVM.product.ProductID);

            
            if (productVM.MainImage != null)
            {
                string mainFileName = Guid.NewGuid().ToString();
                string mainUploads = Path.Combine(wwwRootPath, "images\\products\\img-main");
                string mainExtension = Path.GetExtension(productVM.MainImage.FileName);

              
                if (existProduct != null && !string.IsNullOrEmpty(existProduct.MainImageUrl))
                {
                    string oldMainImageUrl = Path.Combine(wwwRootPath, existProduct.MainImageUrl);
                    if (System.IO.File.Exists(oldMainImageUrl))
                    {
                        System.IO.File.Delete(oldMainImageUrl);
                    }
                }

                
                using (var fileStream = new FileStream(Path.Combine(mainUploads, mainFileName + mainExtension), FileMode.Create))
                {
                    productVM.MainImage.CopyTo(fileStream);
                }
                productVM.product.MainImageUrl = $"images\\products\\img-main\\{mainFileName}{mainExtension}";
            }
            else
            {
                
                productVM.product.MainImageUrl = existProduct?.MainImageUrl;
            }

            // Xử lý Detail Images
            if (productVM.DetailImages != null && productVM.DetailImages.Count > 0)
            {
                // Xóa ảnh chi tiết cũ nếu tồn tại
                if (existProduct != null && !string.IsNullOrEmpty(existProduct.DetailImageUrl))
                {
                    var oldDetailImages = existProduct.DetailImageUrl.Split(",");
                    foreach (var oldImagePath in oldDetailImages)
                    {
                        string oldDetailImagePath = Path.Combine(wwwRootPath, oldImagePath);
                        if (System.IO.File.Exists(oldDetailImagePath))
                        {
                            System.IO.File.Delete(oldDetailImagePath);
                        }
                    }
                }

                string detailImagesUrls = string.Empty;
                string detailUploads = Path.Combine(wwwRootPath, "images\\products\\img-details");

                if (!Directory.Exists(detailUploads))
                {
                    Directory.CreateDirectory(detailUploads);
                }

                foreach (var detailImage in productVM.DetailImages)
                {
                    string detailFileName = Guid.NewGuid().ToString();
                    string detailExtension = Path.GetExtension(detailImage.FileName);

                    using (var fileStream = new FileStream(Path.Combine(detailUploads, detailFileName + detailExtension), FileMode.Create))
                    {
                        detailImage.CopyTo(fileStream);
                    }

                    detailImagesUrls += $"images\\products\\img-details\\{detailFileName}{detailExtension},";
                }

                productVM.product.DetailImageUrl = detailImagesUrls.TrimEnd(',');
            }
            else
            {
              
                productVM.product.DetailImageUrl = existProduct?.DetailImageUrl;
            }

          
            if (productVM.product.ProductID == 0)
            {
                _unitOfWork.Product.Add(productVM.product);
                TempData["Success"] = "Thêm mới sản phẩm thành công!";
            }
            else
            {
                _unitOfWork.Product.Update(productVM.product);
                TempData["Success"] = "Cập nhật sản phẩm thành công!";
            }

            _unitOfWork.Save();
            return RedirectToAction("Index");
        }





        #region API_CALLS
        [HttpGet]
        [Route("api/admin/products")]
        public IActionResult GetProducts()
        {
            var objProductList = _unitOfWork.Product.GetAll(includeProperties: "Category");
            return Json(new { data = objProductList });
        }


        [HttpPost]
        [Route("api/admin/products/status")]
        [ValidateAntiForgeryToken]
        public IActionResult UpdateStatus(int id, string status)
        {
            var product = _unitOfWork.Product.GetFirstOrDefault(p => p.ProductID == id);
            if (product == null)
            {
                return Json(new { success = false, message = "Không tìm thấy sản phẩm." });
            }

            product.Status = status;
            _unitOfWork.Product.Update(product);
            _unitOfWork.Save();

            return Json(new { success = true, message = "Cập nhật trạng thái sản phẩm thành công!" });
        }



        #endregion
    }
}
