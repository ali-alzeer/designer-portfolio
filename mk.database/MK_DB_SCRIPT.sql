USE [master]
GO
/****** Object:  Database [MK_Portfolio_DB]    Script Date: 08/02/2025 10:15:07 ص ******/
CREATE DATABASE [MK_Portfolio_DB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MK_Portfolio_DB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\MK_Portfolio_DB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MK_Portfolio_DB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\MK_Portfolio_DB_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [MK_Portfolio_DB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MK_Portfolio_DB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MK_Portfolio_DB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET ARITHABORT OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MK_Portfolio_DB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MK_Portfolio_DB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [MK_Portfolio_DB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MK_Portfolio_DB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET RECOVERY FULL 
GO
ALTER DATABASE [MK_Portfolio_DB] SET  MULTI_USER 
GO
ALTER DATABASE [MK_Portfolio_DB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MK_Portfolio_DB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MK_Portfolio_DB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MK_Portfolio_DB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MK_Portfolio_DB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [MK_Portfolio_DB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'MK_Portfolio_DB', N'ON'
GO
ALTER DATABASE [MK_Portfolio_DB] SET QUERY_STORE = ON
GO
ALTER DATABASE [MK_Portfolio_DB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [MK_Portfolio_DB]
GO
/****** Object:  Table [dbo].[Admin]    Script Date: 08/02/2025 10:15:07 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admin](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
	[LastLoggingIn] [datetime] NOT NULL,
 CONSTRAINT [PK__Admin__3214EC073035F372] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MainImage]    Script Date: 08/02/2025 10:15:07 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MainImage](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MainImageUrl] [nvarchar](max) NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tools]    Script Date: 08/02/2025 10:15:07 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tools](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](100) NOT NULL,
	[PublicToolImageUrl] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Works]    Script Date: 08/02/2025 10:15:07 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Works](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](500) NOT NULL,
	[Type] [nvarchar](20) NOT NULL,
	[PublicWorkMediaUrl] [nvarchar](max) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorksTools]    Script Date: 08/02/2025 10:15:07 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorksTools](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[WorkId] [int] NOT NULL,
	[ToolId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Tools] ON 
GO
INSERT [dbo].[Tools] ([Id], [Title], [PublicToolImageUrl]) VALUES (2, N'photoshop', N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1730109770/byq95hjbpy7xxr44j8ab.png')
GO
INSERT [dbo].[Tools] ([Id], [Title], [PublicToolImageUrl]) VALUES (3, N'illustrator', N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1730109881/ijk6b6cadu2beqhds17p.png')
GO
INSERT [dbo].[Tools] ([Id], [Title], [PublicToolImageUrl]) VALUES (4, N'premiere', N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1730109956/zpdrtwfrujw6usfzyqux.png')
GO
INSERT [dbo].[Tools] ([Id], [Title], [PublicToolImageUrl]) VALUES (5, N'after effects', N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1730110015/wkzoslkz74uzkufmalds.png')
GO
INSERT [dbo].[Tools] ([Id], [Title], [PublicToolImageUrl]) VALUES (6, N'indesign', N'https://res.cloudinary.com/alzeerecommerce/image/upload/v1730110071/apqsmdamvfo9mjg9xuaz.png')
GO
SET IDENTITY_INSERT [dbo].[Tools] OFF
GO
ALTER TABLE [dbo].[WorksTools]  WITH CHECK ADD FOREIGN KEY([ToolId])
REFERENCES [dbo].[Tools] ([Id])
GO
ALTER TABLE [dbo].[WorksTools]  WITH CHECK ADD FOREIGN KEY([WorkId])
REFERENCES [dbo].[Works] ([Id])
GO
/****** Object:  StoredProcedure [dbo].[SP_AddTool]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SP_AddTool]
@Title nvarchar(100),
@PublicToolImageUrl nvarchar(max),
@Id int output
as
begin
insert into Tools (Title, PublicToolImageUrl) values (@Title, @PublicToolImageUrl);
set @Id = SCOPE_IDENTITY()
select @Id as Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_AddWork]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SP_AddWork]
@Title nvarchar(100),
@Description nvarchar(500),
@Type nvarchar(20),
@PublicWorkMediaUrl nvarchar(max),
@CreatedOn datetime,
@UpdatedOn datetime,
@Id int output
as
begin
insert into Works (Title, Description, Type, PublicWorkMediaUrl, CreatedOn ,UpdatedOn ) values (@Title, @Description, @Type, @PublicWorkMediaUrl, @CreatedOn ,@UpdatedOn );
set @Id = SCOPE_IDENTITY()
select @Id as Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_AddWorkTool]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SP_AddWorkTool]
@WorkId int,
@ToolId int,
@Id int output
as
begin
insert into WorksTools (WorkId, ToolId) values (@WorkId, @ToolId);
set @Id = SCOPE_IDENTITY();
select @Id as Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_ChangeAdminData]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_ChangeAdminData]
@Username nvarchar(50),
@Email nvarchar(50),
@Password nvarchar(50)
as
begin

update Admin set Username = @Username , Email = @Email , Password = @Password , UpdatedOn = GETDATE() 

end
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteAllToolWorksByToolId]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_DeleteAllToolWorksByToolId]
@ToolId int
as
begin
delete from WorksTools where ToolId = @ToolId
end
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteAllWorkToolsByWorkId]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_DeleteAllWorkToolsByWorkId]
@WorkId int
as
begin
delete from WorksTools where WorkId = @WorkId
end
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteTool]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_DeleteTool]
@Id int
as
begin
delete from Tools where Id = @Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteWork]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_DeleteWork]
@Id int
as
begin
delete from Works where Id = @Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteWorkTool]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_DeleteWorkTool]
@Id int
as
begin
delete from WorksTools where Id = @Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_DoesToolHaveWorksDependencies]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_DoesToolHaveWorksDependencies]
@ToolId int
as
begin
declare @yes bit;

set @yes = (select top 1 * from (select yes = 1 from WorksTools where ToolId = @ToolId) w)
if(@yes = 1)
begin
	select 1 as yes
end
else
begin
	select 0 as yes
end
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetAdmin]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetAdmin]
@Email nvarchar(50),
@Password nvarchar(50)
as
begin
	select top 1 * from Admin where Email = @Email and Password = @Password
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetAdminCredentials]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetAdminCredentials]
as
begin
	select top 1 * from Admin
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetAdminEmail]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetAdminEmail]
as
begin
	select top 1 Email from Admin
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetAllTools]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SP_GetAllTools]
as
begin
select * from Tools order by Id desc
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetAllWorks]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_GetAllWorks]
as
begin
select * from Works order by Id desc
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetMainImage]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetMainImage]
as
begin

select * from MainImage

end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetToolById]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetToolById]
@Id int
as
begin
select * from Tools where Id = @Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetToolWorksByToolId]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_GetToolWorksByToolId]
@ToolId int
as
begin
select * from WorksTools where ToolId =  @ToolId
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorkById]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_GetWorkById]
@Id int
as
begin
select * from Works where Id = @Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorksByPage]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_GetWorksByPage]
@PageNumber int,
@PageSize int
as
begin
	select * from Works order by Id desc OFFSET (@PageSize * (@PageNumber - 1)) ROWS FETCH NEXT @PageSize ROWS ONLY;
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorkToolsByWorkId]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_GetWorkToolsByWorkId]
@WorkId int
as
begin
select * from WorksTools where WorkId = @WorkId
end

exec SP_GetWorkToolsByWorkId 19
GO
/****** Object:  StoredProcedure [dbo].[SP_Signin]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_Signin]
@Username nvarchar(50),
@Email nvarchar(50),
@Password nvarchar(50),
@LastLoggingIn datetime
as
begin
	update Admin set LastLoggingIn = @LastLoggingIn where Username = @Username and Email = @Email and Password = @Password
end
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateMainImage]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_UpdateMainImage]
@MainImageUrl nvarchar(max)
as
begin

update MainImage set MainImageUrl = @MainImageUrl , UpdatedOn = GETDATE()

end
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateTool]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_UpdateTool]
@Id int,
@Title nvarchar(100),
@PublicToolImageUrl nvarchar(max)
as
begin
update Tools set Title = @Title ,PublicToolImageUrl= @PublicToolImageUrl where Id = @Id
end
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateWork]    Script Date: 08/02/2025 10:15:08 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_UpdateWork]
@Id int,
@Title nvarchar(100),
@Description nvarchar(500),
@Type nvarchar(20),
@PublicWorkMediaUrl nvarchar(max),
@CreatedOn datetime,
@UpdatedOn datetime
as
begin
update Works set Title = @Title , Description = @Description , Type = @Type,PublicWorkMediaUrl = @PublicWorkMediaUrl, CreatedOn = @CreatedOn, UpdatedOn=@UpdatedOn where Id = @Id
end
GO
USE [master]
GO
ALTER DATABASE [MK_Portfolio_DB] SET  READ_WRITE 
GO
