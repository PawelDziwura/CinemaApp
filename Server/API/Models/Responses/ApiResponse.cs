using System;
using System.Collections.Generic;

namespace API.Models.Responses
{
    public class ApiResponse<T>
    {
        public T Data { get; set; }
        public List<string> validationMessages { get; set; }
        public string Token { get; set; }
    }
}
