# Mean stack school management system 

This is a simple school management system built with the MEAN (MongoDB, Express.js, Angular, Node.js) stack. It features role-based access control for Admins, Teachers, and Students, allowing them to manage and view school data according to their permissions.

 ***Live Deployment

  Frontend (Angular):https://mean-school-management-frontend.onrender.com 
   Backend (Node.js):https://mean-school-management.onrender.com

***Features

 1. Admin Features
Manage Users:** Create, view, edit (role/grade), and delete Teachers and Students.
Manage Subjects:** Full CRUD (Create, Read, Update, Delete) functionality for academic subjects.
Manage Grades:** Full CRUD functionality for grades/classes.
Assign Teachers to Grades:** Link a specific teacher to a grade.
Assign Students to Grades:** Enroll a student in a specific grade.

2. Teacher Features
View Assigned Students:** View a list of only the students enrolled in the grades they are assigned to.
Assign Marks:** Assign marks to their students for any subject.
View Student Marks:** Select a student to view their complete report card.

 3. Student Features
 View Marks:** View a personal report card with all assigned marks for their subjects.
Dashboard Summary:** View a summary of their academic performance, like average mark.

 4. Core System Features
JWT Authentication:** Secure login system using JSON Web Tokens.
Role-Based Access Control (RBAC):** Backend and Frontend are protected, ensuring users can only access features permitted for their role.


***Project Architecture
This  project is organized into two main parts: a *backend folder for the Node.js API and a *frontend folders.

*Backend (Node.js & Express)
`config/`**: Contains the database connection logic (`db.js`).
`controllers/`: Holds the logic for each API endpoint (e.g., `user.controller.js`, `subject.controller.js`).
`middleware/`: Contains middleware for authentication (`protect`) and authorization (`authorize`) using JWT.
`models/`: Defines the Mongoose schemas for all database collections (User, Subject, Grade, Mark).
`routes/`: Defines the API routes and maps them to the corresponding controller functions.
`server.js`: The main entry point for the application, where the server is initialized and all parts are connected.


*Frontend (Angular)
`core/`: Contains singleton services (`AuthService`, `UserDataService`), route guards (`AuthGuard`, `RoleGuard`), and global data models.
`features/`: Contains the core application features, organized into lazy-loaded modules (`admin`, `teacher`, `student`). This improves initial load performance.Each feature module has its own routing and components.
`shared/`: Contains reusable components (`LayoutComponent`) and a dedicated `MaterialModule` to manage all Angular Material component imports.
Standalone Components: Modern standalone components are used for dialogs (`UserDialogComponent`, etc.) to keep the application modular and clean, importing their own dependencies directly.



***Prerequisites to develop 
   Node.js (v18 or later)
   npm (Node Package Manager)..(npm install)
   Angular CLI (`npm install -g @angular/cli`)
   A free MongoDB Atlas account for the database.


***Backend Setup
bash
1. Navigate to the backend folder(cd backend)
2. Install dependencies(npm install)
3. Create a .env file in the backend folder and add this (PORT=5000
MONGO_URI=mongodb://mulukenasefateju:win1@ac-gd8sp4f-shard-00-00.qmqrdvk.mongodb.net:27017,ac-gd8sp4f-shard-00-01.qmqrdvk.mongodb.net:27017,ac-gd8sp4f-shard-00-02.qmqrdvk.mongodb.net:27017/school-db?ssl=true&replicaSet=atlas-10qfng-shard-0&authSource=admin&retryWrites=true&w=majority&appName=SchoolMgmtSystem
JWT_SECRET=supersecretkey )
4. Start the backend server(npm start)




**** frontend setup
bash
1. Open a new terminal and navigate to the frontend folder(cd frontend)
2. Install dependencies(npm install)
3. Run the Angular development server(ng serve)




****Challenges Faced and Solutions
the first challenge before all  i faced is adapting the frames and using the online database but after trying to learn it things gonna be step by step simple after that i face challenge which is   on the initial backend connection to MongoDB Atlas failed repeatedly  IP Whitelist errors.but i solve it  which solved the DNS  fix by ensuring the MongoDB Atlas IP Access List was set to "Allow Access From Anywhere" (0.0.0.0/0), which is ideal for a development environment where the public IP can change.
the second Challenge is Implementing a secure and logical workflow for teachers and admin but solved by  Instead of allowing teachers to fetch all students, a new backend endpoint (/api/users/my-students) was created. This endpoint uses the authenticated teacher's ID to find which grades they are assigned to, and then fetches only the students belonging to those specific grades this makes the application  realistic and secured
Challenge: deploying the application to render but solved by using need exact mongodb url and correct filing 