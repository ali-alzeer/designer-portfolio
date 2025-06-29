using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using mk.business;
using mk.data.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace mk.server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [HttpPost("signin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<AdminResponseDTO> Signin([FromBody] AdminSigninDTO adminSigninDTO)
        {

            if (AuthBusiness.Signin(adminSigninDTO) == 1)
            {
                var user = AuthBusiness.GetAdmin(adminSigninDTO.Email, adminSigninDTO.Password);
                if (user != null)
                {
                    var token = AuthBusiness.GenerateAccessToken(_configuration, user.Email, user.Password);

                    return Ok(
                        new AdminResponseDTO
                        {
                            Id = user.Id,
                            Username = user.Username,
                            Email = user.Email,
                            CreatedOn = user.CreatedOn,
                            UpdatedOn = user.UpdatedOn,
                            LastLoggingIn = user.LastLoggingIn,
                            Token = token
                        }
                        );
                }
                else
                {
                    return BadRequest("An error happened in signing in");
                }
            }
            else if (AuthBusiness.Signin(adminSigninDTO) == 0)
            {
                return BadRequest("Wrong credentials!");
            }
            else
            {
                return BadRequest("Unknown error");
            }
        }


        [HttpGet("validate-token")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<bool> ValidateToken([FromHeader] string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidAudience = _configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]))
            };

            try
            {
                SecurityToken validatedToken;
                var principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        [HttpPost("change-admin-data")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize]
        public ActionResult<AdminResponseDTO> ChangeAdminData([FromBody] AdminSigninDTO adminSigninDTO)
        {
            var RowsAffected = AuthBusiness.ChangeAdminData(adminSigninDTO);

            if (RowsAffected == 1)
            {
                var user = AuthBusiness.GetAdmin(adminSigninDTO.Email, adminSigninDTO.Password);
                if (user != null)
                {
                    var token = AuthBusiness.GenerateAccessToken(_configuration, user.Email, user.Password);

                    //mk.business.AuthBusiness.SendEmail(user).Wait();

                    return Ok(
                        new AdminResponseDTO
                        {
                            Id = user.Id,
                            Username = user.Username,
                            Email = user.Email,
                            CreatedOn = user.CreatedOn,
                            UpdatedOn = user.UpdatedOn,
                            LastLoggingIn = user.LastLoggingIn,
                            Token = token
                        }
                        );
                }
                else
                {
                    return BadRequest("An error happened in signing in");
                }
            }
            else if (RowsAffected == 0)
            {
                return BadRequest("Wrong credentials!");
            }
            else
            {
                return BadRequest("Unknown error");
            }
        }


        [HttpGet("admin-email")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<string> GetAdminEmail()
        {
            var email = mk.business.AuthBusiness.GetAdminEmail();

            if (email == "")
            {
                return BadRequest("No admin account in database");
            }

            var emailDTO = new EmailDTO { Email = email };
            return Ok(emailDTO);

        }


        [HttpGet("admin-image")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<MainImageDTO> GetMainImage()
        {
            var MainImage = mk.business.AuthBusiness.GetMainImage();

            if (MainImage == null)
            {
                return BadRequest("No main image in database");
            }

            return Ok(MainImage);

        }


        [HttpPost("update-mainimage")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize]
        public ActionResult UpdateMainImage([FromBody] MainImageUpdateDTO mainImageUpdateDTO)
        {
            var RowsAffected = AuthBusiness.UpdateMainImage(mainImageUpdateDTO.MainImageUrl);

            if (RowsAffected == 1)
            {
                return Ok();
            }
            else if (RowsAffected == 0)
            {
                return BadRequest("Image was not updated");
            }
            else
            {
                return BadRequest("Unknown error");
            }
        }



    }
}
