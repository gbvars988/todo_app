

using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var MyAllowAllOrigins = "_myAllowAllOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();
// builder.Services.AddSingleton<ToDoService>(); 
builder.Services.AddScoped<ToDoService>();
// For local dev
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Production DB
// builder.Services.AddDbContext<AppDbContext>(options =>
// options.UseNpgsql(Environment.GetEnvironmentVariable("DefaultConnection")
// ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found")));


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowAllOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                      });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ASuperSecretKey123123123123123123"))
        };
    });

var app = builder.Build();

app.UseCors(MyAllowAllOrigins);
app.UseAuthentication();
app.UseAuthorization();
// Configure the HTTP request pipeline.d
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();


app.Run();

// public record ToDoRequest(string Title, string Body); 