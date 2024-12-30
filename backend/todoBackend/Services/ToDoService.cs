
public class ToDoService
{
    private readonly List<string> _todos = new();

    public void AddToDo(string title, string body)
    {
        Console.WriteLine($"From ToDoService: {title}");
        _todos.Add(title);
    }

    public List<string> GetAllToDos()
    {
        return _todos; 
    }

    public bool DeleteToDo(int index)
    {
        if (index < 0 || index >= _todos.Count)
        {
            return false;
        }

        _todos.RemoveAt(index);
        return true; 
    }

    public bool UpdateToDo(int index, string newTitle)
    {
        if (index < 0 || index >= _todos.Count)
        {
            return false;
        }

        _todos[index] = newTitle; 
        return true; 
    }
}