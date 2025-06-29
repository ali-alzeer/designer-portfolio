using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Timeouts;
using Microsoft.AspNetCore.Mvc;
using mk.data.Models;

namespace mk.server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToolsController : ControllerBase
    {

        [HttpPost("add")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize]
        public IActionResult AddWork([FromBody] ToolAddDTO toolAddDTO)
        {
            int NewToolId = mk.business.ToolBusiness.AddTool(toolAddDTO);

            if (NewToolId == 0)
            {
                return BadRequest();
            }

            Tool NewTool = mk.business.ToolBusiness.GetToolById(NewToolId);

            if (NewTool == null)
            {
                return BadRequest();
            }

            return Ok(NewTool);

        }

        [HttpDelete("delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize]
        public IActionResult DeleteTool([FromRoute] int id)
        {


            int RowsAffected = mk.business.ToolBusiness.DeleteTool(id);

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
        public IActionResult GetAllTools()
        {
            var AllTools = mk.business.ToolBusiness.GetAllTools();

            if (AllTools == null)
            {
                return BadRequest();
            }

            return Ok(AllTools);

        }



        //[HttpPut("update")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status401Unauthorized)]
        //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //[Authorize]
        //public IActionResult UpdateTool([FromBody] ToolUpdateDTO toolUpdateDTO)
        //{
        //    int RowsAffected = mk.business.ToolBusiness.UpdateTool(toolUpdateDTO);

        //    if (RowsAffected == 0)
        //    {
        //        return BadRequest();
        //    }

        //    return Ok();

        //}

    }
}
