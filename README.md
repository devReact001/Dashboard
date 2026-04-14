# 🚀 Full Stack Dashboard (Next.js + PostgreSQL + TypeScript)

A production-ready **full-stack analytics dashboard** built with:

* ⚡ **Next.js (App Router + Server Components)**
* 🧠 **Node.js + Express (TypeScript backend)**
* 🗄️ **PostgreSQL (Relational Database)**

This project demonstrates **scalable architecture, server-side rendering, and real-world data handling** using modern technologies.

---

## 🌐 Live Demo

🔗 https://dashboard-brown-eta-81.vercel.app

---

## 🧠 Tech Stack

### 🖥️ Frontend

* Next.js 16 (App Router)
* React 18
* Server Components
* Tailwind CSS + SCSS + Styled Components
* AG Charts (Data Visualization)
* React Table

### ⚙️ Backend

* Node.js
* Express.js (v5)
* TypeScript
* PostgreSQL (`pg`)

---

## 🏗️ Architecture

```id="arch001"
           ┌──────────────────────┐
           │     Next.js App      │
           │  (Server Components) │
           └─────────┬────────────┘
                     │ API Calls
                     ▼
           ┌──────────────────────┐
           │   Express Backend    │
           │   (TypeScript API)   │
           └─────────┬────────────┘
                     │ SQL Queries
                     ▼
           ┌──────────────────────┐
           │     PostgreSQL DB    │
           │  (Analytics Data)    │
           └──────────────────────┘
```

---

## 📁 Project Structure

```id="struct001"
.
├── client/                  # Next.js frontend
│   ├── app/                 # App router (Server Components)
│   ├── components/          # UI components
│   ├── styles/              # SCSS / Tailwind
│   └── utils/               # API helpers
│
├── server/                  # Express backend (TypeScript)
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Business logic
│   │   ├── db/              # PostgreSQL connection
│   │   └── index.ts         # Entry point
│
└── README.md
```

---

## ✨ Key Features

* 📊 Interactive charts using **AG Charts**
* 📋 Advanced tables using **React Table**
* ⚡ Server-side rendering (Next.js Server Components)
* 🔗 RESTful API with Express
* 🗄️ PostgreSQL integration for structured data
* 🎯 Clean, modular, scalable architecture
* 💡 Type-safe backend using TypeScript

---

## 🔌 API Endpoints

> Base URL: `http://localhost:5000/api`

### 📊 Dashboard Data

```http id="api001"
GET /api/dashboard
```

Returns aggregated dashboard metrics (charts + tables data)

---

### 📈 Analytics Data

```http id="api002"
GET /api/analytics
```

Returns time-series or statistical data for charts

---

### 📋 Table Data

```http id="api003"
GET /api/table
```

Returns paginated/tabular dataset

---

### ➕ Example Response

```json id="api004"
{
  "success": true,
  "data": {
    "users": 1200,
    "revenue": 5400,
    "growth": 12.5
  }
}
```

---

## 🗄️ PostgreSQL Schema

### 📌 Example Tables

#### Users Table

```sql id="sql001"
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

#### Analytics Table

```sql id="sql002"
CREATE TABLE analytics (
  id SERIAL PRIMARY KEY,
  metric VARCHAR(50),
  value NUMERIC,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

#### Transactions Table

```sql id="sql003"
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  amount NUMERIC,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ⚙️ Environment Variables

### Server `.env`

```env id="env001"
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/dashboard_db
```

### Client `.env`

```env id="env002"
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🛠️ Installation

```bash id="install001"
git clone https://github.com/your-username/dashboard.git
cd dashboard
```

---

## ▶️ Running Locally

### Start Backend

```bash id="run001"
cd server
npm install
npm run dev
```

---

### Start Frontend

```bash id="run002"
cd client
npm install
npm run dev
```

---

## 📦 Build

```bash id="build001"
cd server && npm run build
cd client && npm run build
```

---

## 🌐 Deployment

| Layer    | Platform                     |
| -------- | ---------------------------- |
| Frontend | Vercel                       |
| Backend  | Render                       |
| Database | PostgreSQL (Neon / Supabase) |

---

## 📈 What This Project Demonstrates

✅ Full-stack architecture design
✅ Server-side rendering (performance + SEO)
✅ REST API development with TypeScript
✅ Database design with PostgreSQL
✅ Real-world dashboard UI patterns
✅ Clean and scalable folder structure

---

## 🚀 Future Enhancements

* 🔐 Authentication (JWT / OAuth)
* 📡 Real-time data (WebSockets)
* 📊 Advanced filtering & pagination
* 🧪 Unit & integration testing
* 📉 Caching (Redis)

---

## 👨‍💻 Author

**Deepak**

---

## ⭐ Why This Project Stands Out

This is not just a UI project — it demonstrates:

* Real backend + database integration
* Server-side rendering using modern React patterns
* Production-level structure used in real companies

👉 Perfect for **Full Stack Developer roles**

---
