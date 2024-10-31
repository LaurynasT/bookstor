using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bookstore; 
using System.Collections.Generic;
using System.Threading.Tasks;

namespace bookstore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookDB _context;
        private  ReservationService _reservationService;

        public BooksController(BookDB context, ReservationService reservationService)
        {
            _context = context;
            _reservationService = reservationService;
        }

        
      
   [HttpGet("books")]
        public async Task<IActionResult> GetBooks([FromQuery] string search = "")
        {
            var query = _context.Books.AsQueryable();
  if (!string.IsNullOrEmpty(search))
    {
        
        if (int.TryParse(search, out int year))
        {
            query = query.Where(b => b.Year == year);
        }
        else
        {
           
            query = query.Where(b => b.Name != null && b.Name.ToLower().Contains(search.ToLower()));
        }
    }   

            return Ok(await query.ToListAsync());
        }

    [HttpGet("books/{id}")]
        public async Task<IActionResult> GetBookById(int id) 
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) 
            {
                return NotFound();
            }
            return Ok(book);
        }          
    [HttpPost("reserve")]
        public async Task<IActionResult> ReserveBook([FromBody] Reservation reservation)
        {
            var book = await _context.Books.FindAsync(reservation.BookId);
            if(book == null)
            {
                return NotFound("Book not Found");
            }
            reservation.TotalCost = _reservationService.TotalCost(reservation.Days, reservation.Type, reservation.QuickPickup);
        _context.Reservations.Add(reservation);
        await _context.SaveChangesAsync();

        return Ok(reservation);
        }
      
    [HttpGet("reservations")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            
            return await _context.Reservations
                .Include(r => r.Books) 
                .ToListAsync();
        }
    }
}
