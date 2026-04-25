# 📊 Full Stack Dashboard (Angular + Next.js + Vue + React Native)

A scalable, multi-platform dashboard application built using **Angular, Next.js, Vue.js, and React Native**,
powered by a **Node.js + PostgreSQL backend**.

This project demonstrates full-stack development, API design, JWT authentication, and cross-platform
UI implementation across four separate frontend frameworks from a single shared backend.

---

## 🚀 Live Applications

### 🌐 Web
- 🔷 **Angular Dashboard**
  https://dashboard-xip2.vercel.app/

- ⚡ **Next.js Dashboard**
  https://dashboard-brown-eta-81.vercel.app/

- 💚 **Vue.js Dashboard**
  https://dashboard-p78f.vercel.app/

---

### 📱 Mobile (React Native - Expo)
- **Expo Build**
  https://expo.dev/accounts/deepakbs4/projects/mobile/builds/3679c14d-6655-4495-a7f6-b28b7a5bab16

---

## ⭐ Key Highlights

- Built **four separate frontends** (Angular, Next.js, Vue.js, React Native) using a single shared backend API
- Implemented **JWT authentication** with middleware, Angular interceptors, and Vue route guards
- Designed **modular REST APIs** with pagination and structured routing
- Integrated **dynamic charts** (Area, Bar, Pie, Doughnut, Line) using AG Charts
- Developed **responsive UI dashboards** with SCSS across all platforms
- Deployed across **Vercel (Angular, Next.js, Vue frontends), Render (Node.js backend), Expo (mobile)**

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontends                               │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│   Angular    │   Next.js    │    Vue.js    │   React Native     │
│  (Vercel)    │  (Vercel)    │  (Vercel)    │     (Expo)         │
└──────┬───────┴──────┬───────┴──────┬───────┴────────┬───────────┘
       │              │              │                 │
       └──────────────┴──────────────┴─────────────────┘
                              │
                              ▼
                   Node.js + Express API
                       (Render)
                              │
                              ▼
                   PostgreSQL (Supabase)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend 1 | Angular + TypeScript + SCSS |
| Frontend 2 | Next.js + TypeScript + SCSS |
| Frontend 3 | Vue.js + TypeScript + SCSS |
| Frontend 4 | React Native + Expo |
| Backend | Node.js + Express.js |
| Database | PostgreSQL (Supabase) |
| Auth | JWT (JSON Web Tokens) |
| Charts | AG Charts |
| Deployment | Vercel + Render + Expo |

---

## 📁 Project Structure

```
dashboard/
├── angular-dashboard/      # Angular frontend
├── nextjs-dashboard/       # Next.js frontend
├── vue-dashboard/          # Vue.js frontend
├── mobile/                 # React Native (Expo) app
└── backend/                # Node.js + Express API
    ├── routes/
    ├── middleware/
    │   └── auth.js         # JWT middleware
    └── server.js
```

---

## 🔐 Authentication Flow

```
User Login
    ↓
POST /api/auth/login
    ↓
JWT Token Generated
    ↓
Stored in localStorage / SecureStore (mobile)
    ↓
Attached to all API requests:
  Angular  → HTTP Interceptor
  Next.js  → Axios / fetch headers
  Vue.js   → Axios interceptor
  Mobile   → AsyncStorage + headers
    ↓
Backend JWT Middleware validates token
    ↓
Protected routes accessible
```

---

## 📊 Features

- **Dashboard Overview** — KPI cards, summary metrics, real-time charts
- **Data Tables** — Paginated, sortable data with search
- **Dynamic Charts** — Area, Bar, Pie, Doughnut, Line charts via AG Charts
- **JWT Auth** — Login, protected routes, token refresh
- **Responsive Design** — Mobile-first SCSS layouts
- **Cross-Platform** — Same features across Angular, Next.js, Vue, and React Native

---

## 🚀 Running Locally

### Backend
```bash
cd backend
npm install
# Add .env with DATABASE_URL and JWT_SECRET
npm run dev
```

### Angular
```bash
cd angular-dashboard
npm install
ng serve
```

### Next.js
```bash
cd nextjs-dashboard
npm install
npm run dev
```

### Vue.js
```bash
cd vue-dashboard
npm install
npm run dev
```

### React Native
```bash
cd mobile
npm install
npx expo start
```

---

## 🌍 Environment Variables

```env
# Backend
DATABASE_URL=your-supabase-postgresql-url
JWT_SECRET=your-jwt-secret
PORT=5000

# Frontends
NEXT_PUBLIC_API_URL=https://your-backend.render.com
VITE_API_URL=https://your-backend.render.com
```

---

## 📄 License

MIT — feel free to fork, learn from, and build on top of this.

---

<div align="center">

Built with ❤️ using Node.js, Angular, Next.js, Vue.js, and React Native

**[Angular](https://dashboard-xip2.vercel.app/)** · **[Next.js](https://dashboard-brown-eta-81.vercel.app/)** · **[Vue.js](https://dashboard-p78f.vercel.app/)** · **[GitHub](https://github.com/devReact001/Dashboard)**

</div>
