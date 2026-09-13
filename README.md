<div align="center">

# 🎯 WatchFlow

### Modern YouTube Playlist & Course Tracking Application

WatchFlow transforms YouTube playlists and video courses into a structured, distraction-free learning experience. Organize long video series, track completion progress, record timestamp-based notes, maintain learning streaks, and resume exactly where you left off.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-Express-000000?style=for-the-badge&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB Atlas" />
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge" alt="JWT Auth" />
</p>

</div>

---

## ✨ Core Features

### 📚 Playlist & Course Management
- **Import YouTube Playlists**: Paste any public YouTube playlist URL or ID to resolve metadata, duration, thumbnails, and full video lists.
- **Playlist Library**: View all imported courses, total video counts, completed stats, and quick actions.
- **Playlist Re-sync**: Fetch new videos added to original YouTube playlists while preserving saved progress and notes.

### 🎥 Distraction-free Learning Workspace
- **Embedded YouTube Player**: Clean learning player with auto-saving video watch progress.
- **Timestamp Notes**: Capture notes associated with specific video timestamps (e.g. `03:45`) and click any note to seek player playback to that exact moment.
- **Resume Watching**: Click "Continue Learning" to resume your active course at the exact video and timestamp where you left off.

### 📊 Learning Analytics & Streaks
- **Dashboard Overview**: Monitor total playlists, total videos, completed videos, and streak metrics.
- **GitHub-style Heatmap**: Visual contribution calendar recording daily learning activity and study duration.

### 🎨 Theme Support & User Experience
- **Dark / Light Mode**: Seamless theme toggle with persistent user preference.
- **Responsive Layout**: Designed for desktop and mobile learning environments.

---
# 🖼️ Application Preview

## 🚀 Getting Started

| Landing | Import Playlist |
|---------|-----------------|
| ![](assets/screenshots/landing.png) | ![](assets/screenshots/import-playlist.png) |

---

## 🔐 Authentication

| Register | Login |
|----------|-------|
| ![](assets/screenshots/register.png) | ![](assets/screenshots/login.png) |

---

## 📊 Dashboard

| Dashboard | Library |
|-----------|---------|
| ![](assets/screenshots/dashboard.png) | ![](assets/screenshots/library.png) |

---

## 🎥 Learning Workspace

| Playlist Details | Learning Player |
|------------------|-----------------|
| ![](assets/screenshots/playlist-details.png) | ![](assets/screenshots/player.png) |

---

## 📝 Productivity

| Video Notes | Settings |
|-------------|----------|
| ![](assets/screenshots/notes.png) | ![](assets/screenshots/settings.png) |

---
# 🏗️ System Architecture

```mermaid
flowchart TD
    User([👤 User]) --> FE

    subgraph FE ["🎨 Frontend (React + Vite)"]
        direction TB
        F1["Responsive UI"]
        F2["Authentication"]
        F3["Dashboard"]
        F4["Playlist Management"]
        F5["Learning Workspace"]
        F6["Settings"]
    end

    FE <===>|"║ REST API / HTTP ║"| BE

    subgraph BE ["⚙️ Backend (Node.js + Express)"]
        direction TB
        B1["JWT Authentication"]
        B2["Playlist Management"]
        B3["Progress Tracking"]
        B4["Video Notes"]
        B5["YouTube Integration"]
    end

    BE <---> DB
    BE <---> YT

    subgraph DB ["🗄️ MongoDB Atlas"]
        direction TB
        D1["Users"]
        D2["Playlists"]
        D3["Video Progress"]
        D4["Notes"]
        D5["Streak & Heatmap"]
    end

    subgraph YT ["📡 YouTube Data API v3"]
        direction TB
        Y1["Playlist Metadata"]
        Y2["Videos"]
        Y3["Durations"]
        Y4["Thumbnails"]
    end

    %% Custom Styling
    style User fill:#38bdf8,stroke:#0284c7,color:#fff,stroke-width:2px
    style FE fill:#1e293b,stroke:#3b82f6,color:#fff,stroke-width:2px
    style BE fill:#1e293b,stroke:#22c55e,color:#fff,stroke-width:2px
    style DB fill:#1e293b,stroke:#10b981,color:#fff,stroke-width:2px
    style YT fill:#1e293b,stroke:#ef4444,color:#fff,stroke-width:2px
```
---

## ⚡ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, React Router DOM v7, Axios, React YouTube, React Hot Toast, Lucide Icons
- **Backend**: Node.js, Express.js, Mongoose ODM, JWT Authentication, bcryptjs, CORS
- **Database**: MongoDB Atlas
- **External API**: YouTube Data API v3

---

## 📂 Project Structure

```text
WatchFlow Application
├── Client (React 19 + Vite + Tailwind CSS)
│   ├── Context (Auth & Theme management)
│   ├── Pages (Home, Auth, Dashboard, Library, PlaylistDetails, PlaylistPlayer, Settings)
│   └── Components (AppShell, PlayerShell, NotesModal, Heatmap, TopBar, Sidebar)
│
└── Backend Server (Node.js + Express)
    ├── Models (User, Playlist, Video, Note, DailyActivity)
    ├── Controllers (Auth, Dashboard, Playlist, Video, Note, Settings, Streak)
    ├── Services (YouTube Data API v3 Integration with caching)
    └── Serverless Handler (api/index.js for Vercel)
```

---

## 🔑 Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=WatchFlow
JWT_SECRET=your_jwt_secret_key
YOUTUBE_API_KEY=your_youtube_data_api_v3_key
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm
- MongoDB Atlas cluster connection string
- YouTube Data API v3 key

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd WatchFlow
```

### 2. Configure Environment Files
- Create `server/.env` with your `MONGO_URI`, `JWT_SECRET`, and `YOUTUBE_API_KEY`.
- Create `client/.env` with `VITE_API_URL=http://localhost:5000/api`.

### 3. Start Backend Server
```bash
cd server
npm install
npm run dev
```

### 4. Start Frontend Application
```bash
cd client
npm install
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🌐 Vercel Deployment

1. Connect your repository to Vercel.
2. In Vercel Project Settings, add Environment Variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `YOUTUBE_API_KEY`
   - `VITE_API_URL` (Set to `/api` for unified production deployment)
3. Deploy! The root `vercel.json` automatically handles serverless API routing (`/api/*`) and static client hosting.

---

## 📄 License

This project is licensed under the MIT License.