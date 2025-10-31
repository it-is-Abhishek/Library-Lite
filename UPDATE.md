# Library Lite - Project Update Documentation

## 📊 Entity Relationship Diagram

![ER Diagram](./public/ER-Diagram.png)

---

## 🚀 Project Update
*Date: 31 October 2025*

### **Phase 1: Initial Setup & Configuration**

#### Environment Setup
- ✅ Initialized Vite + React project
- ✅ Installed core dependencies (React, React Router DOM)
- ✅ Configured ESLint for code quality
- ✅ Set up project structure with proper folder organization

#### Backend Infrastructure
- ✅ Created Express.js server (Port: 3000)
- ✅ Configured CORS for cross-origin requests
- ✅ Set up environment variables (.env)
- ✅ Implemented error handling middleware
- ✅ Added health check endpoint (`/health`)

---

#### Prisma ORM Integration
- ✅ Installed and configured Prisma Client
- ✅ Connected to Supabase PostgreSQL database
- ✅ Set up database pooler for optimal connections
- ✅ Created initial Prisma schema with User, Author, Book, Borrow models

---


#### Supabase Authentication Integration
- ✅ Configured Supabase client with environment variables
- ✅ Set up authentication flow with JWT tokens
- ✅ Implemented session management with localStorage

#### Backend API Routes (`/api/auth`)

**1. POST `/api/auth/signup`**
- Creates user in Supabase Auth
- Stores user data in PostgreSQL via Prisma
- Validates all 4 fields: fullName, email, password, confirmPassword
- Password validation: minimum 6 characters
- Returns user object and session tokens

**2. POST `/api/auth/login`**
- Authenticates user with Supabase Auth
- Fetches/creates database record if missing
- Returns user data with borrowing history
- Provides access and refresh tokens

**3. POST `/api/auth/logout`**
- Invalidates user session
- Clears authentication tokens

**4. GET `/api/auth/user`**
- Requires Bearer token authentication
- Fetches current user with complete profile
- Includes borrowing history with book and author details
- Returns merged Supabase Auth + Database user data

#### Frontend API Client (`src/api/auth.js`)
- ✅ Created centralized auth API module
- ✅ Implemented methods:
  - `signup(email, password, fullName, confirmPassword)`
  - `login(email, password)`
  - `logout()`
  - `getCurrentUser()`
  - `getStoredUser()`
  - `isAuthenticated()`
- ✅ Token storage and retrieval from localStorage
- ✅ Automatic token refresh mechanism

---

#### Design System
- ✅ Custom CSS styling with modern UI/UX
- ✅ Background video animation for auth pages
- ✅ Responsive design for all screen sizes
- ✅ Consistent color scheme and typography

#### Login Page (`LoginPage.jsx`)
**Features:**
- ✅ Email and password input fields
- ✅ Password visibility toggle (show/hide)
- ✅ Form validation (client-side)
- ✅ Error message display with styled alerts
- ✅ Loading state during authentication
- ✅ "Sign In" button with disabled state when loading
- ✅ Switch to signup page option
- ✅ Auto-redirect to `/userprofile` on success 



#### Signup Page (`SignupPage.jsx`)
**Features:**
- ✅ Four input fields: Full Name, Email, Password, Confirm Password
- ✅ Password visibility toggles for both password fields
- ✅ Comprehensive form validation
- ✅ Error message display with styled alerts
- ✅ Success message display after account creation
- ✅ Loading state during signup process
- ✅ "Create Account" button with disabled state when loading
- ✅ Switch to login page option
- ✅ Auto-redirect to login page (2-second delay) on success

**Validation:**
- All fields required
- Password minimum 6 characters
- Password and confirm password must match
- Email format validation
- Real-time error feedback

#### User Profile Page (`UserProfile.jsx`)
**Features:**
- ✅ Displays user authentication information
- ✅ Shows database user profile (name, email, membership)
- ✅ Member since date
- ✅ Borrowing history with book details
- ✅ Loading state while fetching data
- ✅ Not logged in state handling

---

#### Navigation Flow
1. **Landing** → `/` (Login/Signup toggle)
2. **Signup Success** → Show success message → Redirect to `/` (login view) after 2s
3. **Login Success** → Redirect to `/userprofile`
4. **Invalid Route** → Redirect to `/`

---

## 📁 Project Structure

```
Library Lite/
├── backend/
│   ├── routes/
│   │   └── auth.js          # Authentication API routes
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── prismaClient.js  # Prisma client instance
│   ├── supabase/
│   │   └── supabase.js      # Supabase client config
│   ├── middleware/
│   │   └── authen           # Authentication middleware (planned)
│   ├── server.js            # Express server setup
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables
├── src/
│   ├── components/
│   │   ├── LoginPage.jsx       # Login component
│   │   ├── LoginPage.css       # Login styles
│   │   ├── SignupPage.jsx      # Signup component
│   │   ├── SignupPage.css      # Signup styles
│   │   ├── UserProfile.jsx     # User profile component
│   │   ├── BackgroundVideo.jsx # Video background component
│   │   ├── BackgroundVideo.css # Video styles
│   │   ├── DashboardPage.jsx   # Dashboard (planned)
│   │   └── Auth.css            # Shared auth styles
│   ├── api/
│   │   └── auth.js          # Frontend auth API client
│   ├── App.jsx              # Main app with routing
│   ├── App.css              # App styles
│   ├── main.jsx             # Entry point with Router
│   └── index.css            # Global styles
├── public/
│   ├── ER-Diagram.png       # Database ER Diagram
│   └── bg-animation.mp4     # Background video
├── package.json             # Frontend dependencies
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
└── README.md                # Project documentation
```

---

## 🔧 Technology Stack

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **Styling:** Custom CSS (no framework)
- **State Management:** React Hooks (useState, useEffect)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database ORM:** Prisma
- **Authentication:** Supabase Auth
- **Database:** PostgreSQL (Supabase)

### Development Tools
- **Code Quality:** ESLint
- **Version Control:** Git
- **ER Diagram:** @liam-hq/cli
- **Package Manager:** npm

---

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL=        # Supabase PostgreSQL connection string
SUPABASE_URL=        # Supabase project URL
SUPABASE_ANON_KEY=   # Supabase anonymous key
PORT=3000            # Server port
```

---

## 📊 Database Relations

### User ↔ Borrow (One-to-Many)
- A user can have multiple borrowing records
- Each borrow record belongs to one user

### Author ↔ Book (One-to-Many)
- An author can write multiple books
- Each book has one author

### Book ↔ Borrow (One-to-Many)
- A book can be borrowed multiple times (history)
- Each borrow record is for one book

### User → Book (Through Borrow)
- Users access books through the Borrow model
- Supports tracking borrowing history, due dates, returns, and fines

---

## 🎯 Key Features Implemented

### Authentication & Authorization
- ✅ User registration with email verification
- ✅ Secure password-based login
- ✅ Session management with JWT tokens
- ✅ Token-based API authentication
- ✅ Automatic token refresh
- ✅ Logout functionality

### User Experience
- ✅ Intuitive login/signup UI
- ✅ Password visibility toggles
- ✅ Real-time form validation
- ✅ Error and success notifications
- ✅ Loading states for async operations
- ✅ Smooth navigation and redirects
- ✅ Background video animation

### Data Management
- ✅ User profile storage in PostgreSQL
- ✅ Relationship management between entities
- ✅ Support for future borrowing system
- ✅ Author and book catalog foundation

---

## 🚧 Upcoming Features

### Phase 6: Book Management (Planned)
- [ ] Book listing and search functionality
- [ ] Book details page
- [ ] Add/Edit/Delete books (Admin)
- [ ] Book availability tracking

### Phase 7: Borrowing System (Planned)
- [ ] Borrow book functionality
- [ ] Return book functionality
- [ ] Due date calculations
- [ ] Fine calculation for overdue books
- [ ] Borrowing history tracking

### Phase 8: Admin Dashboard (Planned)
- [ ] Admin authentication
- [ ] Manage users
- [ ] Manage books and authors
- [ ] View all borrowing records
- [ ] Generate reports

### Phase 9: Advanced Features (Planned)
- [ ] Book recommendations
- [ ] Email notifications for due dates
- [ ] Search and filter capabilities
- [ ] User reviews and ratings
- [ ] Wishlist functionality

---

## 📝 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Server health check | No |
| POST | `/api/auth/signup` | Create new user account | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | No |
| GET | `/api/auth/user` | Get current user profile | Yes |

---

## 🎨 UI/UX Highlights

### Design Principles
- **Minimalist:** Clean and uncluttered interface
- **Intuitive:** Easy-to-understand navigation
- **Responsive:** Works on all device sizes
- **Accessible:** Clear error messages and feedback
- **Modern:** Contemporary design with smooth animations

### Color Scheme
- Primary: Blue tones for primary actions
- Success: Green for positive feedback
- Error: Red for validation errors
- Neutral: Grays for text and backgrounds

---

## 🏆 Achievements

✅ **Backend:** Complete authentication system with database integration  
✅ **Database:** Fully normalized schema with proper relationships  
✅ **Frontend:** Beautiful, functional auth pages with validation  
✅ **Routing:** SPA navigation with protected routes  
✅ **Security:** Password hashing, JWT tokens, validation  

---

## 👨‍💻 Development Team

- **Developer:** Team Ungreatful Potatoes
- **Repository:** Library-Lite
- **Current Branch:** main

---

## 📅 Last Updated

**October 31, 2025**

---

*This document is continuously updated as the project evolves.*
