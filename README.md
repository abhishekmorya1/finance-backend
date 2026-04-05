# 💰 Finance Tracker API

A powerful backend system to manage financial records with **role-based access control** and **advanced analytics dashboard**.

---

---

## 📄 Swagger API Docs

Access API documentation here:

```bash
http://localhost:5000/api-docs
```

---

## 🔐 Demo Credentials (For Testing)

Use the following accounts to explore different roles:

### 👑 Admin

* **Email:** [abhishek@gmail.com](mailto:abhishek@gmail.com)
* **Password:** 123456

### 📊 Analyst

* **Email:** [karan@gmail.com](mailto:karan@gmail.com)
* **Password:** 12345

### 👀 Viewer

* **Email:** [krrish@gmail.com](mailto:krrish@gmail.com)
* **Password:** 12345

---

## 🚀 Features

### 🔐 Authentication

* JWT-based login & registration
* Secure password handling

### 👥 Role-Based Access Control

* **Admin**

  * Full access (Create, Update, Delete records)
  * Manage all data
* **Analyst**

  * View records
  * Access analytics & dashboard
* **Viewer**

  * Read-only access

---

### 📊 Records Management

* Create financial records (income/expense)
* View all records
* Update records
* Soft delete records (Admin only)

---

### 🔍 Filtering System

* Filter records based on:

  * Type (income/expense)
  * Category
  * Date range

---

### 📈 Dashboard Analytics

* Total Income, Expense, Balance
* Category-wise breakdown
* Monthly trends
* Weekly trends
* Recent transactions

---

### 📄 API Documentation

* Swagger UI integrated
* Easy API testing interface

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT
* **Documentation:** Swagger

---

## 📂 Project Structure

```bash
project/
│── controllers/
│── models/
│── routes/
│── middleware/
│── config/
│── swagger.js
│── server.js
│── .env
```

---

## 📡 API Endpoints

### 🔑 Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### 📊 Records

* POST `/api/records`
* GET `/api/records`
* GET `/api/records/filter`
* GET `/api/records/:id`
* PATCH `/api/records/:id`
* DELETE `/api/records/:id`

### 📈 Dashboard

* GET `/api/dashboard/summary`
* GET `/api/dashboard/categories`
* GET `/api/dashboard/trends/monthly`
* GET `/api/dashboard/trends/weekly`
* GET `/api/dashboard/recent`



## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/finance-tracker-api.git
cd finance-tracker-api
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Create `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Run Server

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

## 🔑 Authorization

Use JWT token in headers:

```
Authorization: Bearer your_token_here
```

---

## 🧠 Key Concepts Used

* REST API Design
* MVC Architecture
* Middleware (Authentication & Role-based Authorization)
* MongoDB Aggregation Pipelines
* Soft Delete Strategy
* Swagger API Documentation

---

## 🚀 Future Enhancements

* Pagination for large datasets
* Export reports (PDF/Excel)
* Graph-based analytics
* Frontend dashboard (React)

---

## 👨‍💻 Author

**Abhishek Morya**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
