using DB.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DB.Data
{
    public class OrderRepo : IOrderRepo
    {
        private readonly APIContext _context;

        public OrderRepo(APIContext context)
        {
            _context = context;
        }
        public void AddOrder(Order order)
        { 
            _context.Orders.Add(order);
            _context.Users.Update(order.OrderUser);
            _context.SaveChanges();
        }

        public void RefundOrder(Order order)
        {
            foreach(var place in order.Places){
                _context.Places.Update(place);
            }
            _context.Orders.Remove(order);
            _context.SaveChanges();
        }

        public Order GetOrderById(int id){
            var data = _context.Orders.Include(s => s.OrderSeance).Include(p => p.Places).Include(u => u.OrderUser).FirstOrDefault(o => o.Id == id);
            return data;
        }
    }
}