using System.Collections.Generic;
using DB.Models;

namespace DB.Data
{
    public interface IOrderRepo
    {
         void AddOrder(Order order);
         //Seance GetSeanceById(int id);
         void RefundOrder(Order order);
         Order GetOrderById(int id);
    }
}