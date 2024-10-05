using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebGameV1.DataAcess.Data;
using WebGameV1.DataAcess.Repository;
using WebGameV1.DataAcess.Repository.IRepository;
using WebGameV1.Models;
using WebGameV1.Models.ViewModel;

namespace WebGameV1.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDBContext _db;
        public UserController(UserManager<ApplicationUser> userManager, ApplicationDBContext db)
        {
            _userManager = userManager;
            _db = db;
        }


        public async Task<IActionResult> Index()
        {
            IEnumerable<ApplicationUser> users = await _userManager.Users.ToListAsync();
            return View(users);
        }

        public async Task<IActionResult> Upsert(string? id)
        {
            UserVM userVM = new UserVM
            {

                RoleList = _db.Roles.Select(u => new SelectListItem
                {
                    Text = u.Name,
                    Value = u.Id.ToString()
                }).ToList(),

                SelectedRoleIds = new List<string>()
            };


            if (id == null)
            {
                userVM.user = new ApplicationUser();
                userVM.user.Id = "register";
                return View(userVM);
            }
            else
            {

                userVM.user = await _db.ApplicationUsers.FindAsync(id);
                if (userVM.user == null)
                {
                    return NotFound();
                }


                var userRoles = await _userManager.GetRolesAsync(userVM.user);


                userVM.SelectedRoleIds = _db.Roles
                                            .Where(r => userRoles.Contains(r.Name))
                                            .Select(r => r.Id)
                                            .ToList();

                return View(userVM);
            }
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Upsert(UserVM userVM)
        {
            var vietnamTime = DateTime.UtcNow.AddHours(7);
            Console.WriteLine(userVM.ConfirmPassword);
            Console.WriteLine(userVM.Password);
            if (!userVM.UpdatePassword)
            {
              
                ModelState.Remove("Password");
                ModelState.Remove("ConfirmPassword");
            }
          

            if (!ModelState.IsValid)
            {
                Console.WriteLine("ModelState is invalid.");
                userVM.RoleList = _db.Roles.Select(u => new SelectListItem
                {
                    Text = u.Name,
                    Value = u.Id.ToString()
                }).ToList();
                return View(userVM);
            }

         

            if (userVM.user.Id == "register")
            {
                //Console.WriteLine("Creating a new user...");

                var newUser = new ApplicationUser
                {
                    UserName = userVM.user.Email,
                    Email = userVM.user.Email,
                    Name = userVM.user.Name,
                    EmailConfirmed = true,
                    RegistrationDate = vietnamTime
                };

                var result = await _userManager.CreateAsync(newUser, userVM.Password);
                //Console.WriteLine($"User creation result: {result.Succeeded}");

                if (result.Succeeded)
                {
                    if (userVM.SelectedRoleIds != null && userVM.SelectedRoleIds.Any())
                    {
                        var rolesToAdd = _db.Roles
                            .Where(r => userVM.SelectedRoleIds.Contains(r.Id))
                            .Select(r => r.Name).ToList();
                        Console.WriteLine($"Roles to add: {string.Join(", ", rolesToAdd)}");

                        await _userManager.AddToRolesAsync(newUser, rolesToAdd);
                    }

                    TempData["Success"] = "Tài khoản đã được tạo thành công!";
                    return RedirectToAction("Index");
                }
            }
            else  
            {
                //Console.WriteLine($"Updating user with email: {userVM.user.Email}");

                var userFromDb = await _userManager.FindByEmailAsync(userVM.user.Email);
                if (userFromDb == null)
                {
                    Console.WriteLine("User not found.");
                    return NotFound();
                }

                Console.WriteLine($"User found: {userFromDb.Email}, Name: {userFromDb.Name}");
                userFromDb.Name = userVM.user.Name;
                var result = await _userManager.UpdateAsync(userFromDb);
                //Console.WriteLine($"User update result: {result.Succeeded}");

                if (result.Succeeded)
                {

                    if (!string.IsNullOrEmpty(userVM.Password) || userVM.Password != "666666")
                    {
                        var removePasswordResult = await _userManager.RemovePasswordAsync(userFromDb);
                        if (removePasswordResult.Succeeded)
                        {
                            var addPasswordResult = await _userManager.AddPasswordAsync(userFromDb, userVM.Password);
                        }
                    }

                    var currentRoles = await _userManager.GetRolesAsync(userFromDb);
                    //Console.WriteLine($"Current roles: {string.Join(", ", currentRoles)}");

                    var selectedRoles = _db.Roles
                        .Where(r => userVM.SelectedRoleIds != null && userVM.SelectedRoleIds.Contains(r.Id))
                        .Select(r => r.Name).ToList();
                    //Console.WriteLine($"Selected roles: {string.Join(", ", selectedRoles)}");

                    var rolesToAdd = selectedRoles.Except(currentRoles).ToList();
                    var rolesToRemove = currentRoles.Except(selectedRoles).ToList();

                    if (rolesToAdd.Any())
                    {
                        Console.WriteLine($"Roles to add: {string.Join(", ", rolesToAdd)}");
                        await _userManager.AddToRolesAsync(userFromDb, rolesToAdd);
                    }

                    if (rolesToRemove.Any())
                    {
                        Console.WriteLine($"Roles to remove: {string.Join(", ", rolesToRemove)}");
                        await _userManager.RemoveFromRolesAsync(userFromDb, rolesToRemove);
                    }

                    TempData["Success"] = "Cập nhật thông tin tài khoản thành công!";
                    return RedirectToAction("Index");
                }
            }

            userVM.RoleList = _db.Roles.Select(u => new SelectListItem
            {
                Text = u.Name,
                Value = u.Id.ToString()
            }).ToList();
            return View(userVM);
        }




        #region API_CALLS


        [HttpGet]
        [Route("api/admin/users")]
        public async Task<IActionResult> GetUsers()
        {

            var usersWithRoles = await (from user in _userManager.Users
                                        join userRole in _db.UserRoles on user.Id equals userRole.UserId
                                        join role in _db.Roles on userRole.RoleId equals role.Id
                                        select new
                                        {
                                            Id = user.Id,
                                            UserName = user.UserName,
                                            Email = user.Email,
                                            Name = user.Name,
                                            RegistrationDate = user.RegistrationDate,
                                            RoleName = role.Name,
                                            lockoutEnd = user.LockoutEnd
                                        }).ToListAsync();

            return Json(new { data = usersWithRoles });
        }

        [HttpGet]
        [Route("api/account/checkemail")]
        public async Task<IActionResult> CheckEmailExists(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                return Json(new { exists = true });
            }
            return Json(new { exists = false });
        }


        [HttpPost]
        [Route("api/admin/users/lock")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LockUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Json(new { success = false, message = "Không tìm thấy người dùng." });
            }

           
            var vietnamTime = DateTimeOffset.UtcNow.AddHours(7);
            var result = await _userManager.SetLockoutEndDateAsync(user, vietnamTime.AddYears(100)); 
            if (result.Succeeded) 
            {
                return Json(new { success = true, message = "Khóa người dùng thành công." }); 
            }

            return Json(new { success = false, message = "Lỗi khi khóa người dùng." }); 
        }

        [HttpPost]
        [Route("api/admin/users/unlock")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UnlockUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Json(new { success = false, message = "Không tìm thấy người dùng." });
            }
         
            var result = await _userManager.SetLockoutEndDateAsync(user, null);
            if (result.Succeeded)
            {
                return Json(new { success = true, message = "Mở khóa người dùng thành công." });
            }

            return Json(new { success = false, message = "Lỗi khi khóa người dùng." });
        }



        #endregion
    }
}
