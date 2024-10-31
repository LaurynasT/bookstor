
using System.ComponentModel.DataAnnotations;

namespace bookstore;
public class Books
{
    [Key]
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Year { get; set; }
    // public string? Type { get; set; } 
    public string? ImageUrl { get; set; }
}
