# 🧺 Laundry Pickup — Pickup & Delivery Management (Frontend)

![Last Commit](https://img.shields.io/github/last-commit/KawyaDissanayaka/laundry-pickup-delivery-management-system?style=flat-square)
![Repo Size](https://img.shields.io/github/repo-size/KawyaDissanayaka/laundry-pickup-delivery-management-system?style=flat-square)
![Open Issues](https://img.shields.io/github/issues/KawyaDissanayaka/laundry-pickup-delivery-management-system?style=flat-square)
![Forks](https://img.shields.io/github/forks/KawyaDissanayaka/laundry-pickup-delivery-management-system?style=flat-square)
![Stars](https://img.shields.io/github/stars/KawyaDissanayaka/laundry-pickup-delivery-management-system?style=flat-square)
![License](https://img.shields.io/github/license/KawyaDissanayaka/laundry-pickup-delivery-management-system?style=flat-square)


A single-page frontend application built with React, Vite, and Tailwind CSS for managing laundry pickup, delivery, and order tracking. This repository contains the React UI used to demo app pages, components, and flows (customers, drivers, orders, tracking, dashboards).

---

## Repository details

- Owner / repo: KawyaDissanayaka/laundry-pickup-delivery-management-system
- Clone URL: https://github.com/KawyaDissanayaka/laundry-pickup-delivery-management-system.git
- View on GitHub: https://github.com/KawyaDissanayaka/laundry-pickup-delivery-management-system



---

## Quick summary

- Framework: React + Vite
- Styling: Tailwind CSS
- Bundler/dev server: Vite
- This repository contains the frontend only (no backend in this repo).

---

## Prerequisites

- Node.js 18+ recommended
- npm (comes with Node.js)

---

## Setup & run (Windows - PowerShell)

Open PowerShell, then run:

```powershell
# install dependencies
npm install

# start dev server (Vite)
npm run dev
```

The dev server opens on http://localhost:5173 by default. You can also use `npm start` (alias for `vite`) or `npm run preview` after a build to serve the production build locally.

---

## Available scripts

These are defined in `package.json`:

- npm run dev / npm start — start the Vite dev server
- npm run build — build for production
- npm run preview — locally preview the production build
- npm run lint — run ESLint

---

## Project structure (important files)

```
laundry-pickup-delivery-management-system/
├─ public/                 # static assets used by Vite
├─ src/                    # React source code
│  ├─ assets/              # images/icons
│  ├─ components/          # reusable UI components and layout
│  ├─ context/             # React contexts (Auth, etc.)
│  ├─ data/                # mock data used by the UI
│  ├─ pages/               # route pages (Home, Login, Dashboard, Orders...)
│  └─ routes/              # app routing setup
├─ index.html
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
└─ README.md
```

Browse `src/` to see components and pages used by the app (for example `src/pages/Orders.jsx`, `src/components/layout/MainLayout.jsx`).

---

## Notes & next steps

- This repository is the frontend; to connect to a real backend, update API endpoints in the code (search for fetch/axios calls or mock data under `src/data`).
- If you'd like, I can also:
  - add a short CONTRIBUTING section or template
  - add a small script to run lint + type checks
  - wire the app to a sample JSON server for local end-to-end testing

---

If you'd like specific badges, a full contribution guide, or to include a backend repo link, tell me the GitHub owner/repo and I will add those.
