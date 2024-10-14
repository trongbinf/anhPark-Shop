using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Diagnostics;
using System.Threading.Tasks;
using WebGameV1.DataAcess.Repository.IRepository;
using WebGameV1.Models;
using WebGameV1.Models.ViewModel;

namespace WebGameV1.Areas.Public.Controllers
{
    [Area("Public")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IUnitOfWork _unitOfWork;

        public HomeController(ILogger<HomeController> logger, IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        public async Task<IActionResult> Index()
        {
            IEnumerable<Product> productList = await _unitOfWork.Product.GetAllAsync(includeProperties: "Category");
            return View(productList);
        }

        public async Task<IActionResult> ListProducts(int? cateId, int? subId)
        {
            ProductVM productVM = new ProductVM()
            {
                CategoryList = (await _unitOfWork.Category.GetAllAsync()).Select(u => new SelectListItem
                {
                    Text = u.CategoryName,
                    Value = u.CategoryID.ToString()
                }),
            };



            if ((cateId == null || cateId == 0) && (subId == null || subId == 0))
            {
                return NotFound();
            }

        
            var productsQuery = await _unitOfWork.Product.GetAllAsync(
                p => p.CategoryID == cateId,
                includeProperties: "SubCategory"
            );

         
            if (subId != null && subId != 0)
            {
                productsQuery = productsQuery
                    .Where(p => p.SubCategoryID == subId)
                    .ToList();
            }

          
            productVM.Products = productsQuery;          
            productVM.sub = await _unitOfWork.SubCategory.GetFirstOrDefaultAsync(x => x.SubCategoryID == subId);

            return View(productVM);
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

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
