# Level Two Backend & Database Assignments

## 1. User Authentication with JWT

- Implement user registration and login using JWT.
- Store hashed passwords using `bcrypt`.
- Generate a JWT token on successful login.
- Protect private routes using JWT middleware.

## 2. Role-Based Access Control

- Add a `role` field to the user schema (e.g., "admin", "user").
- Only admin users can access certain routes like `/admin`, `/delete-users`, etc.

## 3. Pagination & Filtering

- Create an endpoint `/users` to fetch users with pagination.
- Support query parameters like `?page=2&limit=5`.
- Add filtering options like `/users?age=25`.

## 4. File Upload

- Use `multer` to upload profile pictures.
- Save the file path in the database.
- Create endpoints to upload and fetch profile pictures.

## 5. Password Reset Flow

- Implement a "Forgot Password" feature.
- Generate a token and simulate email by logging it to the console.
- Create a `reset-password/:token` route to reset the password.

## 6. Data Relationships

- Create a `Post` model with fields: title, content, author.
- Relate posts to users using ObjectId.
- Create endpoints to:
  - Create a post
  - Get all posts by a user
  - Get post details with author's info populated

## 7. Comments Feature

- Add a `Comment` model related to `Post` and `User`.
- Create endpoints to:
  - Add a comment to a post
  - Get all comments of a post
  - Delete a comment (only by owner or admin)

## 8. Soft Delete Implementation

- Add `isDeleted` field to users.
- Create a soft-delete endpoint to set `isDeleted: true`.
- Modify GET requests to ignore soft-deleted users unless an admin.

## 9. Activity Logs Middleware

- Create a middleware that logs:
  - Method
  - URL
  - User ID (from token)
  - Timestamp
- Save logs to a separate `logs` collection in MongoDB.

## 10. Email Validation

- Add email format validation on registration.
- Check if the email is already in use before creating a user.

---
