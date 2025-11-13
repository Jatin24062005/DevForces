# ⚡ DevForces — A Developer Contest Platform

Welcome to **DevForces**, a full-stack web platform where **web developers compete in real-time development contests**, showcase their skills, and climb the leaderboard.  
This project is built using **Turborepo** for scalable monorepo management.

---
![Uploading image.png…]()


## 🚀 Overview

DevForces enables developers to:
- 🧩 Participate in timed **coding & development contests**
- 🧠 Solve real-world **frontend/backend challenges**
- 🏆 Compete with peers and earn ranks & rewards
- 🧰 Build projects in a **sandboxed environment**
- 💬 Engage in community-driven discussions

This repository follows a **Turborepo monorepo** structure for efficient builds and shared packages.

---

## 🏗️ Tech Stack

| Layer | Technology |
|:------|:------------|
| Frontend | **Next.js**, **React**, **TypeScript** |
| Backend | **Node.js**, **Express**, **MongoDB** (via **Mongoose**) |
| Monorepo | **Turborepo** |
| UI Library | **TailwindCSS**, **Shadcn/UI** |
| Auth | **JWT / NextAuth** |
| Code Collaboration | **Socket.io / Pusher** |
| Deployment | **Docker**, **Vercel / Render** |

---

## 📂 Project Structure

```
devforces/
│
├── apps/
│   ├── web/              # Next.js web app (user-facing platform)
│   └── api/              # Express backend API service
│
├── packages/
│   ├── ui/               # Shared UI components
│   ├── eslint-config/    # Centralized ESLint setup
│   ├── typescript-config/# Shared TS configs
│   └── utils/            # Common helper functions (auth, db, etc.)
│
├── turbo.json            # Turborepo configuration
├── package.json
└── README.md
```

---

## 🧩 Apps and Packages

- `web`: Main Next.js app (contest UI, leaderboard, profile, etc.)
- `api`: Backend service built using Express and Mongoose
- `@repo/ui`: Shared UI component library (buttons, modals, etc.)
- `@repo/eslint-config`: Centralized linting setup
- `@repo/typescript-config`: Base TypeScript configuration

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Jatin04072005/devforces.git
cd devforces
```

### 2️⃣ Install dependencies

Use your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3️⃣ Setup environment variables

Create `.env` files for both `apps/web` and `apps/api`:

#### `apps/api/.env`
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
PORT=5000
```

#### `apps/web/.env`
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_SECRET=your_secret
```

---

## 🧠 Development

Run all apps together:

```bash
npx turbo dev
```

Run a specific app:

```bash
npx turbo dev --filter=web
npx turbo dev --filter=api
```

---

## 🏗️ Build

Build all apps and packages:

```bash
npx turbo build
```

Or build specific packages:

```bash
npx turbo build --filter=web
```

---

## ☁️ Remote Caching (Optional)

You can connect Turborepo with [Vercel Remote Cache](https://vercel.com/docs/remote-caching) for faster CI/CD builds:

```bash
npx turbo login
npx turbo link
```

---

## 🧪 Testing

To run all tests:

```bash
npx turbo run test
```

To test only the backend:

```bash
npx turbo run test --filter=api
```

---

## 🧑‍💻 Contribution Guide

We ❤️ contributions!  
Follow these steps to contribute:

1. Fork the repository  
2. Create your feature branch  
   ```bash
   git checkout -b feature/awesome-feature
   ```
3. Commit changes  
   ```bash
   git commit -m "feat: add awesome feature"
   ```
4. Push and open a PR 🚀

---

## 🧭 Roadmap

- [ ] Contest creation & scheduling
- [ ] Real-time leaderboard
- [ ] Collaborative code editor
- [ ] Discussion board for developers
- [ ] Admin dashboard for managing contests
- [ ] Dockerized deployment setup

---

## 📸 Preview (Coming Soon)
_Include screenshots, architecture diagram, or demo GIF here_

---

## 🧑‍🏫 Author

**👤 Jatin Jatin**  
🌐 [GitHub @Jatin04072005](https://github.com/Jatin04072005)  
💬 Open for collaboration and ideas — feel free to reach out!

---

## 📜 License

This project is licensed under the **MIT License**.
