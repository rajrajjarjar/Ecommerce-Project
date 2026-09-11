# 🛒 SimpleShop

video-demo:- https://youtube.com/shorts/aBBbIrQyBHI?si=nOFRDlHwRzcO8Wv3

> A full-stack e-commerce web application built with React, Node.js, Express and MongoDB.

SimpleShop is a full-stack shopping application designed to provide a complete e-commerce experience while demonstrating the integration of a modern React frontend with a RESTful Node.js/Express backend and MongoDB database.

The application includes product browsing, user registration and login, JWT-based authentication, protected cart operations, quantity selection, persistent data storage and a deployed production environment.

## 🚀 Live Demo

**Frontend:**  
https://simpleshop-delta.vercel.app

**Backend API:**  
https://simpleshop-backend-89ao.onrender.com

**Source Code:**  
https://github.com/rajrajjarjar/Ecommerce-Project

---

## ✨ Features

- 🛍️ Dynamic product listing from MongoDB
- 🔐 User registration and login
- 🔑 JWT-based authentication
- 🔒 Protected cart operations
- 🔐 Password hashing using bcrypt
- 🛒 Add products to user-specific carts
- 🔢 Product quantity selection
- ⭐ Product ratings and review counts
- 🧭 Client-side routing with React Router
- 🔌 REST API communication using Axios
- 🗄️ Persistent data storage using MongoDB
- ⚙️ Environment-based configuration
- 🌐 Production deployment with Vercel and Render
- 🔗 CORS configuration for frontend/backend communication

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React
- JavaScript

### Backend

- Node.js
- Express.js
- REST APIs
- JWT
- bcrypt
- Mongoose
- CORS
- dotenv

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 🏗️ Architecture

SimpleShop follows a client-server architecture where the React frontend communicates with the Express backend through REST APIs.

```text
                 ┌─────────────────────┐
                 │     React Frontend  │
                 │     Vite + React    │
                 └──────────┬──────────┘
                            │
                          Axios
                            │
                            ▼
                 ┌─────────────────────┐
                 │    Express Server   │
                 │     REST APIs       │
                 └──────────┬──────────┘
                            │
                       Mongoose
                            │
                            ▼
                 ┌─────────────────────┐
                 │    MongoDB Atlas    │
                 │    Persistent Data  │
                 └─────────────────────┘