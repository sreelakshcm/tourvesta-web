# ✈️ Tourvesta Web

<p align="center">
  <b>Discover. Book. Explore the world.</b>
</p>

<p align="center">
  A modern and responsive tour discovery and booking platform built with React.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License" />
</p>

## 🌍 About the Project

**Tourvesta Web** is the frontend application for a complete tour-booking experience. Users can browse tours, explore detailed itineraries and maps, manage bookings, write reviews, and update their profiles.

The application also provides role-based views for travelers, guides, and administrators.

## ✨ Features

- 🔎 Search, browse, and filter available tours
- 🗺️ Explore tour locations with interactive maps
- 📸 View tour image galleries, highlights, and itineraries
- 🔐 Secure authentication and password recovery
- 👤 Profile and account settings management
- 🎟️ Create and manage tour reservations
- ⭐ Create and manage tour reviews
- 🧭 Role-based access for users, guides, and administrators
- 🌗 Light and dark theme support
- 📱 Fully responsive design for mobile and desktop
- 💾 Persistent authentication state with Redux Persist

## 🛠️ Built With

| Category | Technologies |
| --- | --- |
| Frontend | React, TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| State Management | Redux Toolkit, Redux Persist |
| Routing | React Router |
| Forms | React Hook Form, Yup |
| Maps | Leaflet, React Leaflet |
| Date Utilities | date-fns |

## 🚀 Getting Started

### 📋 Prerequisites

Before running the project, make sure you have:

- Node.js 18 or newer
- npm
- The [Tourvesta Services API](https://github.com/sreelakshcm/tourvesta-services) running locally or deployed

### 📦 Installation

```bash
git clone https://github.com/sreelakshcm/tourvesta-web.git
cd tourvesta-web
npm install
```

### ▶️ Start the Development Server

```bash
npm run dev
```

Open the URL shown in your terminal, usually:

```text
http://localhost:5173
```

> 💡 Make sure the backend API allows this URL through its CORS configuration.

## 📜 Available Commands

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Checks TypeScript and creates an optimized production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint to check code quality.

## 📁 Project Structure

```text
src/
├── app/          # Redux store, hooks, and API configuration
├── assets/       # SVG icons and illustrations
├── components/   # Shared UI, layout, and route-protection components
├── features/     # Auth, tours, bookings, users, reviews, and UI state
├── pages/        # Route-level pages
├── styles/       # Global and page-specific styles
├── types/        # TypeScript definitions
└── utils/        # Shared utility functions

public/
└── assets/       # Static tour images and data
```

## 🧳 Main User Journey

```text
Discover Tours → View Details → Sign In → Reserve a Tour → Manage Booking → Share a Review
```

## 🔗 Related Repository

The frontend works with the Tourvesta backend API:

👉 [Tourvesta Services](https://github.com/sreelakshcm/tourvesta-services)

## 🤝 Contributing

Contributions are welcome! 🌟

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a pull request.

```bash
git checkout -b feature/amazing-feature
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<p align="center">
  Made with ❤️ for travelers and explorers.
</p>
