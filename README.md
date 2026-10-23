# CDAC Cloud Security Training Platform

The CDAC Cloud Security Training Platform is an interactive, browser-based hands-on cloud security learning platform featuring 13 structured curriculum modules, interactive slide lectures with SVG scene animations, a simulated OpenStack Horizon cloud management console, a simulated Kali Linux workstation, a role-based access request portal, and real-time configuration validation for Module 4 (Cloud Infrastructure & Virtualization Security). Built as a pure static front-end application with no backend dependencies required.

To find which file controls what, open `EDIT_GUIDE.txt`.

## Requirements

- Node.js 18.0.0 or higher (Node.js 20+ recommended)
- npm 9.0.0 or higher

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates a static production bundle in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

## Deployment

Deploying the application requires no server-side runtime or database:
- **Netlify / Vercel**: Connect repository or drag-and-drop the `dist/` folder directly; set build command to `npm run build` and publish directory to `dist`.
- **GitHub Pages / Static Web Servers**: The application uses hash-based routing (`HashRouter` pattern), ensuring all deep links survive page refreshes on any static host or subdirectory without URL rewrite configuration.
- **S3 / Nginx**: Copy the contents of `dist/` directly into your web root.

## Demo Credentials

| Role | Username | Password | Access / Capabilities |
| :--- | :--- | :--- | :--- |
| **Student** | `student` | `cloudsec123` | Curriculum access, progressive slide unlocking, Module 4 labs 1–7 |
| **Admin / Instructor** | `admin` | `admin@cdac` | Unrestricted curriculum access, WYSIWYG Admin Slide & Lab Editor |
