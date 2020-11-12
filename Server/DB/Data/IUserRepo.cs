using System.Collections;
using DB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DB.Data
{
    public interface IUserRepo
    {
         IEnumerable<User> GetAllUsers();
         User GetUserById(int id);
         User GetUserByName(string name);
         User GetUserByEmail(string email);
         User CheckPassword(string name, string password);
         IEnumerable<User> GetAdmins();
         User CreateUser(User user);
         void EditUser(User user);
         void DeleteUser(int id);
    }
}