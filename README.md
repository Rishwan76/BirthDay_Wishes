# 🎂 Birthday Memories – Animated Birthday Wishes

A full-stack MERN application that turns a birthday wish into an interactive,
animated digital scrapbook. An admin creates a personalized birthday
experience (photos, letter, wishes, theme), and the recipient opens a unique
link like `/birthday/riya-birthday` to watch it unfold — cover page → photo
memories → handwritten letter → wishes → memory collage → gift box →
confetti-filled finale.

---

## ✨ Features

- **Animated scrapbook experience**: welcome screen, cover page, polaroid
  photo gallery, typewriter-effect letter, animated wishes, collage,
  interactive gift box, and a confetti/fireworks/balloons finale.
- **Fully data-driven**: every birthday is stored in MongoDB and rendered
  dynamically — nothing is hardcoded per-person.
- **5 built-in themes**: Classic Red, Pink Love, Purple Dream, Pastel, Dark
  Night — swap the entire color palette via a `data-theme` attribute + CSS
  variables.
- **Admin dashboard**: create, edit, delete, preview, and copy shareable
  links for birthday experiences; upload/caption/delete photos.
- **JWT authentication** for the admin area, passwords hashed with bcryptjs.
- **Responsive, mobile-first design** with keyboard (`←` `→`) and swipe
  navigation, no horizontal scroll, 44px+ touch targets.
- **Optional background music** with an explicit "turn on the music?" prompt
  (browsers block autoplay, so this is user-initiated).
- **Reduced-motion support** via `prefers-reduced-motion`.

---

## 🧰 Tech Stack

**Frontend:** React 18, Vite, React Router DOM, Axios, Framer Motion, Lucide
React icons, plain CSS (no Tailwind/Bootstrap).

**Backend:** Node.js, Express, MongoDB + Mongoose, JWT, bcryptjs, Multer
(local photo uploads), dotenv, CORS.

---

## 📁 Folder Structure

```
birthday-animation/
├── client/                      # React + Vite frontend
│   └── src/
│       ├── components/          # Reusable scrapbook + animation components
│       ├── pages/                # Route-level pages (Home, BirthdayExperience, admin/*)
│       ├── context/              # AuthContext (admin session)
│       ├── services/             # axios instance (api.js)
│       ├── hooks/                # useSound.js
│       ├── utils/                # constants.js, animations.js
│       └── styles/               # global.css, scrapbook.css, animations.css, responsive.css
├── server/                      # Express + MongoDB backend
│   ├── config/db.js
│   ├── controllers/              # authController.js, birthdayController.js
│   ├── middleware/               # authMiddleware, errorMiddleware, uploadMiddleware
│   ├── models/                   # Admin.js, Birthday.js
│   ├── routes/                   # authRoutes.js, birthdayRoutes.js
│   ├── utils/generateToken.js
│   ├── uploads/                  # uploaded photos (served statically)
│   └── server.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 18+
- A MongoDB database (local `mongod`, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/birthday-animation
JWT_SECRET=replace_with_a_long_random_string
CLIENT_URL=http://localhost:5173
# Set these to provision the first admin, then remove them.
ADMIN_NAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Run the server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Frontend setup

In a new terminal:

```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (Vite dev server proxies
`/api` and `/uploads` requests to the backend — see `client/vite.config.js`).

### 4. Provision the first admin account

Set `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `server/.env` before
starting the server. It creates the initial admin account if none exists.
Afterward, remove those three variables and use
`http://localhost:5173/admin/login`.

### 5. Create a birthday experience

From the dashboard, click **Create Birthday**, fill in the recipient's name,
slug, letter, wishes, theme, etc., save, then upload photos. Copy the
generated link (`/birthday/your-slug`) and share it — or preview it instantly
from the dashboard.

---

## 🔌 API Endpoints

**Auth**
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Log in, returns JWT |
| GET | `/api/auth/me` | Get logged-in admin profile (protected) |

**Birthdays**
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/birthdays` | List all birthdays (admin) |
| GET | `/api/birthdays/id/:id` | Get one birthday by DB id (admin) |
| GET | `/api/birthdays/:slug` | Get one birthday by public slug (public) |
| POST | `/api/birthdays` | Create a birthday (admin) |
| PUT | `/api/birthdays/:id` | Update a birthday (admin) |
| DELETE | `/api/birthdays/:id` | Delete a birthday (admin) |
| POST | `/api/birthdays/:id/photos` | Upload photos (multipart/form-data, field name `photos`) |
| PUT | `/api/birthdays/:id/photos/:photoId` | Update a photo's caption |
| DELETE | `/api/birthdays/:id/photos/:photoId` | Delete a photo |

All admin endpoints require `Authorization: Bearer <token>`.

---

## 🎨 Customizing Themes

Themes are CSS variable overrides scoped under `[data-theme="..."]` in
`client/src/styles/global.css`. To add a new theme:

1. Add a new `[data-theme="my-theme"] { --dark-red: ...; --red: ...; }` block.
2. Add the value/label to `THEMES` in `client/src/utils/constants.js` and
   `client/src/components/BirthdayForm.jsx`.
3. Add `"my-theme"` to the `theme` enum in `server/models/Birthday.js`.

---

## 🖼️ Adding Photos

Photos are uploaded via Multer to `server/uploads/` and served statically at
`/uploads/<filename>`. To use Cloudinary or S3 instead, swap the storage
engine in `server/middleware/uploadMiddleware.js` — the rest of the app only
depends on `photo.url`, so no other code needs to change.

---

## 📱 Responsive & Accessibility Notes

- Mobile-first layout, tested down to 360px width; no horizontal scroll.
- All interactive elements are ≥44px and work with touch (no hover-only
  functionality).
- Swipe left/right to navigate on touch devices; `←`/`→` arrow keys on
  desktop.
- Respects `prefers-reduced-motion: reduce` to minimize animation.

---

## 🚢 Deployment Notes

**Single-service deploy (recommended):** the Express server serves the built
client. Build: `npm run build`, Start: `npm start`. Configure `MONGO_URI` and
`JWT_SECRET`; set `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in Render
only when provisioning the first admin, then remove them.
A `render.yaml` is included for Render.


- **Backend**: deploy to any Node host (Render, Railway, Fly.io, etc.). Set
  `MONGO_URI` and `JWT_SECRET` as environment variables. Set the three admin
  bootstrap variables only to provision the initial admin, then remove them. For
  persistent photo storage in production, move uploads to a cloud bucket
  (Cloudinary/S3) rather than local disk, since most hosts have ephemeral
  filesystems.
- **Frontend**: `npm run build` in `client/` produces a static `dist/`
  folder deployable to Vercel/Netlify/any static host. Update the API base
  URL (currently proxied via Vite in dev) to point at your deployed backend
  URL in production, e.g. via an environment variable consumed in
  `client/src/services/api.js`.

---

## 🧪 Local Development Tips

- Run backend and frontend in two terminals (`npm run dev` in both `server/`
  and `client/`).
- MongoDB Compass or `mongosh` is handy for inspecting the `birthdays` and
  `admins` collections directly.
- If photo uploads 404, confirm `server/uploads/` exists and the backend is
  serving it at `/uploads` (already wired in `server.js`).

---

Made with ❤️ — a handmade digital birthday scrapbook, built for someone
special.
