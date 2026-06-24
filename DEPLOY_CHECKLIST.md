# ✅ PCI Cell System — Deployment Checklist

## BEFORE YOU START
- [ ] Node.js 18+ installed (`node --version`)
- [ ] Git installed (`git --version`)
- [ ] GitHub account ready (github.com)
- [ ] Netlify account ready (netlify.com)

---

## STEP 1 — Test Locally (5 minutes)

```bash
cd pci-cell-system
npm install
npm run dev
```
- [ ] App opens at http://localhost:5173
- [ ] All 4 demo accounts log in correctly
- [ ] Dashboard loads with charts
- [ ] Submit Report form works
- [ ] Organisation → Cells shows 191 cells node
---

## STEP 2 — Update Real Data (30–60 minutes)

Open `src/App.jsx` and update:

**INIT_USERS array** — replace demo accounts with real leader accounts:
- [ ] Super Admin account (set secure password)
- [ ] One user per Regional Leader (11 regions)
- [ ] One user per Sectional Leader (28 sections)
- [ ] One user per Cell Leader (191 cells)

**Clear demo seed data:**
- [ ] Set `INIT_MEMBERS = []`
- [ ] Set `INIT_REPORTS = []`  
- [ ] Set `INIT_ATTENDANCE = []`
- [ ] Set `INIT_CAUTIONS = []`
- [ ] Remove `seedReports()` function call from useState
- [ ] Change `useState(()=>patchAtt(...))` to `useState([])`

**Verify organisation data:**
- [ ] All 11 regions are correct
- [ ] All 28 sections match current structure
- [ ] All 191 cells are correct — add/remove as needed

---

## STEP 3 — Push to GitHub (5 minutes)

```bash
cd pci-cell-system
git init
git add .
git commit -m "PCI Cell System v1.0 — production"
git remote add origin https://github.com/YOUR-USERNAME/pci-cell-system.git
git branch -M main
git push -u origin main
```
- [ ] Repository shows all files on GitHub
- [ ] Repository is set to **Private**

---

## STEP 4 — Deploy to Netlify (5 minutes)

1. Go to https://app.netlify.com
2. Click **Add new site** → **Import an existing project** → **GitHub**
3. Authorise Netlify to access your GitHub
4. Select `pci-cell-system` repository
5. Confirm settings:
   - Branch: `main`
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **Deploy site**

- [ ] Build log shows "Build succeeded"
- [ ] App is live at `https://RANDOM-NAME.netlify.app`

---

## STEP 5 — Set Custom Subdomain (2 minutes)

1. Netlify → Site settings → Domain management
2. Click **Options** → **Edit site name**
3. Change to: `pci-dome-cells` (or your preferred name)

- [ ] App accessible at `https://pci-dome-cells.netlify.app`

---

## STEP 6 — Test Live Site (10 minutes)

- [ ] Login page loads
- [ ] Super Admin login works
- [ ] All navigation items load
- [ ] Submit Report form submits
- [ ] Messages send correctly
- [ ] Admin Tools → Reporting window toggle works
- [ ] Test on a smartphone browser (Chrome Android or Safari iOS)

---

## STEP 7 — Share with Leaders (Day of Launch)

- [ ] Send app URL to all Regional Leaders via WhatsApp
- [ ] Send individual login credentials to each leader privately
- [ ] Pin the URL in the Cell Leaders WhatsApp group
- [ ] Open reporting window: Admin Tools → Reporting → Toggle ON
- [ ] Send WhatsApp reminder to cell leaders to submit by 9pm Saturday

---

## FUTURE UPDATES

When you make changes to `src/App.jsx`:
```bash
git add .
git commit -m "Update: describe what changed"
git push
```
Netlify automatically rebuilds and deploys in ~60 seconds.

---

*Keep this checklist. You will need it for each new deployment.*
