using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<ToDo> ToDos { get; set; }

    public DbSet<User> Users { get; set; }
}