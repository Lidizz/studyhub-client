# StudyHub
 
StudyHub is a minimalist online learning platform designed to increase productivity and promote effective learning through consistent management of educational resources.
Our goal is to enable instructors and educational institutions to deliver high quality learning experiences efficiently.
 
## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Team Members](#team-members)
- [License](#license)
 
## Project Overview
StudyHub is a platform that enables:
- **Students**  
  - Signup  
  - Login  
  - View:  
    - Enrolled courses  
    - Course info  
    - Course modules  
    - Course resources 
    - Course assignments  
    - Feedback and grade  
  - Download:  
    - Resources  
    - Own submitted assignments  
  - Upload:  
    - Submitting assignments  

- **Instructors**  
  - Signup  
  - Login  
  - Create:  
    - Course  
    - Course module  
    - Module resource  
    - Assignment  
    - Feedback and grade  
  - View:  
    - Teaching courses  
    - Course info  
    - Course modules  
    - Course resources 
    - Course assignments  
    - Provided feedback and grade  
  - Download:  
    - Resources 
    - Submitted assignments  
  - Update:  
    - Course  
    - Module  
    - Assignment  
    - Resource  
  - Delete:  
    - Module  
    - Assignment  
    - Resource  
 

The frontend is built with React 19, utilizing Redux for state management and Tailwind CSS for styling. The backend, built with Java 21 and Spring Boot 3, provides a RESTful API for managing users, courses, assignments, modules, and resources, with data stored in a PostgreSQL database.
 
## Features
- **User Authentication**: Login and signup functionality with role-based access (Student, Instructor).
- **Course Management**:
  - Create and edit courses (Instructors).
  - View course details, modules, assignments and resources.
- **Module Management**:
  - Create, edit, and delete course modules (Instructors).
  - View module details and associated resources.
- **Assignment Management**:
  - Create, edit, and delete assignments (Instructors).
  - Submit assignments with file uploads (Students).
  - Grade submissions and provide feedback (Instructors).
- **Resource Management**:
  - Upload and manage text or file-based resources for modules (Instructors).
  - Download resources (Students).
- **Theme Support**: Light and dark mode toggle for better user experience.
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS.
 
## Technologies
### Frontend
- **React**: ^19.0.0
- **React Router**: ^7.4.1
- **Redux Toolkit**: ^2.6.1
- **Axios**: ^1.8.4
- **Tailwind CSS**: ^3.4.17
- **Lucide React**: ^0.485.0
- **Vite**: ^6.3.5
- **ESLint**: ^9.21.0
- **Prettier**: ^3.0.0
 
### Backend
- **Java**: 21
- **Spring Boot**: 3
- **PostgreSQL**: Database
 
### Development Tools
- **Node.js**: ^20.x
- **npm**
- **Maven**
- **Postman**
- **Swagger**
- **Git**
 
## Prerequisites (used by us)
- **Node.js**: Version 20.x or higher
- **Java**: Version 21
- **Maven**: For building the Spring Boot backend
- **PostgreSQL**: Version 15 or higher
- **Git**: For cloning the repository
- **Code Editor**: Developed with Webstorm and IntelliJ IDEA but any editor can work
 
## Setup Instructions
 
### Backend Setup
1. **Clone the Repository**:
  - Recommended to follow the readme on: [StudyHub Backend Repository](https://github.com/Lidizz/studyhub-backend)  

  **Or clone from the following:**
   ```bash
   git clone <https://github.com/Lidizz/studyhub-backend.git>
   cd studyhub-backend
   ```
2. **Configure PostgreSQL**:
   - Create a PostgreSQL database named `studyhub-db`.
   - Update the `application.properties` file in `src/main/resources` with your database credentials:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/studyhub-db
     spring.datasource.username=your-username
     spring.datasource.password=your-password
     spring.jpa.hibernate.ddl-auto=update
     ```
3. **Build and Run the Backend**:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   The backend will run on `http://localhost:8080`.
 
### Frontend Setup
1. **Navigate to the Frontend Directory**:
   ```bash
   cd studyhub-client
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
 
3. **Run the Frontend**:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.
 
## Running the Application
1. Run the backend server (`mvn spring-boot:run`).
2. Run the frontend development server (`npm run dev`).
3. Open `http://localhost:5173` in your browser to access the application.
4. Use the signup page (`/signup`) to create a new user account or log in (`/login`) with existing credentials.
 
## Project Structure
### Frontend (`studyhub-client`)
```
studyhub-client/
├── src/
│   ├── components/
│   │   ├── assignment/        
│   │   ├── common/            
│   │   ├── course/            
│   │   ├── module/            
│   │   ├── resource/          
│   │   ├── user/              
│   ├── pages/                  
│   ├── services/              
│   ├── store/                
│   ├── utils/                
│   ├── App.jsx                
│   ├── index.css              
│   ├── main.jsx              
│   ├── themeConfig.js        
├── eslint.config.js          
├── package.json              
├── postcss.config.js          
├── tailwind.config.js        
├── vite.config.js            
```
 
## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a pull request.
 
Please ensure code follows the ESLint and Prettier configurations for the frontend and adheres to Java coding standards for the backend.
 
## Team Members
- Lidor Shachar
- Sahrish Nosheen
- Christin Wøien Skattum
- Camilla Dahl Strømberg
- Adnan Mohamed Osman Arab
 
## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.