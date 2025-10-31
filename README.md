# Please refer the Update.md file for the recent devlopment updates.
# Library Lite

**Library Lite** — a lightweight digital library management platform built with **React** (frontend) and **Node.js / Express** (backend).  
It helps small libraries and personal book collections manage books, members, lending, returns, fines and reports — with optional features like reservations, notifications, and barcode scanning.

---

## Table of contents
- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture & folders](#architecture--folders)
- [Getting started (local)](#getting-started-local)
  - [Prerequisites](#prerequisites)
  - [Environment variables](#environment-variables)
  - [Install and run](#install-and-run)
- [API overview](#api-overview)
- [Database schema (high level)](#database-schema-high-level)
- [Roadmap / TODOs](#roadmap--todos)


---

## Features

**Core**
- User roles: Admin, Librarian, Member
- Add / edit / delete books (title, author, ISBN, genre, publisher, edition, language, pages, cover)
- Member management & membership statuses
- Borrow / return lifecycle with due date tracking
- Overdue fines & fine calculation
- Search & filters for books
- Dashboard with key metrics (books out, overdue, monthly income)

**Extras (configurable)**
- Reservations & waitlists
- Email/SMS notifications for due/overdue/reserved
- CSV import/export for books & members
- Barcode / QR code for quick scanning
- Payment gateway for online fine payment
- E-book management (upload/download with time-limited access)
- Activity logs / audit trail
- Offline mode, GraphQL endpoint, real-time updates

---

## Tech stack

- **Frontend:** React, React Router, Context/Redux (optional), Tailwind CSS (or any UI library)
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (Supabase)
- **Auth:** JWT (JSON Web Tokens) + refresh tokens
- **Notifications:** Nodemailer (email), Twilio (SMS optional)
- **Storage:** Local disk for dev, 
- **Other:** Docker for containerization, WebSockets (Socket.io) for real-time

---

## Architecture & folders (suggested)

```
/library-lite
  /backend
    /src
      /controllers
      /models
      /routes
      /services
      /utils
      /jobs
      app.js
      server.js
  /frontend
    /src
      /components
      /pages
      /hooks
      /contexts
      /utils
      App.jsx
      index.jsx
  docker-compose.yml
  README.md
```

---

## Getting started (local)

### Prerequisites
- Node.js >= 18
- npm or yarn
- PostgreSQL running locally


### Environment variables

Create `.env` files for backend and frontend (or set envs in docker-compose).

**backend/.env**
```
PORT=4000
NODE_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/library_lite
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_pass
AWS_S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
FRONTEND_URL=http://localhost:3000
```

**frontend/.env**
```
VITE_API_URL=http://localhost:4000/api
VITE_APP_NAME=LibraryLite
```

### Install and run

**Option A — local (without Docker)**

1. Start DB (Postgres):
   - Create DB `library_lite` and a user
2. Backend
```bash
cd backend
npm install
npm run migrate   # if using migrations
npm run seed      # optional, create sample data
npm run dev       # starts backend on PORT
```
3. Frontend
```bash
cd frontend
npm install
npm run dev       # starts dev server (Vite / CRA)
```


## API overview (high-level)

> Base: `GET /api`

**Auth**
- `POST /api/auth/register` — create librarian/member
- `POST /api/auth/login` — login returns access & refresh token
- `POST /api/auth/token` — refresh access token
- `POST /api/auth/logout` — invalidate refresh token

**Books**
- `GET /api/books` — list books (supports search & filters)
- `GET /api/books/:id` — get book details
- `POST /api/books` — add book (admin/librarian)
- `PUT /api/books/:id` — update book
- `DELETE /api/books/:id` — delete book
- `POST /api/books/import` — CSV import

**Members**
- `GET /api/members`
- `POST /api/members`
- `PUT /api/members/:id`
- `DELETE /api/members/:id`

**Loans / Transactions**
- `POST /api/loans/borrow` — borrow book (member or librarian)
- `POST /api/loans/return` — return book
- `GET /api/loans` — all transactions
- `GET /api/loans/overdue` — overdue items
- `POST /api/loans/reserve` — reserve a book

**Payments**
- `POST /api/payments/payfine` — integrate payment gateway

**Admin**
- `GET /api/admin/reports` — income, most-borrowed, overdue stats
- `GET /api/admin/logs` — activity logs

> Use proper auth middleware (JWT + role check) to protect endpoints.

---

## Database schema (high level)

**Tables / collections**
- `users` — id, name, email, passwordHash, role, phone, address, createdAt
- `books` — id, title, author, isbn, publisher, year, edition, language, genre[], totalCopies, availableCopies, coverUrl, tags, createdAt
- `members` — extends users or separate table linking userId to membership details (type, startDate, expiryDate)
- `loans` — id, bookId, memberId, borrowDate, dueDate, returnDate, fine, status (BORROWED, RETURNED, OVERDUE), notes
- `reservations` — id, bookId, memberId, reservedAt, status, notifySent
- `payments` — id, loanId, memberId, amount, paymentMethod, status, transactionId, createdAt
- `logs` — id, userId, action, resourceType, resourceId, meta, timestamp

---


## Roadmap / TODOs

- [ ] Barcode / QR scanning (mobile integration)
- [ ] Payment gateway (Stripe/Razorpay)
- [ ] Email queue with retry & templating
- [ ] Real-time updates with Socket.io
- [ ] Multi-branch features
- [ ] E-book expiration & streaming
- [ ] Mobile-first responsive UI & PWA support

---

