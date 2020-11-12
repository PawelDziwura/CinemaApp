using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using DB.Models;

namespace DB.Data
{
    public class APIContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Seance> Seances { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<Poster> Posters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseNpgsql("Host=localhost;Port=5432;Database=CinemaDB;Username=postgres;Password=postgres");

    }
}