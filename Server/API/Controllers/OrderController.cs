using System.Linq;
using System;
using Microsoft.AspNetCore.Mvc;
using DB.Data;
using DB.Models;
using API.Models;
using API.Logic;
using API.Models.Responses;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepo _repository;
        private readonly ISeanceRepo _seanceRepository;

        private readonly IUserRepo _userRepository;

        public OrderController(IOrderRepo repository, ISeanceRepo seanceRepository, IUserRepo userRepository)
        {
            _repository = repository;
            _seanceRepository = seanceRepository;
            _userRepository = userRepository;
        }

        [HttpPost]
        [Route("orders/add")]
        public void AddOrder(CreateOrderDTO createOrderDTO)
        {
            var order = new Order();

            if((createOrderDTO.StartDate - DateTime.Now).TotalMinutes < 30)
                order.IsRefundable = false;
            else
                order.IsRefundable = true; 

            order.OrderSeance = _seanceRepository.GetSeanceById(createOrderDTO.SeanceId);
            order.OrderUser = _userRepository.GetUserById(createOrderDTO.UserId);           
            
            var placesToModify = order.OrderSeance.Places.Where(p => createOrderDTO.PlacesId.Any(o => o == p.Id));
            foreach(var place in placesToModify) {
                place.Order = order;
                place.IsFree = false;
                place.IsSelected = false;
            }  
                      
            _repository.AddOrder(order);
            EmailHandler.Send(order, true);
        }

        [Route("orders/delete/{id}")]
        [HttpDelete]
        public ActionResult<ErrorResponse> DeleteOrder(int id)
        {
            var validations = new List<string>();

            Order order = _repository.GetOrderById(id);
            if(order.IsRefundable == true){
                var placesToModify = order.OrderSeance.Places;
                if(placesToModify != null){
                    foreach(var place in placesToModify) {
                        place.Order = null;
                        place.IsFree = true;
                        place.IsSelected = false;
                    }  
                }
                _repository.RefundOrder(order);
                EmailHandler.Send(order, false);
                return null;
            }
            else
            {
                validations.Add("This order canot be refunded. \nIt's refund time out.");
            }

            ErrorResponse response = new ErrorResponse {
                validationMessages = validations
            };
            return Ok(response);
        }
    }
}