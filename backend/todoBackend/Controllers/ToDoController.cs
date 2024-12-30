using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("todo")]
public class ToDoController : ControllerBase
{

    private readonly ToDoService _toDoService;

    public ToDoController(ToDoService toDoService)
    {
        _toDoService = toDoService; 
    }
    [HttpPost("add")]
    public IActionResult AddToDo([FromBody] ToDoRequest request) 
    {
        if (string.IsNullOrWhiteSpace(request.Title) || string.IsNullOrWhiteSpace(request.Body))
        {
            return BadRequest("Title and Body cannot be null or empty");
        }

        _toDoService.AddToDo(request.Title, request.Body);
        return Ok($"Added {request.Title} to ToDo list");

    }

    [HttpGet("get")]
    public IActionResult GetAllToDos()
    {
        var todos = _toDoService.GetAllToDos();
        Console.WriteLine(todos.Count);
        return Ok(todos);
    }

    [HttpDelete("delete/{index}")]
    public IActionResult DeleteToDo(int index)
    {
        if (_toDoService.DeleteToDo(index)) 
        {
            return Ok($"Deleted todo at index {index}");
        }

        return NotFound($"Could not delete todo at index {index}"); 
    }

    [HttpPut("update/{index}")]
    public IActionResult UpdateToDo(int index, [FromBody] ToDoRequest request)
    {
        if (_toDoService.UpdateToDo(index, request.Title)) return Ok($"Updated todo at index {index}");

        return NotFound($"Could not update todo at index {index}");
    }
}