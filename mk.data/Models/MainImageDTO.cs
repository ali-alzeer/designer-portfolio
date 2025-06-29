using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mk.data.Models
{
    public class MainImageDTO
    {
        public int Id { get; set; }
        public string MainImageUrl { get; set; } = string.Empty;
        public DateTime UpdatedOn { get; set; }
    }
}
