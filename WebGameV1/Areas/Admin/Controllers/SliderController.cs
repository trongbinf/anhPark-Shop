using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using WebGameV1.DataAcess.Repository.IRepository;
using WebGameV1.Models;
using WebGameV1.Models.ViewModel;

namespace WebGameV1.Areas.Admin.Controllers
{

	[Area("Admin")]
	public class SliderController : Controller
	{

		private readonly IUnitOfWork _unitOfWork;
		private IWebHostEnvironment _webHostEnvironment;

		public SliderController(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment)
		{
			_unitOfWork = unitOfWork;
			_webHostEnvironment = webHostEnvironment;
		}
		public IActionResult Index()
		{
			IEnumerable <Slider> objSliderList = _unitOfWork.Slider.GetAll();
			return View(objSliderList);
		}


        public IActionResult Upsert(int? id)
        {
			SliderVM sliderVM = new SliderVM();
           

            if (id == null || id == 0)
            {
                sliderVM.slider = new Slider();
                return View(sliderVM);
            }
            else
            {

                sliderVM.slider = _unitOfWork.Slider.GetFirstOrDefault(x => x.Id == id);
                if (sliderVM.slider == null)
                {
                    return NotFound();
                }
                return View(sliderVM);
            }

        }

        public IActionResult Detail(int? id)
        {
            SliderVM sliderVM = new SliderVM();


            if (id == null || id == 0)
            {
                return NotFound();
            }
            else
            {

                sliderVM.slider = _unitOfWork.Slider.GetFirstOrDefault(x => x.Id == id);
                if (sliderVM.slider == null)
                {
                    return NotFound();
                }
                return View(sliderVM);
            }

        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Upsert(SliderVM sliderVM)
        {
            if (!ModelState.IsValid)
            {
              
                return View(sliderVM);
            }

            string wwwRootPath = _webHostEnvironment.WebRootPath;
            var existslider = _unitOfWork.Slider.GetFirstOrDefault(p => p.Id == sliderVM.slider.Id);


            if (sliderVM.ImageUrl != null)
            {
                string mainFileName = Guid.NewGuid().ToString();
                string mainUploads = Path.Combine(wwwRootPath, "images\\sliders");
                string mainExtension = Path.GetExtension(sliderVM.ImageUrl.FileName);


                if (existslider != null && !string.IsNullOrEmpty(existslider.ImageUrl))
                {
                    string oldImageUrlUrl = Path.Combine(wwwRootPath, existslider.ImageUrl);
                    if (System.IO.File.Exists(oldImageUrlUrl))
                    {
                        System.IO.File.Delete(oldImageUrlUrl);
                    }
                }


                using (var fileStream = new FileStream(Path.Combine(mainUploads, mainFileName + mainExtension), FileMode.Create))
                {
                    sliderVM.ImageUrl.CopyTo(fileStream);
                }
                sliderVM.slider.ImageUrl = $"images\\sliders\\{mainFileName}{mainExtension}";
            }
            else
            {

                sliderVM.slider.ImageUrl = existslider?.ImageUrl;
            }         


            if (sliderVM.slider.Id == 0)
            {
                _unitOfWork.Slider.Add(sliderVM.slider);
                TempData["Success"] = "Thêm mới slide thành công!";
            }
            else
            {
                _unitOfWork.Slider.Update(sliderVM.slider);
                TempData["Success"] = "Cập nhật slide thành công!";
            }

            _unitOfWork.Save();
            return RedirectToAction("Index");
        }



        #region API_CALLS
        [HttpGet]
		[Route("api/admin/sliders")]
		public IActionResult GetSliders()
		{
			var objSliderList = _unitOfWork.Slider.GetAll();
			return Json(new { data = objSliderList });
		}


        [HttpPost]
        [Route("api/admin/sliders/status")]
        [ValidateAntiForgeryToken]
        public IActionResult UpdateStatus(int id, string status)
        {
            var slider = _unitOfWork.Slider.GetFirstOrDefault(p => p.Id == id);
            if (slider == null)
            {
                return Json(new { success = false, message = "Không tìm thấy slider." });
            }

            slider.Status = status;
            _unitOfWork.Slider.Update(slider);
            _unitOfWork.Save();

            return Json(new { success = true, message = "Cập nhật trạng thái slider thành công!" });
        }


        #endregion
    }
}
