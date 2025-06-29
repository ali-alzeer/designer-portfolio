using mk.data.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using XAct;
using System.Runtime.CompilerServices;

namespace mk.data
{
    public class WorkData
    {
        public static int AddWork(WorkAddDTO workAddDTO)
        {
            try
            {
                var NewWorkId = 0;
                var NewWorkToolId = 0;
                var RowsAffected = 0;

                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_AddWork", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Title", workAddDTO.Title);
                        cmd.Parameters.AddWithValue("@Description", workAddDTO.Description);
                        cmd.Parameters.AddWithValue("@Type", workAddDTO.Type);
                        cmd.Parameters.AddWithValue("@PublicWorkMediaUrl", workAddDTO.PublicWorkMediaUrl);
                        cmd.Parameters.AddWithValue("@CreatedOn", DateTime.Now);
                        cmd.Parameters.AddWithValue("@UpdatedOn", DateTime.Now);
                        cmd.Parameters.AddWithValue("@Id", 0);

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                NewWorkId = reader.GetInt32(reader.GetOrdinal("Id"));
                            }
                        }

                        if (NewWorkId == 0)
                        {
                            return 0;
                        }

                        for (int i = 0; i < workAddDTO.ToolsIds.Count; i++)
                        {
                            using (SqlCommand cmd2 = new SqlCommand("SP_AddWorkTool", conn))
                            {
                                cmd2.CommandType = CommandType.StoredProcedure;
                                cmd2.Parameters.AddWithValue("@WorkId", NewWorkId);
                                cmd2.Parameters.AddWithValue("@ToolId", workAddDTO.ToolsIds[i]);
                                cmd2.Parameters.AddWithValue("@Id", 0);

                                using (var reader = cmd2.ExecuteReader())
                                {
                                    if (reader.Read())
                                    {
                                        NewWorkToolId = reader.GetInt32(reader.GetOrdinal("Id"));
                                    }
                                }

                            }

                            if (NewWorkToolId == 0)
                            {
                                using (SqlCommand cmd3 = new SqlCommand("SP_DeleteAllWorkToolsByWorkId", conn))
                                {
                                    cmd3.CommandType = CommandType.StoredProcedure;
                                    cmd3.Parameters.AddWithValue("@WorkId", NewWorkId);

                                    RowsAffected = cmd3.ExecuteNonQuery();
                                }
                                using (SqlCommand cmd3 = new SqlCommand("SP_DeleteWork", conn))
                                {
                                    cmd3.CommandType = CommandType.StoredProcedure;
                                    cmd3.Parameters.AddWithValue("@Id", NewWorkId);

                                    RowsAffected = cmd3.ExecuteNonQuery();
                                }

                                return 0;
                            }
                        }
                    }




                    return NewWorkId;
                }
            }
            catch
            {
                return 0;
            }
        }

        public static int UpdateWork(WorkUpdateDTO workUpdateDTO)

        {
            try
            {
                var RowsAffected = 0;
                var NewWorkToolId = 0;

                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_UpdateWork", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", workUpdateDTO.Id);
                        cmd.Parameters.AddWithValue("@Title", workUpdateDTO.Title);
                        cmd.Parameters.AddWithValue("@Description", workUpdateDTO.Description);
                        cmd.Parameters.AddWithValue("@Type", workUpdateDTO.Type);
                        cmd.Parameters.AddWithValue("@PublicWorkMediaUrl", workUpdateDTO.PublicWorkMediaUrl);
                        cmd.Parameters.AddWithValue("@CreatedOn", DateTime.Now);
                        cmd.Parameters.AddWithValue("@UpdatedOn", DateTime.Now);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();

                        if (RowsAffected == 0)
                        {
                            return RowsAffected;
                        }

                        using (SqlCommand cmd3 = new SqlCommand("SP_DeleteAllWorkToolsByWorkId", conn))
                        {
                            cmd3.CommandType = CommandType.StoredProcedure;
                            cmd3.Parameters.AddWithValue("@WorkId", workUpdateDTO.Id);

                            RowsAffected = cmd3.ExecuteNonQuery();
                        }

                        for (int i = 0; i < workUpdateDTO.ToolsIds.Count; i++)
                        {
                            using (SqlCommand cmd2 = new SqlCommand("SP_AddWorkTool", conn))
                            {
                                cmd2.CommandType = CommandType.StoredProcedure;
                                cmd2.Parameters.AddWithValue("@WorkId", workUpdateDTO.Id);
                                cmd2.Parameters.AddWithValue("@ToolId", workUpdateDTO.ToolsIds[i]);
                                cmd2.Parameters.AddWithValue("@Id", 0);

                                using (var reader = cmd2.ExecuteReader())
                                {
                                    if (reader.Read())
                                    {
                                        NewWorkToolId = reader.GetInt32(reader.GetOrdinal("Id"));
                                    }
                                }

                            }

                            if (NewWorkToolId == 0)
                            {
                                using (SqlCommand cmd3 = new SqlCommand("SP_DeleteAllWorkToolsByWorkId", conn))
                                {
                                    cmd3.CommandType = CommandType.StoredProcedure;
                                    cmd3.Parameters.AddWithValue("@WorkId", workUpdateDTO.Id);

                                    RowsAffected = cmd3.ExecuteNonQuery();
                                }

                                return 0;
                            }
                        }
                    }




                    return RowsAffected;
                }
            }
            catch
            {
                return 0;
            }
        }

        public static int DeleteWork(int Id)
        {
            bool ThereAreToolsForThisWork = false;

            try
            {
                var RowsAffected = 0;
                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {

                    using (SqlCommand cmdGet = new SqlCommand("SP_GetWorkToolsByWorkId", conn))
                    {
                        cmdGet.CommandType = CommandType.StoredProcedure;
                        cmdGet.Parameters.AddWithValue("@WorkId", Id);
                        conn.Open();

                        using (var reader = cmdGet.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                ThereAreToolsForThisWork = true;
                            }
                        }

                    }

                    if (ThereAreToolsForThisWork)
                    {
                        using (SqlCommand cmdDeleteTools = new SqlCommand("SP_DeleteAllWorkToolsByWorkId", conn))
                        {
                            cmdDeleteTools.CommandType = CommandType.StoredProcedure;
                            cmdDeleteTools.Parameters.AddWithValue("@WorkId", Id);

                            cmdDeleteTools.ExecuteNonQuery();
                        }
                    }


                    using (SqlCommand cmd = new SqlCommand("SP_DeleteWork", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", Id);


                        RowsAffected = cmd.ExecuteNonQuery();

                    }
                }

                return RowsAffected;
            }
            catch (Exception ex)
            {
                return 0;
            }

        }
        public static bool DoesToolHaveWorksDependencies()
        {
            bool ToolHasWorks = true;

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DoesToolHaveWorksDependencies", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                ToolHasWorks = reader.GetBoolean(reader.GetOrdinal("yes"));
                            };
                        }
                    }

                    return ToolHasWorks;

                }
            }
            catch
            {
                return true;
            }

        }

        public static Work GetWorkById(int Id)
        {
            Work WorkFromDB = null;

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetWorkById", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", Id);

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                WorkFromDB = new Work
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Title = reader.GetString(reader.GetOrdinal("Title")),
                                    Description = reader.GetString(reader.GetOrdinal("Description")),
                                    Type = reader.GetString(reader.GetOrdinal("Type")),
                                    PublicWorkMediaUrl = reader.GetString(reader.GetOrdinal("PublicWorkMediaUrl")),
                                    CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                    UpdatedOn = reader.GetDateTime(reader.GetOrdinal("UpdatedOn")),
                                };
                            }

                            else
                            {
                                return null;
                            }

                        }

                        if (WorkFromDB != null)
                        {
                            using (SqlCommand cmd2 = new SqlCommand("SP_GetWorkToolsByWorkId", conn))
                            {
                                cmd2.CommandType = CommandType.StoredProcedure;
                                cmd2.Parameters.AddWithValue("@WorkId", Id);

                                using (var reader = cmd2.ExecuteReader())
                                {

                                    while (reader.Read())
                                    {
                                        WorkFromDB.ToolsIds.Add(
                                                reader.GetInt32(reader.GetOrdinal("ToolId"))
                                            );
                                    };
                                }
                            }
                        }
                    }

                    return WorkFromDB;

                }
            }
            catch
            {
                return null;
            }

        }

        public static List<Work> GetAllWorks()
        {
            var WorkFromDB = new Work();
            var Works = new List<Work>();

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetAllWorks", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                WorkFromDB = new Work
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Title = reader.GetString(reader.GetOrdinal("Title")),
                                    Description = reader.GetString(reader.GetOrdinal("Description")),
                                    Type = reader.GetString(reader.GetOrdinal("Type")),
                                    PublicWorkMediaUrl = reader.GetString(reader.GetOrdinal("PublicWorkMediaUrl")),
                                    CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                    UpdatedOn = reader.GetDateTime(reader.GetOrdinal("UpdatedOn")),
                                };

                                Works.Add(WorkFromDB);
                            };
                        }

                        if (Works.Count != 0)
                        {
                            for (int i = 0; i < Works.Count; i++)
                            {
                                using (SqlCommand cmd2 = new SqlCommand("SP_GetWorkToolsByWorkId", conn))
                                {
                                    cmd2.CommandType = CommandType.StoredProcedure;
                                    cmd2.Parameters.AddWithValue("@WorkId", Works[i].Id);

                                    using (var reader = cmd2.ExecuteReader())
                                    {

                                        while (reader.Read())
                                        {
                                            Works[i].ToolsIds.Add(
                                                    reader.GetInt32(reader.GetOrdinal("ToolId"))
                                                );
                                        };
                                    }
                                }
                            }

                        }
                    }

                    return Works;

                }
            }
            catch
            {
                return null;
            }

        }

        public static List<Work> GetWorksByPage(int PageNumber, int PageSize)
        {
            var WorkFromDB = new Work();
            var Works = new List<Work>();

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetWorksByPage", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@PageNumber", PageNumber);
                        cmd.Parameters.AddWithValue("@PageSize", PageSize);
                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                WorkFromDB = new Work
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Title = reader.GetString(reader.GetOrdinal("Title")),
                                    Description = reader.GetString(reader.GetOrdinal("Description")),
                                    Type = reader.GetString(reader.GetOrdinal("Type")),
                                    PublicWorkMediaUrl = reader.GetString(reader.GetOrdinal("PublicWorkMediaUrl")),
                                    CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                    UpdatedOn = reader.GetDateTime(reader.GetOrdinal("UpdatedOn")),
                                };

                                Works.Add(WorkFromDB);
                            };
                        }

                        if (Works.Count != 0)
                        {
                            for (int i = 0; i < Works.Count; i++)
                            {
                                using (SqlCommand cmd2 = new SqlCommand("SP_GetWorkToolsByWorkId", conn))
                                {
                                    cmd2.CommandType = CommandType.StoredProcedure;
                                    cmd2.Parameters.AddWithValue("@WorkId", Works[i].Id);

                                    using (var reader = cmd2.ExecuteReader())
                                    {

                                        while (reader.Read())
                                        {
                                            Works[i].ToolsIds.Add(
                                                    reader.GetInt32(reader.GetOrdinal("ToolId"))
                                                );
                                        };
                                    }
                                }
                            }

                        }
                    }

                    return Works;

                }
            }
            catch
            {
                return null;
            }

        }
    }
}
