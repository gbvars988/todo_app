
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;

public class ToDoService
{
    private readonly List<string> _todos = new();
    private readonly AppDbContext _context;

    public ToDoService(AppDbContext context)
    {
        _context = context; 
    }

    // public void AddToDo(string title, string body)
    // {
    //     Console.WriteLine($"From ToDoService: {title}");
    //     _todos.Add(title);
    // }

    public async Task AddToDo(string title, string ?body)
    {
        var todo = new ToDo { 
            Title = title,
            Body = body 
            };
        _context.ToDos.Add(todo);
        await _context.SaveChangesAsync(); 
    }

    // public List<string> GetAllToDos()
    // {
    //     return _todos; 
    // }

    public async Task<List<ToDo>> GetAllToDos()
    {
        var result = await _context.ToDos.ToListAsync();
        return result; 
    }

    // public bool DeleteToDo(int index)
    // {
    //     if (index < 0 || index >= _todos.Count)
    //     {
    //         return false;
    //     }

    //     _todos.RemoveAt(index);
    //     return true; 
    // }

    public async Task<bool> DeleteToDo(int id)
    {
        var todo = await _context.ToDos.FindAsync(id);
        if (todo == null) return false;

        _context.ToDos.Remove(todo);
        await _context.SaveChangesAsync();
        return true; 
    }

    // public bool UpdateToDo(int index, string newTitle)
    // {
    //     if (index < 0 || index >= _todos.Count)
    //     {
    //         return false;
    //     }

    //     _todos[index] = newTitle; 
    //     return true; 
    // }

    public async Task<bool> UpdateToDo(int id, string newTitle)
    {
        var todo = await _context.ToDos.FindAsync(id);
        if (todo == null) return false;

        todo.Title = newTitle;
        await _context.SaveChangesAsync();
        return true; 
    }
}