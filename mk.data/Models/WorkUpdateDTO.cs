using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mk.data.Models
{
    public class WorkUpdateDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public List<int> ToolsIds { get; set; } = new List<int>();
        public string PublicWorkMediaUrl { get; set; } = string.Empty;
    }
}
