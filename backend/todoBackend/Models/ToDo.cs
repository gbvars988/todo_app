
public class ToDo
{
    public ToDo()
    {
        Status = "todo";
    }

    public int Id { get; set; }
    public required string Title { get; set; }
    public string? Body { get; set; }
    public int UserId { get; set; }

    public string Status { get; set; }
}