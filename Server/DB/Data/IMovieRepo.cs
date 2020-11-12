using System.Collections.Generic;
using DB.Models;

namespace DB.Data
{
    public interface IMovieRepo
    {
        IEnumerable<Movie> GetAllMovies();
        Movie GetMovieById(int id);
        Movie GetUserByTitle(string title);
        void AddMovie(Movie movie);
        void EditMovie(Movie movieEdit);
        void DeleteMovie(int id);
    }
}