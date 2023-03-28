using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.EntityFrameworkCore;
using WorldCities.API.Data.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.WriteIndented = true;
    });

builder.Services.AddApiVersioning(options =>
{
    options.ReportApiVersions = true;
    options.DefaultApiVersion = new Microsoft.AspNetCore.Mvc.ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ApiVersionReader = new HeaderApiVersionReader("X-API-Version");
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
 {
     options.AddPolicy("CorsPolicy", builder =>
     builder.WithOrigins("http://localhost:4200")
     .AllowAnyMethod()
     .AllowAnyHeader());
 });

// Add ApplicationDbContext and MySQL Support
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySQL(
        builder.Configuration.GetConnectionString("DefaultConnection")
        ));

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();
