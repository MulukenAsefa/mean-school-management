# MEAN Stack School Management System

This is a simple school management system built with the MEAN (MongoDB, Express.js, Angular, Node.js) stack. It features role-based access control for Admins, Teachers, and Students, allowing them to manage and view school data according to their permissions.

## Live Deployment

-   **Frontend (Angular):** [Your Live Frontend URL Will Go Here]
-   **Backend (Node.js):** [Your Live Backend URL Will Go Here]

---

## Features

### 1. Admin Features
-   ✅ **Manage Users:** Create, view, edit (role/grade), and delete Teachers and Students.
-   ✅ **Manage Subjects:** Full CRUD (Create, Read, Update, Delete) functionality for academic subjects.
-   ✅ **Manage Grades:** Full CRUD functionality for grades/classes.
-   ✅ **Assign Teachers to Grades:** Link a specific teacher to a grade.
-   ✅ **Assign Students to Grades:** Enroll a student in a specific grade.

### 2. Teacher Features
-   ✅ **View Assigned Students:** View a list of only the students enrolled in the grades they are assigned to.
-   ✅ **Assign Marks:** Assign marks to their students for any subject.
-   ✅ **View Student Marks:** Select a student to view their complete report card.

### 3. Student Features
-   ✅ **View Marks:** View a personal report card with all assigned marks for their subjects.
-   ✅ **Dashboard Summary:** View a summary of their academic performance, like average mark.

### 4. Core System Features
-   ✅ **JWT Authentication:** Secure login system using JSON Web Tokens.
-   ✅ **Role-Based Access Control (RBAC):** Backend and Frontend are protected, ensuring users can only access features permitted for their role.

---

## Project Architecture

The project is organized into two main parts: a `backend` folder for the Node.js API and a `frontend` folder for the Angular application.

### Backend (Node.js & Express)
-   **`config/`**: Contains the database connection logic (`db.js`).
-   **`controllers/`**: Holds the business logic for each API endpoint (e.g., `user.controller.js`, `subject.controller.js`).
-   **`middleware/`**: Contains middleware for authentication (`protect`) and authorization (`authorize`) using JWT.
-   **`models/`**: Defines the Mongoose schemas for all database collections (User, Subject, Grade, Mark).
-   **`routes/`**: Defines the API routes and maps them to the corresponding controller functions.
-   **`server.js`**: The main entry point for the application, where the server is initialized and all parts are connected.

### Frontend (Angular)
-   **`core/`**: Contains singleton services (`AuthService`, `UserDataService`), route guards (`AuthGuard`, `RoleGuard`), and global data models.
-   **`features/`**: Contains the core application features, organized into lazy-loaded modules (`admin`, `teacher`, `student`). This improves initial load performance.
    -   Each feature module has its own routing and components.
-   **`shared/`**: Contains reusable components (`LayoutComponent`) and a dedicated `MaterialModule` to manage all Angular Material component imports.
-   **Standalone Components:** Modern standalone components are used for dialogs (`UserDialogComponent`, etc.) to keep the application modular and clean, importing their own dependencies directly.

---

## Setup and Run Locally

### Prerequisites
-   Node.js (v18 or later)
-   npm (Node Package Manager)
-   Angular CLI (`npm install -g @angular/cli`)
-   A free MongoDB Atlas account for the database.

### 1. Backend Setup
```bash
# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create a .env file in the 'backend' folder
#    and add your configuration variables:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=a_long_and_secure_secret_key

# 4. Start the backend server
npm start
# 1. Open a new terminal and navigate to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Run the Angular development server
ng serve
Challenges Faced and Solutions
Challenge: Initial backend connection to MongoDB Atlas failed repeatedly with ETIMEOUT and IP Whitelist errors.
Solution: This was a multi-step debugging process. We first corrected the connection string format from the newer mongodb+srv to the older, more direct format, which solved the DNS timeout. The final fix was ensuring the MongoDB Atlas IP Access List was set to "Allow Access From Anywhere" (0.0.0.0/0), which is ideal for a development environment where the public IP can change.
Challenge: Implementing a secure and logical workflow for teachers to only see their assigned students.
Solution: Instead of allowing teachers to fetch all students, a new backend endpoint (/api/users/my-students) was created. This endpoint uses the authenticated teacher's ID to find which grades they are assigned to, and then fetches only the students belonging to those specific grades. This makes the application more realistic and secure.
Challenge: The Angular CLI generated modern "standalone" components, which conflicted with the traditional NgModule-based setup.
Solution: We embraced the modern approach. The standalone dialog components were updated to import their own dependencies (like ReactiveFormsModule and Angular Material modules) directly in their @Component decorator. They were then removed from the declarations array of the admin.module.ts, resolving the conflict and keeping the code clean.