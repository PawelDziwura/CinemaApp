using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace DB.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
       
        public string Name { get; set; }
        public string Surname { get; set; }
       
        public string Email { get; set; }
        
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
        public List<Order> Orders { get; set; }      
    }
}