# Enlighto

**Enlighto** is a full-stack ed-tech platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides students with an engaging learning experience through course creation, consumption, and ratings. Instructors can easily manage their courses, while secure authentication and payment integration enhance the platform's usability. The project includes RESTful APIs, media management via Cloudinary, and future enhancements like mobile apps and gamification.

![image](https://github.com/user-attachments/assets/8553378b-dae1-45f8-8082-1a7b73fc182c)

## [![See More Screenshots](https://img.shields.io/badge/See%20More-Screenshots-blue?style=for-the-badge)](#screenshots)

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

---

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
- `/api/v1/auth/signup (POST)` – Register a new user.
- `/api/v1/auth/login (POST)` – Log in and get a JWT token.
- `/api/v1/courses (GET)` – Get a list of all courses.
- `/api/v1/courses/:id (POST)` – Create a new course.
- `/api/v1/courses/:id/rate (POST)` – Add a rating to a course.

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

## Screenshots
![image](https://github.com/user-attachments/assets/d6abada7-8f3f-433c-a0ce-6ab62e14c52d)
![image](https://github.com/user-attachments/assets/ab066474-a470-4393-93f2-57d9cbf05072)
![image](https://github.com/user-attachments/assets/35c97019-999c-418c-997c-cf5b6f4972d3)
![Screenshot 2024-10-22 210107](https://github.com/user-attachments/assets/1c646241-07f0-47dd-88bf-582c9e28ff38)
![Screenshot 2024-10-22 210636](https://github.com/user-attachments/assets/caaf5ce8-d3ce-45df-bb8f-2a46e166f9b2)
![Screenshot 2024-10-22 210721](https://github.com/user-attachments/assets/ec68135d-8cca-4ad8-9d0f-8bfb0e9044ae)
![Screenshot 2024-10-22 210817](https://github.com/user-attachments/assets/3fb19493-ce86-4f63-af1b-ac0c57ccd0be)
![Screenshot 2024-10-22 210737](https://github.com/user-attachments/assets/da22f5e2-3de9-4a8b-9a82-11624239fa23)
![Screenshot 2024-10-22 210905](https://github.com/user-attachments/assets/592d0e31-59a2-405c-8f36-1b107624ae0b)
![Screenshot 2024-10-23 004217](https://github.com/user-attachments/assets/aed4c20f-22f5-4c2f-9bcc-d7a2d4e8827b)
![Screenshot (2374)](https://github.com/user-attachments/assets/91caa06f-523e-4975-b7a9-5dadfe0ebd15)
![Screenshot 2024-10-22 212125](https://github.com/user-attachments/assets/af27d4a8-3e46-4a1b-8580-530d6ddf051b)
![Screenshot 2024-10-22 210202](https://github.com/user-attachments/assets/5ef0e272-9949-4d4b-9077-d33da23fe662)
![Screenshot 2024-10-22 210257](https://github.com/user-attachments/assets/413e4a59-9f3e-4009-b2bc-525005aec43e)
![Screenshot 2024-10-22 210343](https://github.com/user-attachments/assets/9663653f-e0dc-4faa-95d2-f3eea1266401)
![Screenshot 2024-10-23 003419](https://github.com/user-attachments/assets/c1ac4af6-1516-4b3c-818b-3c41e227bc30)
![Screenshot 2024-10-23 003624](https://github.com/user-attachments/assets/c0aa0f51-20fc-4b9b-8e77-e6a8fdc04b4b)
![Screenshot 2024-10-22 210357](https://github.com/user-attachments/assets/bd52da85-6987-43b5-8329-cd4f1e214314)
![Screenshot 2024-10-23 004927](https://github.com/user-attachments/assets/4d23888a-6c2b-468e-9830-3a8053f40138)
![Screenshot 2024-10-22 210950](https://github.com/user-attachments/assets/ad39e4a2-93e6-485d-94a2-fd4d70e8c53c)
![Screenshot 2024-10-22 211002](https://github.com/user-attachments/assets/d34e857a-3b86-4ff8-93a0-962f63f3723d)
![Screenshot 2024-10-22 211105](https://github.com/user-attachments/assets/00391879-a490-4058-a8d3-ec1ebc1d9556)
![image](https://github.com/user-attachments/assets/9c673fe0-026c-4e09-b71c-c73ecc61794f)
![image](https://github.com/user-attachments/assets/5b806abb-4152-416e-99ef-5c220d248daa)
![image](https://github.com/user-attachments/assets/7a72cd27-b512-436e-915d-ef785e56cf2d)

---
