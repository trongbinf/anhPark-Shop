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

        public async Task<IActionResult> Index()
        {
            IEnumerable<Product> objProductList = await _unitOfWork.Product.GetAllAsync();
            return View(objProductList);
        }

        public async Task<IActionResult> Detail(int? id)
        {
            ProductVM productVM = new ProductVM()
            {
                CategoryList = (await _unitOfWork.Category.GetAllAsync()).Select(u => new SelectListItem
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
                productVM.product = await _unitOfWork.Product.GetFirstOrDefaultAsync(x => x.ProductID == id);
                if (productVM.product == null)
                {
                    return NotFound();
                }
                return View(productVM);
            }
        }

        public async Task<IActionResult> Upsert(int? id)
        {
            ProductVM productVM = new ProductVM()
            {
                CategoryList = (await _unitOfWork.Category.GetAllAsync()).Select(u => new SelectListItem
                {
                    Text = u.CategoryName,
                    Value = u.CategoryID.ToString()
                }),
                SubCategoryList = Enumerable.Empty<SelectListItem>()
            };

            if (id == null || id == 0)
            {
                productVM.product = new Product();
                return View(productVM);
            }
            else
            {
                productVM.product = await _unitOfWork.Product.GetFirstOrDefaultAsync(x => x.ProductID == id);
                if (productVM.product == null)
                {
                    return NotFound();
                }

                productVM.SubCategoryList = (await _unitOfWork.SubCategory.GetAllAsync())
                    .Where(sc => sc.CategoryID == productVM.product.CategoryID)
                    .Select(sc => new SelectListItem
                    {
                        Text = sc.SubCategoryName,
                        Value = sc.SubCategoryID.ToString()
                    });

                return View(productVM);
            }
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Upsert(ProductVM productVM)
        {
           
            if (!ModelState.IsValid)
            {
               
                productVM.CategoryList = (await _unitOfWork.Category.GetAllAsync())
                    .Select(u => new SelectListItem
                    {
                        Text = u.CategoryName,
                        Value = u.CategoryID.ToString()
                    }).ToList();

              
                productVM.SubCategoryList = (await _unitOfWork.SubCategory.GetAllAsync())
                    .Select(sc => new SelectListItem
                    {
                        Text = sc.SubCategoryName,
                        Value = sc.SubCategoryID.ToString()
                    }).ToList();

                return View(productVM);
            }

            string wwwRootPath = _webHostEnvironment.WebRootPath;
            var existProduct = await _unitOfWork.Product.GetFirstOrDefaultAsync(p => p.ProductID == productVM.product.ProductID);

          
            if (productVM.MainImage != null)
            {
                string mainFileName = Guid.NewGuid().ToString();
                string mainUploads = Path.Combine(wwwRootPath, "images", "products", "img-main");
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
                    await productVM.MainImage.CopyToAsync(fileStream);
                }
                productVM.product.MainImageUrl = $"images/products/img-main/{mainFileName}{mainExtension}";
            }
            else
            {
                   productVM.product.MainImageUrl = existProduct?.MainImageUrl;
            }

           
            if (productVM.DetailImages != null && productVM.DetailImages.Count > 0)
            {
              
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
                string detailUploads = Path.Combine(wwwRootPath, "images", "products", "img-details");

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
                        await detailImage.CopyToAsync(fileStream);
                    }

                    detailImagesUrls += $"images/products/img-details/{detailFileName}{detailExtension},";
                }

                productVM.product.DetailImageUrl = detailImagesUrls.TrimEnd(',');
            }
            else
            {
                // Retain the existing detail image URLs
                productVM.product.DetailImageUrl = existProduct?.DetailImageUrl;
            }

            // Generate product title if adding a new product
            if (productVM.product.ProductID == 0)
            {
                productVM.product.ProductTitle = await GenerateProductTitleAsync( productVM.product.SubCategoryID);

                await _unitOfWork.Product.AddAsync(productVM.product);
                TempData["Success"] = "Thêm mới sản phẩm thành công!";
            }
            else
            {
                await _unitOfWork.Product.UpdateAsync(productVM.product);
                TempData["Success"] = "Cập nhật sản phẩm thành công!";
            }

            await _unitOfWork.SaveAsync();
            return RedirectToAction("Index");
        }

        private async Task<string> GenerateProductTitleAsync(int subCategoryId)
        {            
            var subCategory = await _unitOfWork.SubCategory.GetFirstOrDefaultAsync(sc => sc.SubCategoryID == subCategoryId);        
            if (subCategory == null)
            {
                return string.Empty; 
            }
            var random = new Random();
            int randomNumber = random.Next(100000000, 999999999);

            string formattedSubCategoryName = subCategory.SubCategoryName.ToUpper();

            if (!formattedSubCategoryName.Contains("ACC"))
            {
                formattedSubCategoryName = "ACC" + formattedSubCategoryName;
            }

            string productTitle = $"{formattedSubCategoryName} {randomNumber}";

            return productTitle;
        }



        #region API_CALLS    


        [HttpGet]
        [Route("/api/admin/products")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _unitOfWork.Product.GetAllAsync(); 
            return Json(new { data = products });
        }


        [HttpGet]
        [Route("/api/admin/get-products/{categoryId}&&{subCategoryId}")]
        public async Task<IActionResult> GetProductsByCategory(int categoryId, int? subCategoryId = null)
        {
          
            var productsQuery = await _unitOfWork.Product.GetAllAsync(
                p => p.CategoryID == categoryId,
                includeProperties: "SubCategory"
            );

           
            {
                productsQuery = productsQuery
                    .Where(p => p.SubCategoryID == subCategoryId.Value)
                    .ToList();
            }

         
            if (productsQuery == null || !productsQuery.Any())
            {
                return Json(new { success = false, message = "Không có sản phẩm nào trong danh mục này." });
            }

            return Json(new { data = productsQuery });
        }



        [HttpPost]
        [Route("api/admin/products/status")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateStatus(int id, string status)
        {
            var product = await _unitOfWork.Product.GetFirstOrDefaultAsync(p => p.ProductID == id);
            if (product == null)
            {
                return Json(new { success = false, message = "Không tìm thấy sản phẩm." });
            }

            product.Status = status;
            await _unitOfWork.Product.UpdateAsync(product);
            await _unitOfWork.SaveAsync();

            return Json(new { success = true, message = "Cập nhật trạng thái sản phẩm thành công!" });
        }
        #endregion
    }
}
