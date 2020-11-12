using System.ComponentModel.DataAnnotations;

namespace DB.Models
{
    public class Ticket
    {     
        [Key]   
        public int Id { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public Seance TicketSeance { get; set; }
    }
}