using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mk.data.Models
{
    public class ToolUpdateDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string PublicToolImageUrl { get; set; } = string.Empty;
    }
}
