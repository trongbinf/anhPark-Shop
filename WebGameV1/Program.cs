using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebGameV1.DataAcess.Data;
using WebGameV1.Utility;
using WebGameV1.Models;
using StackExchange.Redis;
using WebGameV1.DataAcess.Repository.IRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebGameV1.DataAcess.Repository;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.OpenApi.Models;

namespace WebGameV1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            // Configure the DbContext
            builder.Services.AddDbContext<ApplicationDBContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DBContext"));
            });

            // Configure Identity to use ApplicationUser
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDBContext>()
                .AddDefaultTokenProviders();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuer = true,
                       ValidateAudience = true,
                       ValidateLifetime = true,
                       ValidateIssuerSigningKey = true,
                       ValidIssuer = builder.Configuration["Jwt:Issuer"],
                       ValidAudience = builder.Configuration["Jwt:Audience"],
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                   };
               });


            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddRazorPages().AddRazorRuntimeCompilation();
            builder.Services.Configure<IdentityOptions>(options =>
            {
                options.SignIn.RequireConfirmedAccount = true;
            });
            builder.Services.AddSingleton<IEmailSender>(sp =>
                new EmailSender(sp.GetRequiredService<IConfiguration>()));

            // Configure Redis
            var redisConnectionString = builder.Configuration.GetConnectionString("RedisConnection");
            builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnectionString));
            builder.Services.AddSingleton<ICacheService, RedisCacheService>();


            // Swagger configuration
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "WebGameV1 API",
                    Description = "API documentation for WebGameV1 project"
                });

                // Optionally add JWT authorization to Swagger UI
                var securitySchema = new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Description = "Enter JWT Bearer token **_only_**",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                };

                c.AddSecurityDefinition("Bearer", securitySchema);
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        securitySchema, new[] { "Bearer" }
                    }
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.Use(async (context, next) =>
            {
                if (context.Request.Path.StartsWithSegments("/swagger") &&
                    !context.User.IsInRole(SD.Role_User_Admin))
                {
                    context.Response.Redirect("/Identity/Account/AccessDenied");
                    return;
                }
                await next();
            });


            // Configure Swagger to be accessed at /swagger
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebGameV1 API");
                c.RoutePrefix = "swagger"; // Keep Swagger at /swagger
            });

            // Set Home/Index as the default route
            app.MapRazorPages();
            app.MapControllerRoute(
                   name: "default",
                   pattern: "{area=Public}/{controller=Home}/{action=Index}/{id?}"); // Default route for home page

            app.Run();
        }
    }
}
