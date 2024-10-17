# Enlighto

**Enlighto** is a full-stack ed-tech platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides students with an engaging learning experience through course creation, consumption, and ratings. Instructors can easily manage their courses, while secure authentication and payment integration enhance the platform's usability. The project includes RESTful APIs, media management via Cloudinary, and future enhancements like mobile apps and gamification.

---

## Table of Contents

- [Project Overview](#project-overview)
- [System Architecture](#system-architecture)
- [Front-end](#front-end)
- [Back-end](#back-end)
- [API Design](#api-design)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Conclusion](#conclusion)

---

## Project Overview

Enlighto is a comprehensive ed-tech platform built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) that enables students and instructors to engage with educational content seamlessly. The platform provides:

- **Course creation, consumption, and rating**
- **Secure authentication** and **payment integration**
- **Cloud-based media management** using Cloudinary
- **RESTful APIs** for front-end and back-end communication

---

## System Architecture

Enlighto follows a **client-server architecture** with three main components: **Front-end**, **Back-end**, and **Database**.

**Architecture Diagram**

Here is a high-level diagram that illustrates the architecture of the **Enlighto** ed-tech platform:
![WhatsApp Image 2024-10-18 at 01 38 27_de6d572d](https://github.com/user-attachments/assets/199f3c29-818e-4699-a70a-9fa06298ce65)


### Front-end

The front-end is developed using **React.js**, allowing for dynamic, responsive, and interactive interfaces. It interacts with the back-end using RESTful APIs and displays course content, user dashboards, and more.

### Back-end

The back-end is built using **Node.js** and **Express.js** to handle server-side logic, APIs, and authentication. The platform also integrates **MongoDB** for scalable, flexible data storage.

### Database

Enlighto uses **MongoDB**, a NoSQL database, to store user data, course content, ratings, and other relevant information. It allows the platform to scale as the user base grows.

---

## Front-end

The front-end of Enlighto is developed using **React.js** for the user interface, styled using **CSS** and **Tailwind**. Key features include:

- **Course List**: Displays available courses with descriptions and ratings.
- **Wishlist**: Students can save their favorite courses.
- **Cart Checkout**: Allows students to complete course purchases.
- **Course Content**: Displays videos, PDFs, and other course materials.
- **Instructor Dashboard**: Instructors can manage their courses, track insights, and view feedback.

### Tools and Libraries Used:
- **React.js** for building UI components
- **Redux** for state management
- **Tailwind CSS** for responsive design

---

## Back-end

Enlighto's back-end is built using **Node.js**, **Express.js**, and **MongoDB**. Features include:

- **User authentication**: Secure sign-up, login, and password recovery.
- **Course management**: Instructors can create, read, update, and delete courses.
- **Payment integration**: Integration with **Razorpay** for processing course payments.
- **Cloud-based media management**: **Cloudinary** is used to manage images, videos, and other media content.

### Tools and Libraries Used:
- **Node.js** for server-side JavaScript runtime
- **Express.js** for building RESTful APIs
- **MongoDB** for flexible and scalable data storage
- **JWT** for secure user authentication
- **Bcrypt** for password hashing

---

## API Design

Enlighto uses a **RESTful API** design for communication between the front-end and back-end. The API is built using **Node.js** and **Express.js** and follows standard HTTP methods like **GET**, **POST**, **PUT**, and **DELETE**.

### Sample Endpoints:
- `/api/auth/signup (POST)` – Register a new user.
- `/api/auth/login (POST)` – Log in and get a JWT token.
- `/api/courses (GET)` – Get a list of all courses.
- `/api/courses/:id (POST)` – Create a new course.
- `/api/courses/:id/rate (POST)` – Add a rating to a course.

---

## Deployment

Enlighto is deployed using various cloud services:

- **Front-end**: Deployed using **Vercel**.
- **Back-end**: Deployed using **Render** or **Railway**.
- **Database**: Hosted on **MongoDB Atlas**.
- **Media**: Managed using **Cloudinary**.

This deployment setup ensures scalability, security, and high availability for global access.

---

## Future Enhancements

There are several features planned to enhance the platform:

- **Gamification**: Introduce badges, points, and leaderboards to increase user engagement.
- **Personalized learning paths**: Tailor content for each student based on their learning style.
- **Mobile app**: Develop a mobile app for easier access to course content.
- **Machine Learning recommendations**: Implement personalized course recommendations.
- **Virtual/Augmented Reality**: Enhance course material with VR/AR for an immersive experience.

---

## Conclusion

**Enlighto** is a powerful and scalable ed-tech platform built with the MERN stack. It provides a seamless learning experience for students and a comprehensive course management system for instructors. With plans for future enhancements, the platform is poised to offer even more features and value to its users.

---

## Technologies Used

- **MongoDB** – NoSQL database
- **Express.js** – Web framework for Node.js
- **React.js** – JavaScript library for building user interfaces
- **Node.js** – JavaScript runtime for building scalable applications
- **Cloudinary** – Cloud-based media management
- **Razorpay** – Payment gateway integration

---
