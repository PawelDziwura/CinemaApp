using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace DB.Models
{
    public class Hall
    {
        [Key]
        public int Id { get; set; }
        public DateTime OpenDate { get; set; }
        public DateTime CloseDate { get; set; }
        public List<Seance> Seances { get; set; }
    }
}
