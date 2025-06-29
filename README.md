<br/>

## Table Of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Screenshot](#screenshot)
- [Database Diagram](#database-diagram)
- [Live Site](#live-site)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## About The Project

It is a full-stack graphic designer's portfolio where the designer can show his work to clients, manage his works by adding or deleting works, and configure his personal data when needed

## Features

- Designer's capabilities to manage his works and show them to clients
- Works pagination, details
- Dynamic data changes

### Screenshot

![screenshot_1](https://res.cloudinary.com/alzeerecommerce/image/upload/v1736689318/m_ehzmf0.gif)

<hr />

### Database Diagram

![db_diagram](https://res.cloudinary.com/alzeerecommerce/image/upload/v1736688549/mk_diagram_gmkhca.png)

## Live Site

[Mohammad Al-Khaled](https://mohammadalkhaled.somee.com/)

## Built With

- Angular
- ASP.NET Core
- SQL Server

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Angular 18 or above
- .NET 8 or above
- Microsoft SQL Server

### Installation

#### Getting the code

1. Clone the repo

```sh
    git clone https://github.com/ali-alzeer/designer-portfolio.git
```

#### Database

1. Import the database file from the folder "mk.database"

#### Back-End

1. Configure connection string in "Settings.cs" file

```cs
    public static string GetConnectionString(){
        return "YOUR_CONNECTION_STRING"
    }
```

2. Configure JWT settings in "appsettings.json" file

```json
    "Jwt": {
        "Key": "YOUR_JWT_KEY",
        "Issuer": "YOUR_JWT_ISSUER",
        "Audience": "YOUR_JWT_AUDIENCE",
        "Subject": "YOUR_JWT_SUBJECT"
    }
```

3. Change path to the back-end folder

```sh
    cd mk.server
```

4. Install dependencies

```sh
    dotnet restore
```

5. Start Running

```sh
    dotnet run
```

#### Front-End

1. Configure BASEURL in "environment.ts" file

```ts
    export const BASEURL: string = "YOUR_BACKEND_BASEURL";
```

2. Change path to the front-end folder

```sh
    cd mk.client
```

3. Install dependencies

```sh
    npm install
```

4. Start Running

```sh
    ng serve
```
