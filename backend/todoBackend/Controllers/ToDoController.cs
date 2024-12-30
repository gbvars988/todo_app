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
    // [HttpPost("add")]
    // public IActionResult AddToDo([FromBody] ToDoRequest request) 
    // {
    //     if (string.IsNullOrWhiteSpace(request.Title) || string.IsNullOrWhiteSpace(request.Body))
    //     {
    //         return BadRequest("Title and Body cannot be null or empty");
    //     }

    //     _toDoService.AddToDo(request.Title, request.Body);
    //     return Ok($"Added {request.Title} to ToDo list");
    // }

    [HttpPost("add")]
    public async Task<IActionResult> AddToDo([FromBody] ToDoRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Title))
        {
            return BadRequest("ToDo Title cannot be null or empty");
        }
        await _toDoService.AddToDo(req.Title, req.Body);
        return Ok($"Successfully added ToDo {req.Title}"); 
    }

    // [HttpGet("get")]
    // public IActionResult GetAllToDos()
    // {
    //     var todos = _toDoService.GetAllToDos();
    //     Console.WriteLine(todos.Count);
    //     return Ok(todos);
    // }

    [HttpGet("get")]
    public async Task<IActionResult> GetAllToDos()
    {
        var todos = await _toDoService.GetAllToDos();
        return Ok(todos);
    }

    // [HttpDelete("delete/{index}")]
    // public IActionResult DeleteToDo(int index)
    // {
    //     if (_toDoService.DeleteToDo(index)) 
    //     {
    //         return Ok($"Deleted todo at index {index}");
    //     }

    //     return NotFound($"Could not delete todo at index {index}"); 
    // }
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteToDo(int id)
    {   
        bool success = _toDoService.DeleteToDo(id).Result; 
        if (success) return Ok($"Successfully deleted ToDo with id {id}");
        return NotFound($"Could not find ToDo with id {id}");
    }

    // [HttpPut("update/{index}")]
    // public IActionResult UpdateToDo(int index, [FromBody] ToDoRequest request)
    // {
    //     if (_toDoService.UpdateToDo(index, request.Title)) return Ok($"Updated todo at index {index}");

    //     return NotFound($"Could not update todo at index {index}");
    // }
    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateToDo(int id, [FromBody] ToDoRequest req)
    {
        bool success = _toDoService.UpdateToDo(id, req.Title).Result;
        if (success) return Ok($"Successfully updated ToDo with id {id}");
        return NotFound($"Could not find ToDo with id {id}");
    }
}