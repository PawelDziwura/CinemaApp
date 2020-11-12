using System;
using System.Collections.Generic;
using DB.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DB.Data
{
    public class SeanceRepo : ISeanceRepo
    {
        private readonly APIContext _context;

        public SeanceRepo(APIContext context)
        {
            _context = context;
        }
        public string AddSeance(Seance seance)
        { 

            var HasAnyColideSeance = _context.Seances.Any(s => (
                (s.StartDate < seance.EndDate && s.EndDate > seance.EndDate) ||
                (s.EndDate > seance.StartDate && s.EndDate < seance.EndDate) ||
                (s.StartDate > seance.StartDate && s.EndDate < seance.EndDate)
            ));

            if(!HasAnyColideSeance)
            {
                _context.Movies.Attach(seance.Movie);
                _context.Seances.Add(seance);
                _context.SaveChanges();
                return null; 
            }
            else
                return "Other seance in selected part of time.";
        }

        public void DeleteSeance(int id)
        {
            Seance seanceDelete = _context.Seances.FirstOrDefault(s => s.Id == id);            
            _context.Places.RemoveRange(_context.Places.Where(p => p.Seance.Id == seanceDelete.Id));
            _context.Seances.Remove(seanceDelete);
            _context.SaveChanges();
        }

        public void EditSeance(int id, Seance seanceEdit)
        {
            Seance seance = _context.Seances.FirstOrDefault(s => s.Id == id);
            seance.StartDate = seanceEdit.StartDate;
            seance.EndDate = seanceEdit.EndDate;
            _context.Seances.Update(seance);
            _context.SaveChanges();
        }

        public Seance GetSeanceById(int id)
        {
            var data = _context.Seances.Include(m => m.Movie).Include(p => p.Places).FirstOrDefault(s => s.Id == id);
            return data;
        }

        public void UpdateSeance(Seance seance)
        {
            _context.Seances.Update(seance);
            _context.SaveChanges();
        }
    }
}