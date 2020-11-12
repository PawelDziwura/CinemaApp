using System;
namespace API.Models
{
    public class CreateOrderDTO
    {
        public int SeanceId { get; set; }
        public int UserId { get;set; }
        public int[] PlacesId { get;set; }
        public DateTime StartDate { get;set; }
    }
}