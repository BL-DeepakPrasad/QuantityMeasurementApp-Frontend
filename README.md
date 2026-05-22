# 📐 Quantity Measurement App — Frontend

A modern **React** single-page application for converting, comparing, and performing arithmetic on physical quantities (length, volume, weight, and temperature). Built with **Vite**, styled with **Bootstrap 5**, and secured with **JWT + Google OAuth 2.0**.

---

## ✨ Features

| Category | Details |
|---|---|
| **Convert** | Convert a value from one unit to another within the same quantity type |
| **Compare** | Check whether two quantities are equal after normalisation |
| **Add / Subtract / Divide** | Perform arithmetic across compatible units and get the result in a chosen target unit |
| **Authentication** | Email + password registration & login **and** Google OAuth 2.0 sign-in |
| **Session Management** | JWT stored in `localStorage`; automatic logout on 401/403 responses |
| **Responsive UI** | Bootstrap 5 grid with card-based layout that works on mobile, tablet, and desktop |

### Supported Quantity Types & Units

| Type | Units |
|---|---|
| 📏 Length | Inch, Feet, Yard, Centimeter |
| 🧪 Volume | Gallon, Litre, Milliliter |
| ⚖️ Weight | Gram, Kilogram, Tonne |
| 🌡️ Temperature | Celsius, Fahrenheit |

---

## 🛠 Tech Stack

- **React 19** — UI library
- **Vite 8** — Lightning-fast dev server & bundler
- **React Router v7** — Client-side routing
- **Bootstrap 5** — Responsive CSS framework (CDN)
- **React Hot Toast** — Toast notifications
- **ESLint** — Code linting

---

## 📁 Project Structure

```
QMA-FrontEnd/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   └── api.js              # HTTP client & API endpoint functions
│   ├── components/
│   │   ├── Navbar.jsx           # Top navigation bar with logout
│   │   └── ProtectedRoute.jsx   # Auth guard for private routes
│   ├── context/
│   │   └── AuthContext.jsx      # React Context for JWT auth state
│   ├── pages/
│   │   ├── LoginPage.jsx        # Login / Register forms + Google OAuth
│   │   └── DashboardPage.jsx    # Main measurement dashboard
│   ├── App.jsx                  # Root component with routing
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles
├── .env                         # Environment variables (not committed)
├── index.html                   # HTML entry point
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or any compatible package manager)
- A running instance of the **QMA Backend / API Gateway** (default: `http://localhost:8080`)

### Installation

```bash
# Clone the repository
git clone https://github.com/BL-DeepakPrasad/QuantityMeasurementApp-Frontend.git
cd QuantityMeasurementApp-Frontend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root (or update the existing one):

```env
VITE_API_URL=http://localhost:8080
VITE_GOOGLE_AUTH_URL=http://localhost:8080/oauth2/authorization/google
```

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Base URL of the backend API gateway |
| `VITE_GOOGLE_AUTH_URL` | URL to initiate the Google OAuth 2.0 flow |

### Running the Dev Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173** by default.

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| **dev** | `npm run dev` | Start the Vite dev server with HMR |
| **build** | `npm run build` | Create an optimised production build |
| **preview** | `npm run preview` | Preview the production build locally |
| **lint** | `npm run lint` | Run ESLint across the project |

---

## 🔐 Authentication Flow

```
┌──────────┐       ┌──────────────┐       ┌────────────┐
│  Browser  │──────▶│  Login Page  │──────▶│  Backend   │
│           │       │  (email/pwd) │       │  /api/auth │
│           │◀──────│  or Google   │◀──────│  + JWT     │
└──────────┘       └──────────────┘       └────────────┘
      │
      ▼
 JWT stored in localStorage
      │
      ▼
 All subsequent API calls include
 Authorization: Bearer <token>
```

1. **Email/Password** — User registers or logs in via `/api/auth/register` and `/api/auth/login`. The backend returns a JWT.
2. **Google OAuth 2.0** — User clicks "Sign in with Google" which redirects to the API Gateway's OAuth flow. On success, the backend redirects back to `/oauth?token=<jwt>`.
3. **Session Guard** — The `ProtectedRoute` component checks `AuthContext` before rendering protected pages. If a 401/403 is received from any API call, the token is cleared and the user is redirected to the login page.

---

## 🌐 API Integration

All API calls are centralised in `src/api/api.js`. The base URL is read from `VITE_API_URL`.

| Function | Endpoint | Method | Auth |
|---|---|---|---|
| `login(email, password)` | `/api/auth/login` | POST | ✗ |
| `register(name, email, password)` | `/api/auth/register` | POST | ✗ |
| `convert(type, value, unit, targetUnit)` | `/api/quantity/convert` | POST | ✓ |
| `compare(type, v1, u1, v2, u2)` | `/api/quantity/compare` | POST | ✓ |
| `add(type, v1, u1, v2, u2, targetUnit)` | `/api/quantity/add` | POST | ✓ |
| `subtract(type, v1, u1, v2, u2, targetUnit)` | `/api/quantity/subtract` | POST | ✓ |
| `divide(type, v1, u1, v2, u2, targetUnit)` | `/api/quantity/divide` | POST | ✓ |

---

## 🏗 Backend Architecture

This frontend is designed to work with a **microservices backend** consisting of:

| Service | Role |
|---|---|
| **API Gateway** | Single entry point — proxies requests, handles CORS |
| **Auth Service** | JWT authentication, Google OAuth 2.0 |
| **Quantity Service** | Unit conversion, comparison, and arithmetic logic |
| **Eureka Server** | Service discovery for the microservices |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is for educational and demonstration purposes.
