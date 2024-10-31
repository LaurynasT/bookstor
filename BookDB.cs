using Microsoft.EntityFrameworkCore;
using bookstore;

public class BookDB : DbContext
{
    public BookDB(DbContextOptions<BookDB> options) : base(options) { }

    public DbSet<Books> Books { get; set; }
    public DbSet<Reservation> Reservations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      
        modelBuilder.Entity<Reservation>()
            .HasOne(r => r.Books)
            .WithMany() 
            .HasForeignKey(r => r.BookId)
            .OnDelete(DeleteBehavior.Cascade); 

        modelBuilder.Entity<Books>().HasData(
            new Books { Id = 1, Name = "Altorių šešėly", Year = 1933,  ImageUrl = "https://thumb.knygos-static.lt/a-csGTeWdWLbsMxKxzRP0EkXxL0=/fit-in/800x800/filters:cwatermark(static/wm.png,500,75,30)/images/books/2361/1462873235_altoriu-sesely.jpg" },
                    new Books { Id = 2, Name = "Dievų miškas", Year = 1957,  ImageUrl = "https://www.patogupirkti.lt/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/d/i/dievu_miskas.jpg" },
                    new Books { Id = 3, Name = "Tarp pilkų debesų", Year = 2011,  ImageUrl = "https://thumb.knygos-static.lt/facOz8sJFJtL_gFYR9y80lpmPSg=/fit-in/800x800/filters:cwatermark(static/wm.png,500,75,30)/images/books/2501/1462873291_tarppilkudebesu.jpg" },
                    new Books { Id = 4, Name = "Mažasis princas", Year = 1943,  ImageUrl = "https://thumb.knygos-static.lt/mPwoJ7Cs1UA6EqgVw-lMjUJ5C58=/fit-in/0x800/images/books/1719/1708416064_Mazasis-princas.jpg" }
        );
         

       
        
    }
}
