
# Quizz Platform Backend API

This is a backend API for a Quizz platform built using **Node.js**, **Express**, and **MongoDB**. The API allows users to register, log in, create quizzes (for admins), comment on quizzes, and like or dislike them. JWT-based authentication is used to secure the application.

## Features

- **User Authentication**: Users can register, log in, and receive a JWT token for authentication.
- **Role-based Access**: Admin users can create and manage quizzes, while regular users can participate by adding comments and likes.
- **Quiz Management**: Admin users can create quizzes with multiple questions, and view comments on quizzes.
- **Commenting System**: Users can comment on quizzes, and admins can reply to comments.
- **Like/Dislike**: Users can like or dislike quizzes.

## Prerequisites

To run this project, you'll need:

- **Node.js** (v14.x or later)
- **MongoDB** (running locally or using a service like MongoDB Atlas)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quizz-platform-backend.git
   cd quizz-platform-backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and configure the following environment variables:
   ```env
   JWT_SECRET=your_secret_key
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```

4. Start the server:
   ```bash
   npm start
   ```

   The server will start running on `http://localhost:3000`.

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user.

- **Request Body**:
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "username": "johndoe",
    "password": "password123"
  }
  ```
- **Response**:
  - `201 Created`: User registered successfully.
  - `400 Bad Request`: Error in registration process.

#### POST `/api/auth/login`
Login with email/username and password.

- **Request Body**:
  ```json
  {
    "emailOrUsername": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - `200 OK`: Returns JWT token.
  - `401 Unauthorized`: Invalid credentials.
  - `404 Not Found`: User not found.

#### POST `/api/auth/admin`
Register a new admin user (admin role only).

- **Request Body**:
  ```json
  {
    "firstname": "Admin",
    "lastname": "User",
    "email": "admin@example.com",
    "username": "adminuser",
    "password": "adminpassword"
  }
  ```
- **Response**:
  - `201 Created`: Admin registered successfully.
  - `400 Bad Request`: Error in registration.

### Quizz Endpoints

#### POST `/api/quizzes/create`
Create a new quiz (admin role only).

- **Request Header**:
  - `Authorization`: Bearer token
- **Request Body**:
  ```json
  {
    "title": "Sample Quiz",
    "description": "This is a sample quiz description.",
    "questions": [
      {
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin", "Madrid"],
        "answer": "Paris"
      }
    ]
  }
  ```
- **Response**:
  - `201 Created`: Quiz created successfully.
  - `403 Forbidden`: Access denied (non-admin user).
  - `400 Bad Request`: Quiz creation failed.

#### GET `/api/quizzes/:quizzId/comments`
Get all comments for a specific quiz.

- **Request Header**:
  - `Authorization`: Bearer token
- **Response**:
  - `200 OK`: Returns a list of comments.
  - `404 Not Found`: Quiz not found.

#### POST `/api/quizzes/:quizzId/comments`
Add a comment to a quiz.

- **Request Header**:
  - `Authorization`: Bearer token
- **Request Body**:
  ```json
  {
    "comment": "This is a sample comment."
  }
  ```
- **Response**:
  - `201 Created`: Comment added successfully.
  - `404 Not Found`: Quiz not found.
  - `400 Bad Request`: Error in adding comment.

#### POST `/api/quizzes/like/:id`
Like a quiz.

- **Request Header**:
  - `Authorization`: Bearer token
- **Response**:
  - `200 OK`: Like added successfully.
  - `404 Not Found`: Quiz not found.
  - `400 Bad Request`: Error in liking the quiz.

#### POST `/api/quizzes/dislike/:id`
Dislike a quiz.

- **Request Header**:
  - `Authorization`: Bearer token
- **Response**:
  - `200 OK`: Dislike added successfully.
  - `404 Not Found`: Quiz not found.
  - `400 Bad Request`: Error in disliking the quiz.

### Comment Endpoints

#### PUT `/api/comments/reply/:quizzId/:commentId`
Admin reply to a comment on a quiz.

- **Request Header**:
  - `Authorization`: Bearer token (admin user only)
- **Request Body**:
  ```json
  {
    "reply": "This is an admin reply."
  }
  ```
- **Response**:
  - `200 OK`: Reply added successfully.
  - `403 Forbidden`: Access denied (non-admin user).
  - `404 Not Found`: Comment not found.
  - `400 Bad Request`: Error in replying to the comment.

## Middleware

- **authMiddleware**: Protects routes and verifies JWT tokens. Adds the authenticated user to `req.user`.

## Models

### User Model

| Field      | Type   | Description          |
|------------|--------|----------------------|
| firstname  | String | User's first name    |
| lastname   | String | User's last name     |
| email      | String | User's email         |
| username   | String | Unique username      |
| password   | String | Hashed password      |
| role       | String | User role (`user` or `admin`) |

### Quizz Model

| Field      | Type     | Description                   |
|------------|----------|-------------------------------|
| title      | String   | Title of the quiz             |
| description| String   | Description of the quiz       |
| questions  | Array    | Array of quiz questions       |
| comments   | Array    | Array of comments on the quiz |
| createdBy  | ObjectId | ID of the admin who created   |

## License

This project is licensed under the MIT License.
