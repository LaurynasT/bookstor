using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bookstore;

public class Reservation
{
    [Key]
    public int Id { get; set; }

    
    [ForeignKey("Books")]
    public int BookId { get; set; }
    public Books? Books { get; set; }

    public int Days { get; set; }
    public bool QuickPickup { get; set; }
     public string? Type { get; set; }
    public decimal TotalCost { get; set; }
}
