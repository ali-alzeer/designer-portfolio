using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using mk.data.Models;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using XSystem.Security.Cryptography;

namespace mk.data
{
    public class AuthData
    {

        public static int Signin(AdminSigninDTO adminSigninDTO)
        {
            try
            {
                var RowsAffected = 0;

                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_Signin", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Username", adminSigninDTO.Username);
                        cmd.Parameters.AddWithValue("@Email", adminSigninDTO.Email);

                        // Hash the concatenated value
                        string enteredPasswordHash = HashPassword(adminSigninDTO.Password);

                        // Compare the entered password hash with the stored hash
                        cmd.Parameters.AddWithValue("@Password", enteredPasswordHash);
                        cmd.Parameters.AddWithValue("@LastLoggingIn", DateTime.Now);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();

                    }


                    return RowsAffected;
                }
            }
            catch
            {
                return 0;
            }
        }

        public static int ChangeAdminData(AdminSigninDTO adminSigninDTO)
        {
            try
            {
                var RowsAffected = 0;

                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_ChangeAdminData", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Username", adminSigninDTO.Username);
                        cmd.Parameters.AddWithValue("@Email", adminSigninDTO.Email);

                        // Hash the concatenated value
                        string enteredPasswordHash = HashPassword(adminSigninDTO.Password);

                        // Compare the entered password hash with the stored hash
                        cmd.Parameters.AddWithValue("@Password", enteredPasswordHash);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();

                    }


                    return RowsAffected;
                }
            }
            catch
            {
                return 0;
            }
        }

        public static MainImageDTO GetMainImage()
        {
            try
            {
                using (var connection = new SqlConnection(Settings.GetConnetionString()))
                using (var command = new SqlCommand("SP_GetMainImage", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    connection.Open();

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new MainImageDTO
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                MainImageUrl = reader.GetString(reader.GetOrdinal("MainImageUrl")),
                                UpdatedOn = reader.GetDateTime(reader.GetOrdinal("UpdatedOn"))
                            };
                        }
                        else
                        {
                            return null;
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static int UpdateMainImage(string MainImageUrl)
        {
            int RowsAffected = 0;

            try
            {
                using (var connection = new SqlConnection(Settings.GetConnetionString()))
                using (var command = new SqlCommand("SP_UpdateMainImage", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@MainImageUrl", MainImageUrl);

                    connection.Open();

                    RowsAffected = command.ExecuteNonQuery();
                }

                return RowsAffected;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static Admin GetAdmin(string Email, string Password)
        {
            try
            {
                using (var connection = new SqlConnection(Settings.GetConnetionString()))
                using (var command = new SqlCommand("SP_GetAdmin", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Email", Email);

                    // Convert the stored salt and entered password to byte arrays
                    // byte[] storedSaltBytes = Convert.FromBase64String(user.Salt);
                    byte[] enteredPasswordBytes = Encoding.UTF8.GetBytes(Password);
                    byte[] storedSaltBytes = Encoding.UTF8.GetBytes(Settings.GetSalt());

                    // Concatenate entered password and stored salt
                    byte[] saltedPassword = new byte[enteredPasswordBytes.Length + storedSaltBytes.Length];
                    Buffer.BlockCopy(enteredPasswordBytes, 0, saltedPassword, 0, enteredPasswordBytes.Length);
                    Buffer.BlockCopy(storedSaltBytes, 0, saltedPassword, enteredPasswordBytes.Length, storedSaltBytes.Length);

                    // Hash the concatenated value
                    string enteredPasswordHash = HashPassword(Password);

                    // Compare the entered password hash with the stored hash
                    command.Parameters.AddWithValue("@Password", enteredPasswordHash);

                    connection.Open();

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Admin
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Username = reader.GetString(reader.GetOrdinal("Username")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                Password = reader.GetString(reader.GetOrdinal("Password")),
                                CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                UpdatedOn = reader.GetDateTime(reader.GetOrdinal("UpdatedOn")),
                                LastLoggingIn = reader.GetDateTime(reader.GetOrdinal("LastLoggingIn")),
                            };
                        }
                        else
                        {
                            return null;
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static Admin GetAdminCredentials()
        {
            try
            {
                using (var connection = new SqlConnection(Settings.GetConnetionString()))
                using (var command = new SqlCommand("SP_GetAdminCredentials", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    connection.Open();

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Admin
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Username = reader.GetString(reader.GetOrdinal("Username")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                Password = reader.GetString(reader.GetOrdinal("Password")),
                                CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                UpdatedOn = reader.GetDateTime(reader.GetOrdinal("UpdatedOn")),
                                LastLoggingIn = reader.GetDateTime(reader.GetOrdinal("LastLoggingIn")),
                            };
                        }
                        else
                        {
                            return null;
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static string GetAdminEmail()
        {
            try
            {
                using (var connection = new SqlConnection(Settings.GetConnetionString()))
                using (var command = new SqlCommand("SP_GetAdminEmail", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    connection.Open();

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return reader.GetString(reader.GetOrdinal("Email"));
                        }
                        else
                        {
                            return "";
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static string GenerateAccessToken(IConfiguration configuration, string Email, string Password)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("Email",Email),
                new Claim("Password",Password),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var signin = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                    configuration["Jwt:Issuer"],
                    configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddDays(7),
                    signingCredentials: signin
                );

            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenValue;
        }

        public static string HashPassword(string password)
        {
            if (password == null)
            {
                throw new ArgumentNullException(nameof(password));
            }

            // Constant salt
            byte[] salt = Encoding.UTF8.GetBytes(Settings.GetSalt());

            // Choose a strong cryptographic hash function (e.g., SHA256)
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                // Convert password to byte array
                var passwordBytes = Encoding.UTF8.GetBytes(password);

                // Combine salt and password for hashing
                var combinedBytes = Combine(salt, passwordBytes);

                // Hash the combined bytes
                var hashedBytes = sha256.ComputeHash(combinedBytes);

                // Combine the salt and hashed bytes for storage (optional, as salt is constant)
                var combinedHash = Combine(salt, hashedBytes);

                // Convert the final byte array to a string representation (e.g., Base64)
                return Convert.ToBase64String(combinedHash);
            }
        }

        private static byte[] Combine(byte[] data1, byte[] data2)
        {
            var combinedLength = data1.Length + data2.Length;
            var combined = new byte[combinedLength];
            Array.Copy(data1, 0, combined, 0, data1.Length);
            Array.Copy(data2, 0, combined, data1.Length, data2.Length);
            return combined;
        }
    }
}
