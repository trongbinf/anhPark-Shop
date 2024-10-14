using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using WebGameV1.DataAcess.Repository.IRepository;
using WebGameV1.Models;
using WebGameV1.Models.ViewModel;

namespace WebGameV1.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class SliderController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private const string ImagePath = "images/sliders"; 

        public SliderController(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment)
        {
            _unitOfWork = unitOfWork;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IActionResult> Index()
        {
            IEnumerable<Slider> objSliderList = await _unitOfWork.Slider.GetAllAsync();
            return View(objSliderList);
        }

        public async Task<IActionResult> Upsert(int? id)
        {
            SliderVM sliderVM = new SliderVM();

            if (id == null || id == 0)
            {
                sliderVM.slider = new Slider();
                return View(sliderVM);
            }
            else
            {
                sliderVM.slider = await _unitOfWork.Slider.GetFirstOrDefaultAsync(x => x.Id == id);
                if (sliderVM.slider == null)
                {
                    return NotFound();
                }
                return View(sliderVM);
            }
        }

        public async Task<IActionResult> Detail(int? id)
        {
            SliderVM sliderVM = new SliderVM();

            if (id == null || id == 0)
            {
                return NotFound();
            }
            else
            {
                sliderVM.slider = await _unitOfWork.Slider.GetFirstOrDefaultAsync(x => x.Id == id);
                if (sliderVM.slider == null)
                {
                    return NotFound();
                }
                return View(sliderVM);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Upsert(SliderVM sliderVM)
        {
            if (!ModelState.IsValid)
            {
                return View(sliderVM);
            }

            string wwwRootPath = _webHostEnvironment.WebRootPath;
            var existslider = await _unitOfWork.Slider.GetFirstOrDefaultAsync(p => p.Id == sliderVM.slider.Id);

            if (sliderVM.ImageUrl != null)
            {
                string mainFileName = Guid.NewGuid().ToString();
                string mainUploads = Path.Combine(wwwRootPath, ImagePath);
                string mainExtension = Path.GetExtension(sliderVM.ImageUrl.FileName);

                if (existslider != null && !string.IsNullOrEmpty(existslider.ImageUrl))
                {
                    string oldImageUrl = Path.Combine(wwwRootPath, existslider.ImageUrl);
                    if (System.IO.File.Exists(oldImageUrl))
                    {
                        System.IO.File.Delete(oldImageUrl);
                    }
                }

                using (var fileStream = new FileStream(Path.Combine(mainUploads, mainFileName + mainExtension), FileMode.Create))
                {
                    await sliderVM.ImageUrl.CopyToAsync(fileStream);
                }
                sliderVM.slider.ImageUrl = $"{ImagePath}/{mainFileName}{mainExtension}";
            }
            else
            {
                sliderVM.slider.ImageUrl = existslider?.ImageUrl;
            }

            if (sliderVM.slider.Id == 0)
            {
                await _unitOfWork.Slider.AddAsync(sliderVM.slider);
                TempData["Success"] = "Thêm mới slide thành công!";
            }
            else
            {
                await _unitOfWork.Slider.UpdateAsync(sliderVM.slider);
                TempData["Success"] = "Cập nhật slide thành công!";
            }

            await _unitOfWork.SaveAsync(); // Call the async Save method
            return RedirectToAction("Index");
        }

        #region API_CALLS
        [HttpGet]
        [Route("api/admin/sliders")]
        public async Task<IActionResult> GetSliders()
        {
            var objSliderList = await _unitOfWork.Slider.GetAllAsync();
            return Json(new { data = objSliderList });
        }

        [HttpPost]
        [Route("api/admin/sliders/status")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateStatus(int id, string status)
        {
            var slider = await _unitOfWork.Slider.GetFirstOrDefaultAsync(p => p.Id == id);
            if (slider == null)
            {
                return Json(new { success = false, message = "Không tìm thấy slider." });
            }

            slider.Status = status;
            await _unitOfWork.Slider.UpdateAsync(slider);
            await _unitOfWork.SaveAsync();

            return Json(new { success = true, message = "Cập nhật trạng thái slider thành công!" });
        }
        #endregion
    }
}
