# Employee Management System

A full-stack employee management application built with Spring Boot and React. It allows users to create, view, update, and delete employee records through a modern web interface.

## Features

- Add new employees
- View all employees
- Search or fetch employee details by ID
- Update employee information
- Delete employee records
- REST API backend with MySQL persistence
- Responsive frontend built with React and Bootstrap

## Tech Stack

### Backend

- Java 21
- Spring Boot 3 / 4 (project currently configured with Spring Boot 4.1.2)
- Spring Data JPA
- MySQL
- Maven

### Frontend

- React 19
- Vite
- Bootstrap
- Axios
- React Router DOM

## Project Structure

```text
Employee Management System/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── mvnw
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Prerequisites

Before running the project, make sure you have installed:

- Java 21 or above
- Maven
- Node.js 18+ and npm
- MySQL Server

## Database Setup

1. Open MySQL and create a database named `ems`:

```sql
CREATE DATABASE ems;
```

2. Update the database credentials in:

```text
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ems
spring.datasource.username=root
spring.datasource.password=your_password
```

## Run the Backend

From the project root:

```bash
cd backend
./mvnw spring-boot:run
```

The backend server will start on:

```text
http://localhost:8080
```

## Run the Frontend

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## API Endpoints

The backend exposes REST APIs under `/api/employees`:

- `POST /api/employees/create` - Create employee
- `GET /api/employees/get/all` - Get all employees
- `GET /api/employees/get/{id}` - Get employee by ID
- `PUT /api/employees/update/{id}` - Update employee
- `DELETE /api/employees/delete/{id}` - Delete employee

## Example Usage

- Open the frontend in the browser at `http://localhost:5173`
- Add, view, edit, and remove employee records
- The frontend communicates with the Spring Boot API using Axios

## Notes

- The backend is configured with CORS enabled to allow requests from the frontend.
- Hibernate is set to update the schema automatically using `ddl-auto=update`.

## License

This project is open for educational and personal use.

## Author

This project was created as a full-stack employee management application for learning and practice.
