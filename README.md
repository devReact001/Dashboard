<div align="center">

# 📊 Full-Stack Dashboard Platform

### Angular · Next.js · Vue.js · React Native — powered by a single shared Node.js + PostgreSQL API

[![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=flat-square&logo=angular)](https://dashboard-xip2.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs)](https://dashboard-brown-eta-81.vercel.app/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3-42b883?style=flat-square&logo=vuedotjs)](https://dashboard-p78f.vercel.app/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs)](https://render.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=flat-square&logo=postgresql)](https://supabase.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)

[**Angular Live**](https://dashboard-xip2.vercel.app/) · [**Next.js Live**](https://dashboard-brown-eta-81.vercel.app/) · [**Vue.js Live**](https://dashboard-p78f.vercel.app/) · [**Expo Mobile**](https://expo.dev/accounts/deepakbs4/projects/mobile/builds/3679c14d-6655-4495-a7f6-b28b7a5bab16) · [**GitHub Repo**](https://github.com/devReact001/Dashboard)

</div>

---

## 🔑 Demo Login

Use these credentials to log in on any of the live deployments:

| Field | Value |
|-------|-------|
| **Email** | `admin@example.com` |
| **Password** | `admin123` |

> Works on Angular, Next.js, Vue.js, and React Native (Expo) — all share the same backend auth.

---

## Overview

A production-deployed, multi-platform dashboard built across **four frontend frameworks** — Angular, Next.js, Vue.js, and React Native — all consuming a **single shared REST API** backed by Node.js, Express, and PostgreSQL.

The project demonstrates end-to-end full-stack engineering: modular API design, JWT authentication, dynamic data visualization, paginated data tables, and responsive UI across web and mobile — all deployed to cloud infrastructure.

---

## 📸 Screenshots

### 🔷 Angular Dashboard
![Angular Dashboard](./screenshots/angular-dashboard.png)

### ⚡ Next.js Dashboard
![Next.js Dashboard](./screenshots/nextjs-dashboard.png)

### 💚 Vue.js Dashboard
![Vue Dashboard](./screenshots/vue-dashboard.png)

> 📁 **Add your screenshots:** Save the dashboard screenshots to a `screenshots/` folder in the repo root and name them `angular-dashboard.png`, `nextjs-dashboard.png`, and `vue-dashboard.png`.

---

## 🚀 Live Deployments

| Platform | Framework | URL |
|----------|-----------|-----|
| 🔷 Web | Angular | [dashboard-xip2.vercel.app](https://dashboard-xip2.vercel.app/) |
| ⚡ Web | Next.js | [dashboard-brown-eta-81.vercel.app](https://dashboard-brown-eta-81.vercel.app/) |
| 💚 Web | Vue.js | [dashboard-p78f.vercel.app](https://dashboard-p78f.vercel.app/) |
| 📱 Mobile | React Native (Expo) | [Expo Build](https://expo.dev/accounts/deepakbs4/projects/mobile/builds/3679c14d-6655-4495-a7f6-b28b7a5bab16) |
| 🖥️ Backend | Node.js + Express | Hosted on Render |
| 🗄️ Database | PostgreSQL | Hosted on Supabase |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                          Frontends                               │
├─────────────┬─────────────┬─────────────┬────────────────────────┤
│   Angular   │   Next.js   │   Vue.js    │    React Native        │
│  (Vercel)   │  (Vercel)   │  (Vercel)   │      (Expo)            │
└──────┬──────┴──────┬──────┴──────┬──────┴──────────┬─────────────┘
       │             │             │                  │
       └─────────────┴─────────────┴──────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Node.js + Express    │
                    │     REST API          │
                    │     (Render)          │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  PostgreSQL Database  │
                    │     (Supabase)        │
                    └───────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend 1 | Angular 17 · TypeScript · SCSS |
| Frontend 2 | Next.js 15 · App Router · TypeScript · SCSS |
| Frontend 3 | Vue.js 3 · Composition API · TypeScript · SCSS |
| Frontend 4 | React Native · Expo |
| Backend | Node.js · Express.js |
| Database | PostgreSQL (hosted on Supabase) |
| Auth | JWT (JSON Web Tokens) |
| Charts | Chart.js · AG Charts |
| Deployment | Vercel · Render · Expo |

---

## ✨ Key Features

- **Multi-Framework UI** — Identical dashboard implemented in Angular, Next.js, Vue.js, and React Native from a single API
- **JWT Authentication** — Login, protected routes, Angular HTTP interceptors, Vue route guards, Expo SecureStore on mobile
- **Dynamic Charts** — Area, Bar, Line, Pie, and Doughnut charts with real data via Chart.js / AG Charts
- **Paginated Data Table** — Server-side pagination with configurable page sizes and navigation
- **Responsive Layout** — 12-column CSS Grid with mobile breakpoints across all web frontends
- **Real-time Clock** — Live date/time in sidebar with locale-aware formatting
- **Notification Panel** — Scrollable live notifications in sidebar
- **Modular REST API** — Structured Express routes for stats, candidates, charts, sidebar, and auth

---

## 🔐 Authentication Flow

```
User submits login credentials
          │
          ▼
   POST /api/auth/login
          │
          ▼
   JWT token generated & returned
          │
          ▼
   Token stored:
     Angular  → localStorage
     Next.js  → cookie (httpOnly)
     Vue.js   → localStorage
     Mobile   → Expo SecureStore
          │
          ▼
   Token attached to all requests:
     Angular  → HTTP Interceptor
     Next.js  → Server component fetch headers
     Vue.js   → Axios request interceptor
     Mobile   → Axios default headers
          │
          ▼
   Express JWT middleware validates
          │
          ▼
   Protected API routes accessible
```

---

## 📁 Project Structure

```
Dashboard-main/
├── client/                      # Next.js frontend (App Router)
│   ├── app/
│   │   ├── components/          # Info cards, charts, table, sidebar
│   │   ├── layout/              # Root layout + grid
│   │   └── page.tsx             # Dashboard entry point
│   └── lib/
│       └── api.server.ts        # Authenticated server-side fetch
│
├── dashboard-angular/           # Angular standalone component app
│   └── src/app/components/
│       ├── cards/               # Stat cards
│       ├── charts/              # Area, Bar, Line, Pie, Doughnut
│       ├── table/               # Paginated candidate table
│       └── sidebar/             # User info, clock, notifications
│
├── dashboard-vue/               # Vue 3 Composition API app
│   └── src/
│       ├── components/          # StatsCards, charts, Table, Sidebar
│       └── pages/               # Dashboard, Login
│
├── mobile/                      # React Native (Expo) app
│
└── server/                      # Node.js + Express backend
    ├── routes/
    │   ├── auth.js
    │   ├── dashboard.js
    │   ├── candidates.js
    │   ├── charts.js
    │   └── sidebar.js
    ├── middleware/
    │   └── auth.js              # JWT verification middleware
    └── server.js
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Supabase project)

### 1. Backend
```bash
cd server
npm install

# Create .env file
echo "DATABASE_URL=your-postgresql-connection-string" >> .env
echo "JWT_SECRET=your-jwt-secret" >> .env
echo "PORT=5000" >> .env

npm run dev
# API running at http://localhost:5000
```

### 2. Next.js
```bash
cd client
npm install
echo "NEXT_PUBLIC_BASE_URL=http://localhost:3000" >> .env.local
npm run dev
# App at http://localhost:3000
```

### 3. Angular
```bash
cd dashboard-angular
npm install
ng serve
# App at http://localhost:4200
```

### 4. Vue.js
```bash
cd dashboard-vue
npm install
npm run dev
# App at http://localhost:5173
```

### 5. React Native
```bash
cd mobile
npm install
npx expo start
```

> 💡 **Demo credentials for local testing:** `admin@example.com` / `admin123`

---

## 🌍 Environment Variables

### Backend (`server/.env`)
```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-super-secret-key
PORT=5000
```

### Next.js (`client/.env.local`)
```env
NEXT_PUBLIC_BASE_URL=https://your-nextjs-app.vercel.app
VITE_API_URL=https://your-backend.render.com
```

### Vue.js / Angular (`dashboard-vue/.env`)
```env
VITE_API_URL=https://your-backend.render.com
```

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Authenticate user, return JWT |
| `GET` | `/api/dashboard/stats` | Active users, total users, applications |
| `GET` | `/api/candidates` | Paginated candidate list (`?page=1&limit=3`) |
| `GET` | `/api/candidates/headers` | Table column definitions |
| `GET` | `/api/charts/area` | Area chart data (monthly subscriptions) |
| `GET` | `/api/charts/bar` | Bar chart data (quarterly revenue) |
| `GET` | `/api/charts/line` | Line chart data (sensor readings) |
| `GET` | `/api/charts/pie` | Pie chart data (asset distribution) |
| `GET` | `/api/charts/doughnut` | Doughnut chart data (portfolio) |
| `GET` | `/api/sidebar` | Logged-in user info |
| `GET` | `/api/sidebar/notifications` | User notifications |

---

## 🎯 Engineering Highlights

- **Single backend, four frontends** — demonstrates framework-agnostic API design and the ability to translate the same product across Angular, React (Next.js), Vue, and React Native
- **Scoped CSS architecture** — each framework's component styling is self-contained (Angular SCSS, Vue scoped styles, Next.js CSS modules), matching the same design system across all platforms
- **Server-side rendering** — Next.js implementation uses App Router with server components for authenticated data fetching, avoiding client-side token exposure
- **Vercel auto-deployment** — `VERCEL_URL` environment variable used to dynamically resolve the base URL for internal server-to-server API calls during SSR
- **Angular standalone components** — No NgModule — all components declared with `standalone: true`, modern Angular architecture
- **Vue 3 Composition API** — All components use `<script setup>` with TypeScript, reactive `ref()` state, and lifecycle hooks

---

## 📄 License

MIT — free to fork, adapt, and learn from.

---

<div align="center">

Built with ❤️ using Node.js · Angular · Next.js · Vue.js · React Native

**[🔷 Angular](https://dashboard-xip2.vercel.app/)** · **[⚡ Next.js](https://dashboard-brown-eta-81.vercel.app/)** · **[💚 Vue.js](https://dashboard-p78f.vercel.app/)** · **[📱 Expo](https://expo.dev/accounts/deepakbs4/projects/mobile/builds/3679c14d-6655-4495-a7f6-b28b7a5bab16)** · **[💻 GitHub](https://github.com/devReact001/Dashboard)**

</div>