# Perez Chapel International — Dome District
## Cell Leader Reporting & Management System

**Version:** 1.0.0  
**Built:** June 2026  
**Coverage:** 11 Regions · 28 Sections · 191 LFU Cells

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- [Node.js 18+](https://nodejs.org/) (includes npm)
- A code editor — [VS Code](https://code.visualstudio.com/) recommended

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open your browser at:
# http://localhost:5173
```

### Demo Login Accounts

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@perezchapel.org | admin123 |
| Regional Leader (Canaan) | canaan@perezchapel.org | canaan123 |
| Sectional Leader (PS Franca Area) | franca.sec@perezchapel.org | section123 |
| Cell Leader (Shiloh Celebrity Hill) | rebecca@perezchapel.org | rebecca123 |

---

## 🌐 Deploy to Netlify (Recommended — Free)

### Option A: Connect to GitHub (Auto-deploy)

1. Push this project to a **private** GitHub repository:
```bash
git init
git add .
git commit -m "Initial commit: PCI Cell System v1"
git remote add origin https://github.com/YOUR-USERNAME/pci-cell-system.git
git branch -M main
git push -u origin main
```

2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from GitHub**
3. Select your `pci-cell-system` repository
4. Confirm build settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy** — live in ~60 seconds

### Option B: Drag & Drop (No GitHub needed)

```bash
# Build the production files
npm run build

# This creates a /dist folder
```
Then drag the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 🔄 Deploy to Vercel (Alternative)

```bash
npm install -g vercel
vercel --prod
```
Or connect your GitHub repo at [vercel.com](https://vercel.com). The `vercel.json` file handles SPA routing automatically.

---

## 📁 Project Structure

```
pci-cell-system/
├── public/
│   └── favicon.svg          ← PCI cross logo (gold)
├── src/
│   ├── main.jsx             ← React entry point
│   └── App.jsx              ← ENTIRE APPLICATION (1,283 lines)
├── index.html               ← HTML shell
├── package.json             ← Dependencies: react, react-dom, recharts
├── vite.config.js           ← Build configuration
├── netlify.toml             ← Netlify: build command + SPA redirect
├── vercel.json              ← Vercel: SPA rewrite rules
├── .gitignore               ← Excludes node_modules, dist, .env
└── README.md                ← This file
```

---

## 🏗️ System Overview

### Organisation Hierarchy
```
PEREZ DOME DISTRICT
└── REGION (11)              ← e.g. CANAAN REGION
    └── SECTION/AREA (28)    ← e.g. PS FRANCA ABANI Area
        └── HOME CELL/LFU (191) ← e.g. CANAAN OKPONGLO (PS FRANCA)
```

### User Roles
| Role | Access |
|------|--------|
| Super Admin | Full system — all 191 cells, all tools |
| Regional Leader | Their region only |
| Sectional Leader | Their section only |
| Cell Leader | Their own cell only |

### Application Modules
| Page | Roles | Description |
|------|-------|-------------|
| Dashboard | All | KPI cards, trend charts, region comparison |
| Submit Report | Cell Leader | Official 5-section form mirroring Google Form |
| My Members | Cell Leader | Member roster, attendance tracking |
| Consistency | All | Absentee flags — 3+ (Watch), 5+ (Critical) |
| All Reports | Admin/Leaders | Filter, view, detail modal |
| Organisation | Admin/Leaders | Add/edit/move/delete regions, sections, cells |
| Users | Super Admin | Create and manage all user accounts |
| Messages | All | Caution messaging between hierarchy levels |
| Admin Tools | Super Admin | Reporting window toggle, data export (CSV/JSON), bulk import |

---

## 📋 Report Form Sections

The Submit Report page mirrors the official **PEREZ DOME LFU LEADER REPORTING FORM** exactly:

- **Section 1 — Date:** Report date (Saturday)
- **Section 2 — LFU Leadership:** Leader name and contact (auto-filled)
- **Section 3 — Home Cell Meeting:** Meeting toggle, adults, children, offering, member attendance roll, testimony
- **Section 4 — LFU Outreach:** Outreach toggle, souls won, participants, duration (5 options)
- **Section 5 — Observation:** Photo upload (Google Drive link), comments, AP visit

---

## 📦 Data Export Formats

From Admin Tools → Data Export:
- **All Reports (CSV)** — all weekly submissions with all fields
- **All 191 Cells Directory (CSV)** — complete cell listing with sections and regions
- **All Members (CSV)** — registered members with phone numbers
- **Offering Summary (CSV)** — offering per cell per date
- **Full System Backup (JSON)** — complete snapshot for migration

---

## 🔮 Version 2 Roadmap

When ready to add a real backend:

1. **Supabase** (free tier) — replace in-memory state with PostgreSQL
2. **Supabase Auth** — replace plain-text password login
3. **Arkesel SMS** — Saturday morning reminder to cell leaders (Ghana)
4. **Google Drive API** — direct photo upload from the report form
5. **SheetJS** — proper `.xlsx` export instead of CSV
6. **PWA / Service Worker** — offline support for poor network areas

---

## 📞 Support

For technical issues, contact the system developer.  
For church structure updates (new cells, sections, regions), use **Admin Tools → Organisation** or **Bulk Import**.

---

*Perez Chapel International, Dome District · Cell Reporting System v1.0 · June 2026*
