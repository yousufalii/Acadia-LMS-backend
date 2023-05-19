# LMS Backend

Welcome to the LMS Backend repository! 🏫 This powerful backend system is designed to support your Learning Management System (LMS) website, providing a seamless experience for managing assignments, quizzes, announcements, attendance, and results.

## Prerequisites

Before getting started, please ensure that you have the following prerequisites installed:

- Node.js (v14.0.0 or higher)
- MongoDB (v4.0.0 or higher)

## Installation

To get the LMS Backend up and running on your local machine, follow these steps:

1. **Clone the repository:**
```
git clone <repository-url>
```
  
  2. **Install the dependencies:**
  ```
  npm install
  ```
 

3. **Start the server:**
  ```
  npm start
  ```
  
Sit back and enjoy as the server starts running on `http://localhost:3000`! 🚀

## API Routes

Take advantage of the following API routes to unleash the full potential of your LMS website:

### Signup API
- **`POST /signup`**: New student signup endpoint.

### Login and Logout API

- **`POST /login`**: Student login endpoint.
- **`DELETE /login`**:Student logout endpoint.

### Announcement APIs
- **`POST /announcement`**: User registration endpoint.
- **`GET /announcement`**: User login endpoint.
- **`PUT /announcement`**: Create a new announcement.
- **`DELETE /announcement`**: Create a new assignment.

### Assignment APIs
- **`POST /assignment`**: Create a new assignment.
- **`GET /assignment`**: Get all assignments.
- **`POST /assignment/:assignmentId/:studentId/submit`**: Submit an assignment file.
- **`PUT /assignment/:assignmentId/:studentId/submit`**: Update a submitted assignment file.
- **`DELETE /assignment`**: Delete an assignment.
- **`DELETE /assignment/deletesubmission`**: Delete an assignment submission by student ID.

### Quiz APIs
- **`POST /quiz`**: Create a new quiz.
- **`GET /quiz`**: Get all quizzes.
- **`POST /quiz/:studentId/:quizId/submit`**: Submit a quiz result for a student.
- **`GET /quiz/:studentId/quizresult`**: Get quiz result by student ID.
- **`PUT /quiz/editquiz`**: Update a quiz by quiz ID.
- **`DELETE /quiz/deletequiz`**: Delete a quiz by quiz ID.
- **`PUT /quiz/udpatequizresult`**: Update quiz result by quiz ID.
- **`DELETE /quiz/deletequizresult`**: Delete quiz result by student ID.

### Attendance APIs

- **`POST /attendance`**: Create a new attendance record.
- **`GET /attendance`**: Get attendance records.
- **`PUT /attendance`**: Update attendance record.
- **`DELETE /attendance`**: Delete attendance record.

### Result APIs
- **`POST /result`**: Create a new result.
- **`GET /result/:studentId`**: Get result by student ID. 
- **`PUT /result`**: Update result by student ID.
- **`DELETE /result`**: Delete result by student ID.


## Dependencies

The LMS Backend utilizes a range of powerful dependencies to bring you exceptional functionality and performance:

- **bcrypt**: Password hashing and comparison.
- **body-parser**: Parse incoming request bodies.
- **cors**: Enable cross-origin resource sharing.
- **dotenv**: Load environment variables from `.env` file.
- **express**: Web application framework.
- **jsonwebtoken**: Generate and verify JSON Web Tokens (JWT).
- **mongodb**: Official MongoDB driver for Node.js.
- **mongoose**: MongoDB object modeling.
- **multer**: Handle file uploads.
- **nodemon**: Automatically restart the server on file changes (development only).

## License

This project is licensed under the ISC License. Feel free to explore, modify, and expand upon it as you build your own LMS masterpiece!

Now go ahead and revolutionize education with the incredible LMS Backend. Happy coding! 🚀✨

