# 🧪 Backend Practice Questions (Beginner Level)

This file contains a curated list of beginner-level backend development practice questions to help solidify your understanding of **Node.js**, **Express**, and **MongoDB**.

---

## 🔰 Basic Level

1. **Hello API**

   - Create a route `/hello` that returns: `"Hello, Jayant!"`

2. **JSON Response**

   - Create a route `/info` that returns a JSON object with your name, age, and favorite programming language.

3. **Query Parameters Practice**

   - Create a GET route `/greet?name=Jayant` that returns: `"Hello, Jayant"`.

4. **Route Parameters Practice**

   - Create a route `/users/:id` that returns: `"User ID is <id>"`.

5. **Simple Calculator**
   - Create a route `/add?num1=10&num2=20` that returns the sum of the two numbers.

---

## 📁 File Handling & Middleware

6. **Logging Middleware**

   - Implement middleware to log each incoming request's method and URL.

7. **Static File Serving**
   - Serve static files from a `public` folder using Express.

---

## 🧠 MongoDB + CRUD

8. **Connect to MongoDB**

   - Connect your Express app to a MongoDB database using Mongoose.

9. **User Model**

   - Create a Mongoose model for `User` with `name`, `email`, and `age`.

10. **CRUD APIs for Users**

- `POST /users` – Create a new user
- `GET /users` – List all users
- `GET /users/:id` – Get a single user by ID
- `PUT /users/:id` – Update user by ID
- `DELETE /users/:id` – Delete user by ID

---

## 🔒 Authentication Basics

11. **User Registration**

- Create an endpoint to register users with name, email, and password.

12. **User Login**

- Create a login route to authenticate users based on email & password.

13. **JWT Authentication**

- Secure routes using JWT (e.g., protect `/users` so only logged-in users can access it).

---

## 🛒 Mini Projects

14. **To-Do List API**

- Users can:
  - Add tasks
  - View all tasks
  - Update a task
  - Delete a task
- Each task has a title, completed status, and user ID.

15. **Blog API**

- Users can:
  - Create blog posts
  - View posts
  - Like/unlike a post
  - Comment on posts
- Only the post owner can update or delete their post.

---

## 🧠 Bonus Practice Ideas

- Add pagination to `GET /users`
- Add filtering by name or age
- Use environment variables with `.env`
- Deploy to Render or Railway

---

## ✅ Tip

Start simple. Test each endpoint using **Postman** or **Thunder Client**. Focus on clean structure and reusability of code.

Happy Coding! 🚀
