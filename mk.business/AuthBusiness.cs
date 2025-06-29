using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using mk.data.Models;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Data;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using XAct.Messages;
using XAct;
using Telegram.Bot;

namespace mk.business
{
    public class AuthBusiness
    {
        public static int Signin(AdminSigninDTO adminSigninDTO)
        {
            return data.AuthData.Signin(adminSigninDTO);
        }
        public static int ChangeAdminData(AdminSigninDTO adminSigninDTO)
        {
            return data.AuthData.ChangeAdminData(adminSigninDTO);
        }

        public static MainImageDTO GetMainImage()
        {
            return data.AuthData.GetMainImage();
        }

        public static int UpdateMainImage(string MainImageUrl)
        {
            return data.AuthData.UpdateMainImage(MainImageUrl);
        }

        public static Admin GetAdmin(string Email, string Password)
        {
            return data.AuthData.GetAdmin(Email, Password);
        }
        public static Admin GetAdminCredentials()
        {
            return data.AuthData.GetAdminCredentials();
        }
        public static string GetAdminEmail()
        {
            return data.AuthData.GetAdminEmail();
        }

        public static string GenerateAccessToken(IConfiguration configuration, string Email, string Password)
        {
            return data.AuthData.GenerateAccessToken(configuration, Email, Password);
        }

    }
}
