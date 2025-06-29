using mk.data.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mk.data
{
    public class ToolData
    {
        public static int AddTool(ToolAddDTO toolAddDTO)
        {
            try
            {
                var NewtoolId = 0;

                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_AddTool", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Title", toolAddDTO.Title);
                        cmd.Parameters.AddWithValue("@PublicToolImageUrl", toolAddDTO.PublicToolImageUrl);
                        cmd.Parameters.AddWithValue("@Id", 0);

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                NewtoolId = reader.GetInt32(reader.GetOrdinal("Id"));
                            }
                        }
                    }
                }

                return NewtoolId;
            }
            catch
            {
                return 0;
            }
        }

        public static int UpdateTool(ToolUpdateDTO toolUpdateDTO)
        {
            try
            {
                var RowsAffected = 0;

                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_UpdateTool", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", toolUpdateDTO.Id);
                        cmd.Parameters.AddWithValue("@Title", toolUpdateDTO.Title);
                        cmd.Parameters.AddWithValue("@PublicToolImageUrl", toolUpdateDTO.PublicToolImageUrl);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();
                    }
                }

                return RowsAffected;
            }
            catch
            {
                return 0;
            }
        }

        public static int DeleteTool(int Id)
        {
            bool ToolHasWorks = false;

            try
            {
                var RowsAffected = 0;
                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    var toolsForWork = new List<Tool>();
                    using (SqlCommand cmdGet = new SqlCommand("SP_GetToolWorksByToolId", conn))
                    {
                        cmdGet.CommandType = CommandType.StoredProcedure;
                        cmdGet.Parameters.AddWithValue("@ToolId", Id);
                        conn.Open();

                        using (var reader = cmdGet.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                ToolHasWorks = true;   
                            }
                        }

                        if (ToolHasWorks)
                        {
                            using (SqlCommand cmdDeleteTools = new SqlCommand("SP_DeleteAllToolWorksByToolId", conn))
                            {
                                cmdDeleteTools.CommandType = CommandType.StoredProcedure;
                                cmdDeleteTools.Parameters.AddWithValue("@ToolId", Id);

                                cmdDeleteTools.ExecuteNonQuery();
                            }
                        }
                        

                        using (SqlCommand cmd = new SqlCommand("SP_DeleteTool", conn))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@Id", Id);


                            RowsAffected = cmd.ExecuteNonQuery();

                        }
                    }
                }

                return RowsAffected;
            }
            catch
            {
                return 0;
            }

        }
        public static Tool GetToolById(int Id)
        {
            Tool tool = null;

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetToolById", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", Id);

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                tool = new Tool
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Title = reader.GetString(reader.GetOrdinal("Title")),
                                    PublicToolImageUrl = reader.GetString(reader.GetOrdinal("PublicToolImageUrl"))
                                };
                            }
                        }
                    }
                }


                return tool;
            }
            catch
            {
                return tool;
            }
        }

        public static List<Tool> GetAllTools()
        {
            var ToolFromDB = new Tool();
            var Tools = new List<Tool>();

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetAllTools", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                ToolFromDB = new Tool
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Title = reader.GetString(reader.GetOrdinal("Title")),
                                    PublicToolImageUrl = reader.GetString(reader.GetOrdinal("PublicToolImageUrl")),
                                };

                                Tools.Add(ToolFromDB);
                            };
                        }
                    }
                    return Tools;
                }
            }
            catch
            {
                return null;
            }

        }

    }
}
