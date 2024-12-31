using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Username) || string.IsNullOrWhiteSpace(req.Password))
        {
            return BadRequest("Username and password cannot be empty or null");
        }
        if (await _context.Users.AnyAsync(user => user.Username == req.Username))
        {
            return BadRequest("Username already exists in database");
        }

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(req.Password);
        var user = new User
        {
            Username = req.Username,
            PasswordHash = hashedPassword
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("User registered successfully");
    }



    public record UserRequest(string Username, string Password);
}