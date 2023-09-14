using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using web.Data;

var builder = WebApplication.CreateBuilder(args);
var basePath = Environment.GetEnvironmentVariable("BASE_PATH");

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

var app = builder.Build();

if (!string.IsNullOrEmpty(basePath))
{
    app.UsePathBase(basePath);
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
