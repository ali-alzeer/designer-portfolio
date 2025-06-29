using mk.data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mk.business
{
    public class WorkBusiness
    {
        public static int AddWork(WorkAddDTO workAddDTO)
        {
            return mk.data.WorkData.AddWork(workAddDTO);
        }
        public static int UpdateWork(WorkUpdateDTO workUpdateDTO)
        {
            return mk.data.WorkData.UpdateWork(workUpdateDTO);
        }

        public static int DeleteWork(int Id)
        {
            return mk.data.WorkData.DeleteWork(Id);
        }

        public static Work GetWorkById(int Id)
        {
            return mk.data.WorkData.GetWorkById(Id);
        }

        public static List<Work> GetAllWorks()
        {
            return mk.data.WorkData.GetAllWorks();
        }

        public static List<Work> GetWorksByPage(int PageNumber, int PageSize)
        {
            return mk.data.WorkData.GetWorksByPage(PageNumber, PageSize);
        }
    }
}
