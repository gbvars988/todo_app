var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers(); 
builder.Services.AddSingleton<ToDoService>(); 

var app = builder.Build();

// Configure the HTTP request pipeline.d
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();


app.Run();

// public record ToDoRequest(string Title, string Body); 