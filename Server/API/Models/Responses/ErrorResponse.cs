using System.Collections.Generic;

namespace API.Models.Responses
{
    public class ErrorResponse
    {
        public List<string> validationMessages { get; set; }
    }
}