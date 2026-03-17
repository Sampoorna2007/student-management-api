# Student Management REST API

This is a simple REST API project created using Node.js http module.

In this project, I have implemented basic CRUD operations for managing student data.

## Features

- Add a student
- Get all students
- Get student by ID
- Update student
- Delete student

## Technologies Used

- Node.js (http module)

## How to run

1. Open terminal
2. Run command: node assignment.js
3. Server will start on http://localhost:3000

## API Endpoints

- GET /students
- POST /students
- PUT /students/:id
- DELETE /students/:id

## Validation

- All fields are required
- Email must be valid
- Year should be between 1 to 4

## Error Handling

- 400 for bad request
- 404 for not found
