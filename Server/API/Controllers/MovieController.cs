using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using DB.Data;
using DB.Models;
using API.Models;
using System.Text.Json;

namespace API.Controllers
{
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepo _repository;

        public MovieController(IMovieRepo repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("movies")]
        public ActionResult<IEnumerable<Movie>> GetAllMovies()
        {
            var movieItems = _repository.GetAllMovies();
            return Ok(movieItems);
        }

        [Route("movies/{id}")]
        [HttpGet]
        public ActionResult<Movie> GetMovieById(int id){
            var movieItem = _repository.GetMovieById(id);
            return Ok(movieItem);
        }

        [Route("movies/add")]
        [HttpPost]
        public void AddMovie(Movie movie)
        {    
            _repository.AddMovie(movie);
        }

        [Route("movies/edit")]
        public void EditMovie(Movie movie)
        {
            _repository.EditMovie(movie);
        }

        [Route("movies/delete/{id}")]
        [HttpDelete]
        public void DeleteMovie(int id)
        {
            _repository.DeleteMovie(id);
        }
    }
}