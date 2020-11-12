using DB.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DB.Data
{
    public class UserRepo : IUserRepo
    {
        private readonly APIContext _context;

        public UserRepo(APIContext context)
        {
            _context = context;
        }
        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.Include(o => o.Orders).ThenInclude(s => s.OrderSeance).ThenInclude(m => m.Movie).ToList();
        }

        public User GetUserById(int id)
        {
            return _context.Users.Include(o => o.Orders).ThenInclude(s => s.OrderSeance).ThenInclude(m => m.Movie).FirstOrDefault(u => u.Id == id);
        }

        public User GetUserByName(string name)
        {
            return _context.Users.FirstOrDefault(u => u.Name == name);
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User CheckPassword(string email, string password)
        {
            return _context.Users.FirstOrDefault(u => (u.Email == email && u.Password == password));
        }

        public User CreateUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }

        public void DeleteUser(int id)
        {
            User userDelete = _context.Users.FirstOrDefault(u => u.Id == id);
            _context.Users.Remove(userDelete);
            _context.SaveChanges();
        }

        public IEnumerable<User> GetAdmins()
        {
            return _context.Users.Where(u => u.IsAdmin == true).ToList();
        }

        public void EditUser(User userEdit)
        {
            _context.Users.Update(userEdit);
            _context.SaveChanges();
        }
    }
}