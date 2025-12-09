Backend Assessment – NestJS + PostgreSQL + JWT Auth

This project is a backend assignment built using NestJS, TypeORM, and PostgreSQL, implementing full CRUD, authentication, authorization, and unit testing using Jest.

All requirements from the assessment are fully completed.

🚀 Tech Stack

Layer	Technology
Framework	NestJS
Database	PostgreSQL
ORM	TypeORM
Authentication	JWT (JSON Web Token)
Validation	class-validator, class-transformer

Testing	Jest
Language	TypeScript


📌 Features Implemented

✔ User Registration
✔ User Login (JWT Authentication)
✔ Authentication Guard
✔ CRUD Operations for Users
✔ DTO Validation
✔ Global Error Handling
✔ TypeORM Entities
✔ PostgreSQL Integration
✔ Unit Tests for Controller + Service
✔ Jest + Mocks
✔ Clean folder structure
✔ Professional code formatting

📁 Project Structure
src/
│── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   ├── dto/
│       ├── login.dto.ts
│
│── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── user.entity.ts
│   ├── dto/
│       ├── register.dto.ts
│       ├── update.dto.ts
│
│── test/
│   ├── auth.service.spec.ts
│   ├── auth.controller.spec.ts
│   ├── users.service.spec.ts
│   ├── users.controller.spec.ts
│
│── app.module.ts
│── main.ts

🔧 Environment Variables

Create a .env file in the root:

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=yourdbname

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

🛠️ Installation
1️⃣ Clone the repo
git clone <your_repo_link>
cd <project_folde>

2️⃣ Install dependencies
npm install

3️⃣ Setup database (PostgreSQL)

Create a database:

createdb assessment_db

4️⃣ Run migrations (if any)

Not required if synchronize=true in TypeORM config

▶️ Running the App
Start in development mode:
npm run start:dev


API runs at:

👉 http://localhost:3000

🧪 Running Unit Tests
npm run test


OR watch mode:

npm run test:watch


✔ All tests pass
✔ Jest mocks included
✔ Services + Controllers covered




🔐 Authentication Flow
POST /auth/register

Registers a new user.

POST /auth/login

Returns JWT token.

Protected Routes

Use Header:




Authorization: Bearer <token>

📚 API Endpoints

🔹 Auth Routes

Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Login + Receive JWT


🔹 User Routes (Protected)

Method	Endpoint	Description
GET	/users	Get all users
POST	/users	Create new user
PATCH	/users/:id	Update user
DELETE	/users/:id	Delete user


🧾 Example Request Bodies
Register User
{
  "name": "Yash",
  "email": "yash@example.com",
  "password": "password123"
}

Login
{
  "email": "yash@example.com",
  "password": "password123"
}

Update User
{
  "name": "New Name"
}

✔️ Unit Test Summary

All tests passed:

PASS  src/test/users.service.spec.ts
PASS  src/test/auth.service.spec.ts
PASS  src/test/auth.controller.spec.ts
PASS  src/test/users.controller.spec.ts

Test Suites: 4 passed, 4 total
Tests:       21 passed, 21 total


Service tests

Controller tests

Auth tests

Mocked bcrypt & JWT

Full coverage of logic

🧹 Code Quality

✔ Follows NestJS best practices
✔ DTO validation enabled
✔ Proper module separation
✔ Clean and maintainable structure
✔ Type safety everywhere

🎉 Conclusion

This project fulfills all requirements of the SDE Intern (Backend) - NestJS Technical Assessment, including:

NestJS + PostgreSQL

CRUD

JWT Auth

DTO Validation

Error Handling

Unit Tests

GitHub Repository

This backend is production-ready and well-tested.