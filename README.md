# Pak Development Mission (PDM) Website

Full-stack Next.js website with Admin Dashboard + Neon PostgreSQL.

---

## STEP-BY-STEP SETUP IN VS CODE

### Step 1 — Prerequisites
Make sure these are installed on your PC:
- Node.js 18+ → https://nodejs.org
- VS Code → https://code.visualstudio.com

### Step 2 — Open Project in VS Code
1. Extract the ZIP folder
2. Open VS Code
3. Click File → Open Folder → select the `pdm-website` folder

### Step 3 — Open Terminal in VS Code
Press `Ctrl + `` ` (backtick) to open the terminal inside VS Code.

### Step 4 — Install Dependencies
Run this command:
```
npm install
```
Wait for it to finish (2–3 minutes).

### Step 5 — Setup Database
Run these commands one by one:
```
npx prisma generate
npx prisma db push
npm run db:seed
```

### Step 6 — Start the Website
```
npm run dev
```

### Step 7 — Open in Browser
Go to: http://localhost:3000

---

## PAGES

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| About | http://localhost:3000/about |
| Events | http://localhost:3000/events |
| Team | http://localhost:3000/team |
| Volunteer | http://localhost:3000/volunteer |
| Contact | http://localhost:3000/contact |
| Admin Login | http://localhost:3000/admin |
| Admin Dashboard | http://localhost:3000/admin/dashboard |

---

## ADMIN LOGIN CREDENTIALS

- Email: admin@pdm.org.pk
- Password: admin123

---

## DATABASE

Using Neon PostgreSQL (already configured in .env file).
Connection string is set. Just run the db:push and db:seed commands above.

---

## TECH STACK

- Framework: Next.js 14 (App Router)
- Database: Neon PostgreSQL
- ORM: Prisma
- Styling: Tailwind CSS
- Auth: JWT (stored in HTTP-only cookie)
- Password hashing: bcryptjs

---

## FOLDER STRUCTURE

```
pdm-website/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data (team, events, admin user)
├── src/
│   ├── app/
│   │   ├── (public)/       # Public pages (home, about, events, team, volunteer, contact)
│   │   ├── admin/          # Admin pages (login, dashboard, events, volunteers, team)
│   │   └── api/            # API routes
│   ├── components/
│   │   ├── public/         # Navbar, Footer, forms
│   │   └── admin/          # AdminSidebar
│   └── lib/
│       ├── prisma.ts       # Prisma client
│       └── auth.ts         # JWT auth helpers
├── .env                    # Environment variables (DB URL, JWT secret)
└── tailwind.config.js      # PDM brand colors
```
