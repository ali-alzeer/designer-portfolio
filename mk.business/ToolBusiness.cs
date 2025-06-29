using mk.data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mk.business
{
    public class ToolBusiness
    {
        public static int AddTool(ToolAddDTO toolAddDTO)
        {
            return mk.data.ToolData.AddTool(toolAddDTO);
        }
        public static int UpdateTool(ToolUpdateDTO toolUpdateDTO)
        {
            return mk.data.ToolData.UpdateTool(toolUpdateDTO);
        }

        public static int DeleteTool(int Id)
        {
            return mk.data.ToolData.DeleteTool(Id);
        }


        public static Tool GetToolById(int Id)
        {
            return mk.data.ToolData.GetToolById(Id);
        }

        public static List<Tool> GetAllTools()
        {
            return mk.data.ToolData.GetAllTools();
        }
    }
}
