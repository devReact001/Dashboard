# 📊 Dashboard Project (Full Stack + Multi-Platform)

A modern, full-stack dashboard application built with multiple frontends and a Node.js backend, supporting web and mobile platforms.

---

## 🚀 Live Applications

### 🌐 Web Apps

- 🔷 Angular Dashboard  
  https://dashboard-xip2.vercel.app/

- ⚡ Next.js Dashboard  
  https://dashboard-brown-eta-81.vercel.app/

---

### 📱 Mobile App (React Native)

- Expo Build  
  https://expo.dev/accounts/deepakbs4/projects/mobile/builds/3679c14d-6655-4495-a7f6-b28b7a5bab16

---

## 🧱 Tech Stack

### Frontend
- Angular (Standalone + HttpClient + Interceptors)
- Next.js (React)
- React Native (Expo)

### Backend
- Node.js + Express
- PostgreSQL (Supabase)

### Charts & UI
- AG Charts
- SCSS Styling
- Responsive Dashboard Layout

### Authentication
- JWT-based authentication
- Angular interceptor for token handling

---

## ✨ Features

- 📊 Dynamic charts (Area, Bar, Pie, Doughnut, Line)
- 📋 Paginated data tables
- 🔔 Notifications system
- 👤 User dashboard stats
- 📱 Cross-platform (Web + Mobile)
- 🔐 JWT Authentication
- 🌐 API-driven architecture

---

## 📁 Project Structure

```

Dashboard/
│
├── server/              # Node.js backend (Express + PostgreSQL)
├── dashboard-angular/   # Angular frontend
├── client/      # Next.js frontend
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

Create `.env`:

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

1. User logs in → backend returns JWT
2. Token stored in localStorage (Angular) / secure storage (mobile)
3. Interceptor attaches token to requests
4. Backend verifies token via middleware

---

## 📊 API Endpoints

| Endpoint                      | Description       |
| ----------------------------- | ----------------- |
| `/api/auth/login`             | Login & get JWT   |
| `/api/sidebar`                | Sidebar data      |
| `/api/dashboard/stats`        | Dashboard metrics |
| `/api/charts/area`            | Area chart        |
| `/api/charts/bar`             | Bar chart         |
| `/api/charts/simple/pie`      | Pie chart         |
| `/api/charts/simple/doughnut` | Doughnut chart    |
| `/api/sensor/:location`       | Line chart data   |
| `/api/candidates`             | Paginated table   |

---

## 🧠 Key Learnings

* Multi-framework frontend architecture
* JWT authentication with middleware
* Angular interceptors (modern standalone setup)
* REST API design with pagination
* Cross-platform development (Web + Mobile)

---

## 🚀 Future Improvements

* Role-based access control (RBAC)
* Refresh token system
* Dark mode UI
* Real-time data (WebSockets)
* CI/CD pipeline

---

## 👨‍💻 Author

Deepak

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share it!

```


