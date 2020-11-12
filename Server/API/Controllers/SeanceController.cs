using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using DB.Data;
using Microsoft.AspNetCore.Mvc;
using DB.Models;
using API.Models.Responses;
using API.Models.Auth;

namespace API.Controllers
{
    [ApiController]
    public class SeanceController : ControllerBase
    {
        private readonly ISeanceRepo _repository;
        private readonly IToken _token;

        public SeanceController(ISeanceRepo repository, IToken token)
        {
            _repository = repository;
            _token = token;
        }

        [Route("seance/add")]
        [HttpPost]
        public ActionResult<ApiResponse<Seance>> AddSeance(Seance seance)
        {
            string returnError = null;
            var validations = new List<string>();
            var seanceDuration = (seance.EndDate.Ticks - seance.StartDate.Ticks) / 600000000;
            if(seanceDuration > Convert.ToInt32(seance.Movie.DurationTime))
            {
                seance.Places = new List<Place>(250);
                for(int i = 0; i < 250; i++) {
                    seance.Places.Add(new Place{ IsFree = true, IsSelected = false, Number = i + 1 } as Place);
                }
                returnError = (_repository.AddSeance(seance));
                if(returnError != null)
                    validations.Add(returnError);
            }
            else
                validations.Add("To short seance.");

            ApiResponse<Seance> response = new ApiResponse<Seance> {
                Data = seance,
                Token = _token.Generate(),
                validationMessages = validations
            };
            return Ok(response);
        }

        [Route("seances/{id}")]
        [HttpGet]
        public ActionResult<Movie> GetSeanceById(int id){
            var seanceItem = _repository.GetSeanceById(id);
            return Ok(seanceItem);
        }

        [Route("seances/delete/{id}")]
        [HttpDelete]
        public void DeleteSeance(int id)
        {
            _repository.DeleteSeance(id);
        }
    }
}