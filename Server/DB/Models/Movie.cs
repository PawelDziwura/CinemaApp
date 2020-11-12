using System;
using System.Text.Json;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DB.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public string Genre { get; set; }
        [Required]
        public string DurationTime { get; set; }
        public Poster Poster { get; set; }
        public List<Seance> seances { get; set; } = new List<Seance>();
    }
}