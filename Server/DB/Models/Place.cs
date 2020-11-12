using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace DB.Models
{
    public class Place
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Number { get; set; }
        [Required]
        public bool IsFree { get; set; }
        public bool IsSelected { get; set; }
        public Seance Seance { get; set; }
        public Order Order { get; set; }
    }
}