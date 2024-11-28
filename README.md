
# **Imagii Project**

## **Overview**
Imagii is a web-based platform that enables efficient user management with role-based access control for administrators. The application facilitates seamless profile management and user interaction, offering an intuitive interface and visually appealing design. Imagii leverages modern web technologies to provide a responsive, secure, and user-friendly experience.

---

## **Features**
- **User Management**:
  - View all registered users.
  - Assign and update user roles (Admin, Moderator, Client).
  - Role-based access control for different functionalities.
  
- **Profile Management**:
  - Display user profiles with detailed information.
  - Update user information securely.

- **Authentication**:
  - Login and registration functionality with session-based authentication.
  - Passport.js integration for secure user authentication.

- **Dynamic UI**:
  - Modern and responsive design with dynamic role-based forms.
  - Background blur effects for enhanced UI aesthetics.

- **Error Handling**:
  - Graceful handling of errors with user-friendly messages.
  - Logging for debugging purposes.

---

## **Tech Stack**
- **Frontend**:
  - HTML5, CSS3, JavaScript (with EJS for templating).
- **Backend**:
  - Node.js, Express.js.
- **Database**:
  - MongoDB (with Mongoose for Object Data Modeling).
- **Authentication**:
  - Passport.js for session-based authentication.
- **CSS Styling**:
  - Custom styling with responsive designs and effects.

---

## **Installation**

### **Prerequisites**
- Node.js (v14+ recommended)
- MongoDB (running locally or on a cloud service like MongoDB Atlas)

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/imagii.git
   cd imagii
2. Install dependencies:

```bash
npm install
```
3. Configure environment variables: Create a .env file in the root directory and include the following:

```
PORT=3000
MONGO_URI=your_mongo_connection_string
DB_NAME=imagii
SESSION_SECRETE=your_session_secret
```
4. Start the application:
```
Copy code
npm start
```
5. Open the application in your browser:
```
http://localhost:3000
```

## **Folder Structure** ##
```
imagii/
├── public/                # Static files (images, CSS, JS)
│   └── images/
├── routes/                # Route handlers
│   ├── auth.route.js
│   ├── index.route.js
│   └── admin.route.js
├── views/                 # EJS templates
│   ├── layouts/           # Layout files (header, footer)
│   ├── manage-users.ejs   # User management page
│   ├── profile.ejs        # User profile page
│   └── error.ejs          # Error page
├── models/                # Mongoose models
│   └── user.model.js
├── utils/                 # Utility files
│   └── passport.auth.js   # Passport configuration
├── .env                   # Environment variables
├── app.js                 # Main application file
└── package.json           # Dependencies and scripts
```

## **Key Routes** ##
- ### Public Routes

| Route         | Method | Description   |
|---------------|--------|---------------|
| `/`           | GET    | Home page     |
| `/auth/login` | GET    | Login page    |
| `/auth/signup`| GET    | Signup page   |
- ### Admin Routes

| Route              | Method | Description                       |
|--------------------|--------|-----------------------------------|
| `/admin/users`     | GET    | View and manage all users         |
| `/admin/user/:id`  | GET    | View a specific user's profile    |
| `/admin/update-role`| POST  | Update the role of a specific user|
