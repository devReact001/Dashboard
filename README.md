```md
# 📊 Full Stack Dashboard (Angular + Next.js + React Native)

A scalable, multi-platform dashboard application built using Angular, Next.js, and React Native,
 powered by a Node.js + PostgreSQL backend.

This project demonstrates full-stack development, API design, authentication, and cross-platform
 UI implementation.

---

## 🚀 Live Applications

### 🌐 Web

- 🔷 Angular Dashboard  
  https://dashboard-xip2.vercel.app/

- ⚡ Next.js Dashboard  
  https://dashboard-brown-eta-81.vercel.app/

---

### 📱 Mobile (React Native - Expo)

- Expo Build  
  https://expo.dev/accounts/deepakbs4/projects/mobile/builds/3679c14d-6655-4495-a7f6-b28b7a5bab16

---

## ⭐ Key Highlights

- Built **three separate frontends** (Angular, Next.js, React Native) using a shared backend API
- Implemented **JWT authentication** with middleware and Angular interceptor
- Designed **modular REST APIs** with pagination and structured routing
- Integrated **dynamic charts** (Area, Bar, Pie, Doughnut, Line)
- Developed **responsive UI dashboards** with SCSS
- Deployed across **Vercel (frontend), Render (backend), Expo (mobile)**

---

## 🏗️ Architecture

```

Frontend (Angular / Next.js / React Native)
↓
HTTP Requests (JWT via Interceptor)
↓
Node.js + Express API
↓
PostgreSQL (Supabase)

```

---

## 🧱 Tech Stack

### Frontend
- Angular (Standalone API, HttpClient, Interceptors)
- Next.js (React)
- React Native (Expo)

### Backend
- Node.js + Express
- PostgreSQL (Supabase)

### Features & Libraries
- JWT Authentication
- AG Charts
- SCSS Styling
- REST API with pagination

---

## ✨ Features

- 📊 Interactive charts (Area, Bar, Pie, Doughnut, Line)
- 📋 Paginated data tables
- 🔔 Notifications system
- 👤 Dashboard metrics (users, applications, etc.)
- 📱 Cross-platform UI (Web + Mobile)
- 🔐 Secure API with JWT authentication

---

## 🧠 Challenges & Solutions

- Implemented **JWT authentication across multiple platforms**
- Solved **token validation and interceptor issues in Angular**
- Handled **TypeScript strict typing for API responses**
- Fixed **CORS and deployment inconsistencies (local vs production)**
- Structured reusable API responses for multiple frontends

---

## 📁 Project Structure

```

Dashboard/
│
├── server/              # Backend (Node.js + Express + PostgreSQL)
├── dashboard-angular/   # Angular frontend
├── dashboard-next/      # Next.js frontend
├── mobile/              # React Native app (Expo)
│
└── README.md

````

---

## ⚙️ Backend Setup

```bash
cd server
npm install
npm run dev
````

Create `.env` file:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

---

## 💻 Angular Setup

```bash
cd dashboard-angular
npm install
ng serve
```

---

## ⚡ Next.js Setup

```bash
cd dashboard-next
npm install
npm run dev
```

---

## 📱 React Native Setup

```bash
cd mobile
npm install
npx expo start
```

---

## 🔐 Authentication Flow

1. User logs in → backend generates JWT
2. Token stored in client (localStorage / secure storage)
3. Angular interceptor attaches token to every request
4. Backend middleware verifies token before accessing protected routes

---

## 📊 API Endpoints

| Endpoint                      | Description          |
| ----------------------------- | -------------------- |
| `/api/auth/login`             | Login & get JWT      |
| `/api/sidebar`                | Sidebar data         |
| `/api/dashboard/stats`        | Dashboard metrics    |
| `/api/charts/area`            | Area chart           |
| `/api/charts/bar`             | Bar chart            |
| `/api/charts/simple/pie`      | Pie chart            |
| `/api/charts/simple/doughnut` | Doughnut chart       |
| `/api/sensor/:location`       | Line chart data      |
| `/api/candidates`             | Paginated table data |

---

## 🚀 Future Improvements

* Role-based access control (RBAC)
* Refresh token system
* Dark mode UI
* Real-time updates (WebSockets)
* CI/CD pipeline

---

## 👨‍💻 Author

Deepak

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!

```


Just tell me 👍
```
