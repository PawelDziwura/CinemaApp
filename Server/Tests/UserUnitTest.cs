using System;
using Xunit;
using API.Controllers;
using DB.Models;

namespace Tests
{
    public class UserUnitTest
    {
        [Fact]
        public void RegisterTest()
        {
            User user = new User();
            user.Id = 1;
            user.Name = "TestName";
            user.Surname = "TestSurname";
            user.Email = "test@email.com";
            user.Password = "TestPassword";
            user.IsAdmin = false;
        }
    }
}
