# Install

- npm i
- make.env
- start app 'npm run start'

## In the application

### To log in:
- Email: beno2001@hotmail.com
- Password: 123


# Application Overview

## 1. Functionality

### 1.1 Authentication: Sign-in and Sign-out
- Display sign-in screen when user is not logged in.
- Authenticate using email-password combination.
- Validate fields with visual feedback for users.

### 1.2 Authentication: Registration
- Register with first name, last name, email, and password.
- Encrypt password in the database.
- Validate fields with visual feedback for users.

### 1.3 Main Application
- Add tasks within specific categories.

#### 1.3.1 Todo CRUD
- Create, read, update, and delete todo items only when logged in (via cookies).
- Archive todo items by checking them off.

#### 1.3.2 Category CRUD
- Create, read, update, and delete categories only when logged in.
- Delete associated todo items when deleting a category.
- Integrate middleware for field validation and error handling.

### 1.4 API
- Perform CRUD operations to the database via separate API routes.
- Implement correct methods (GET / POST / PUT / PATCH / DELETE) for tasks and categories.
- Middleware for validating POST/PUT/DELETE requests.
- Authentication & Authorization using JSON Web Tokens.

### 1.5 Extras
- Implement additional features for excelling, such as pagination, endless scrolling, search, filtering, sorting, todo list grouping, sharing via QR Code, exporting to PDF, settings customization, and file upload.

## 2. Technical Requirements

- NodeJS and Express for handling client <-> server requests and responses.
- MVC (Model, View, Controller) architecture.
- Handlebars as the templating engine.
- HTML & CSS for building the interface.
- Knex & Objection with SQLite3 database for data storage and management.
- JWT for client-server authentication.
- express-validator for login form validation.
- bcrypt for password encoding and decoding.
- body-parser for parsing body to/from JSON.
- cookie-parser for parsing cookies to/from the client.