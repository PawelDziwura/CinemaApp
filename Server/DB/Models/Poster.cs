using System.ComponentModel.DataAnnotations;

namespace DB.Models
{
    public class Poster
    {
        [Key]
        public int Id { get; set; }
        public byte[] Image { get; set; }        
    }
}