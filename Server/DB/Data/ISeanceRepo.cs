using System;
using System.Collections;
using System.Collections.Generic;
using DB.Models;

namespace DB.Data
{
    public interface ISeanceRepo
    {
         Seance GetSeanceById(int id);
         string AddSeance(Seance seance);
         void EditSeance(int id, Seance seanceEdit);
         void DeleteSeance(int id); 
         void UpdateSeance(Seance seance);
    }
}