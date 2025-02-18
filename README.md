<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Todo Web App

This is a Todo web app built with **NestJS**, using **Passport.js** for authentication, **JWT** tokens for secure user sessions, **PostgreSQL** as the database, and **Prisma** as the ORM. The application allows users to authenticate, manage tasks, and categorize them. Users can also create and delete categories for their tasks.

## Features

- **User Authentication**: Users can log in using Passport.js with JWT tokens for secure authentication.
- **Task Management**: Users can create, read, update, and delete tasks. Each task has:
  - Name
  - Description
  - Priority
  - Due date
  - Category (tasks can be associated with categories)
- **Category Management**: Users can create and delete categories for organizing their tasks.
- **Database**: PostgreSQL database with **Prisma ORM** for efficient database management.

## Prerequisites

Before running the app, ensure you have the following installed:

- **Node.js** (version >= 14)
- **PostgreSQL** (for local database setup or use Docker)
- **Docker** (if running PostgreSQL container locally)

## Installation

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 3. Set up PostgreSQL

You can either use a local PostgreSQL installation or run a PostgreSQL container using Docker.

Option 1: Local PostgreSQL Setup
Ensure PostgreSQL is installed locally and create a new database for the app.

Option 2: Run PostgreSQL with Docker
To run PostgreSQL locally using Docker, run the following commands:

```bash
docker run --name postgres-todo-app -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=tododb -p 5432:5432 -d postgres
```

This will start a PostgreSQL container on port 5432. You can connect to it using the credentials:

- User: postgres
- Password: yourpassword
- Database: tododb

### 4. Configure Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:

```bash
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/tododb?schema=public"
JWT_SECRET=your_jwt_secret
```

Replace yourpassword with your PostgreSQL password and your_jwt_secret with a secret string for signing JWT tokens.

### 5. Run Database migrations
Run the Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev
```

### 6. Start the Application
Start the NestJS app:

```bash
npm run start:dev
```

The app will be available at http://localhost:3000.

### 6. Testing with Postman
To test the API, import the Postman collection file (todo-api.postman_collection.json) into Postman.

- Open Postman and click Import.
- Select the todo-api.postman_collection.json file from the project directory.
- Use the collection to test the authentication and CRUD operations for tasks and categories.
- Endpoints

Here are some key endpoints in the app:

### POST /auth/login – Login and obtain a JWT token.
### POST /auth/register – Register new User and obtain a JWT token.
### GET /task – Retrieve all tasks for the authenticated user.
### POST /task – Create a new task.
### PUT /task/:id – Update an existing task.
### DELETE /task/:id – Delete a task.
### GET /category – Retrieve all categories for the user.
### POST /category – Create a new category.
### DELETE /category/:id – Delete a category.

