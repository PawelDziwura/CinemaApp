using System;
using System.Net.Mail;
using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;
using DB.Models;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;
using System.Security.Authentication;

namespace API.Logic
{
    public static class EmailHandler
    {
        public static void Send(Order order, bool Add)
        {
            var message = new MimeMessage
            {
                Sender = new MailboxAddress("Cinema - Pawel Dziwura (Comarch)", "pawel.dziwura@stazysta.comarch.pl"),
                Subject = "Order confirmed"
            };

            if(Add)
            {
                message.Body = new TextPart(TextFormat.Plain)
                {
                    Text = "Hello " + order.OrderUser.Name + " \nYour order (" + order.OrderSeance.StartDate + ") has been confirmed."
                };
            }
            else
            {
                message.Body = new TextPart(TextFormat.Plain)
                {
                    Text = "Hello " + order.OrderUser.Name + " \nYour order (" + order.OrderSeance.StartDate + ") has been deleted."
                };
            }

            message.To.Add(new MailboxAddress("Client", "pawel.dziwura@stazysta.comarch.pl"));

            using(var client = new SmtpClient())
            {
                client.SslProtocols = SslProtocols.Tls;
                client.Connect("smtp.comarch.com", 465);
                client.Authenticate("pawel.dziwura@stazysta.comarch.pl", "type your password");
                client.Send(message);
            }
        }
    }
}