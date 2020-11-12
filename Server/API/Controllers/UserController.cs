using System.Collections;
using System.Net.Http;
using System.Data.Common;
using System.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DB.Data;
using DB.Models;
using API.Models;
using API.Models.Auth;
using API.Models.Responses;

namespace API.Controllers
{
    [ApiController]
    //[Route("[controller]/[action]")]
    public class UserController : ControllerBase 
    {
        private readonly IUserRepo _repository;
        private readonly IToken _token;

        public UserController(IUserRepo repository, IToken token)
        {
            _repository = repository;
            _token = token;
        }
        //private readonly MockApiRepo _repository = new MockApiRepo();

        [HttpGet]
        [Route("users")]
        public ActionResult<IEnumerable<User>> GetAllUsers()
        {
            var userItems = _repository.GetAllUsers();
            return Ok(userItems);
        }

        [HttpGet]
        [Route("users/admins")]
        public ActionResult<IEnumerable<User>> GetAdmins()
        {
            var adminItems = _repository.GetAdmins();
            return Ok(adminItems);
        }

        [Route("users/{id}")]
        [HttpGet]
        public ActionResult <User> GetUserById(int id)
        {
            var userItem = _repository.GetUserById(id);
            return Ok(userItem);
        }

        [Route("users/byemail")]
        [HttpGet]
        public ActionResult <User> GetUserByEmail(string email)
        {
            var userItem = _repository.GetUserByEmail(email);
            return Ok(userItem);
        }

        [Route("register")]
        [HttpPost]
        public ActionResult<ApiResponse<User>> Register([FromBody]User user)
        {
            var validations = new List<string>();
            if(_repository.GetUserByName(user.Name) != null)
            {
                validations.Add("A user with this name already exist.");
            }
            if(_repository.GetUserByEmail(user.Email) != null)
            {
                validations.Add("This email adress provided is already assigned to any user");
            }

            if(!validations.Any())
            {
                _repository.CreateUser(user);
            }

            ApiResponse<User> response = new ApiResponse<User> {
                Data = user,
                Token = _token.Generate(),
                validationMessages = validations
            };

            return Ok(response);
        }

        [Route("users/edit")]
        public void EditUser(User user)
        {          
             _repository.EditUser(user);
        }

        [Route("login")]
        [HttpPost]
        public ActionResult<ApiResponse<User>> Login(User user)
        {            
            var validations = new List<string>();
            if(_repository.GetUserByEmail(user.Email) == null)
            {
                validations.Add("Wrong email.");
            }
            if(_repository.CheckPassword(user.Email, user.Password) == null)
            {
                validations.Add("Wrong password.");
            }
            if(!validations.Any()){
                user = _repository.GetUserByEmail(user.Email);
            }

            ApiResponse<User> response = new ApiResponse<User> {
                Data = user,
                Token = _token.Generate(),
                validationMessages = validations
            };

            return Ok(response);
        }

        // [Route("users/test")]
        // public ActionResult<ApiResponse<User>> Test()
        // {    
        //      User user = new User();
        //      user.Name = "Test";
        //      user.Email = "test@test.pl";
        //      user.Surname = "Test";
        //      user.Password = "test";
        //      user.IsAdmin = false;

        //      return new Ac;             
        // }
    }
}