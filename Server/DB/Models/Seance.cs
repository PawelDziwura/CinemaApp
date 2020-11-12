using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DB.Models
{
    public class Seance
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }  
        public Movie Movie { get; set; }
        public List<Place> Places { get; set; } 
    }
}