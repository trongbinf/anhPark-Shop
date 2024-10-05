using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Diagnostics;
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

        public IActionResult Index()
        {
            //IEnumerable<Product> ProductList = _unitOfWork.Product.GetAll(includeProperties: "Category");
            return View(/*ProductList*/);
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

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
