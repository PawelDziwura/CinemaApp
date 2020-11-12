using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DB.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public Seance OrderSeance { get; set; }        
        [Required]
        public List<Place> Places { get; set; } 
        public bool IsRefundable { get; set; }
        public User OrderUser { get; set; }
    }
}