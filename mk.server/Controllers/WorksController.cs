using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Timeouts;
using Microsoft.AspNetCore.Mvc;
using mk.data;
using mk.data.Models;
using System.Security.Cryptography.X509Certificates;

namespace mk.server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class WorksController : ControllerBase
    {

        [HttpPost("add")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize]
        public IActionResult AddWork([FromBody] WorkAddDTO workAddDTO)
        {
            int NewWorkId = mk.business.WorkBusiness.AddWork(workAddDTO);

            if (NewWorkId == 0)
            {
                return BadRequest();
            }

            Work NewWork = mk.business.WorkBusiness.GetWorkById(NewWorkId);

            if (NewWork == null)
            {
                return BadRequest();
            }

            return Ok(NewWork);

        }



        [HttpDelete("delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize]
        public IActionResult DeleteWork([FromRoute] int id)
        {
            int RowsAffected = mk.business.WorkBusiness.DeleteWork(id);

            if (RowsAffected == 0)
            {
                return BadRequest();
            }

            return Ok();
        }


        [HttpGet("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAllWorks()
        {
            var AllWorks = mk.business.WorkBusiness.GetAllWorks();

            if (AllWorks == null)
            {
                return BadRequest();
            }

            return Ok(AllWorks);
        }

        [HttpGet("page")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetWorksByPage(int PageNumber, int PageSize)
        {
            var AllWorksByPage = mk.business.WorkBusiness.GetWorksByPage(PageNumber, PageSize);

            if (AllWorksByPage == null)
            {
                return BadRequest();
            }

            return Ok(AllWorksByPage);
        }


        //[HttpPost("update")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status401Unauthorized)]
        //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //[Authorize]
        //public IActionResult UpdateWork([FromBody] WorkUpdateDTO workUpdateDTO)
        //{
        //    int RowsAffected = mk.business.WorkBusiness.UpdateWork(workUpdateDTO);

        //    if (RowsAffected == 0)
        //    {
        //        return BadRequest();
        //    }

        //    return Ok();

        //}


    }
}
