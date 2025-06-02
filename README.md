# Food-Delivery-App Frontend

This is the frontend for the Food-Delivery-App, built with React and Vite. It provides a modern, responsive user interface for restaurant staff and customers to manage orders, tables, menu items, and view analytics.

---

## Live At 

[https://food-delivery-app-two-liard.vercel.app/](https://food-delivery-app-two-liard.vercel.app/)
[https://food-delivery-app-two-liard.vercel.app/order-food](https://food-delivery-app-two-liard.vercel.app/order-food)

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Features

- Dashboard for analytics and summary
- Menu browsing and item selection
- Order placement and checkout
- Table management (add, edit, remove)
- Chef and order management
- Responsive design for desktop and tablet
- Integration with backend APIs

---

## Project Structure

```
Frontend/
  ├── .env
  ├── .gitignore
  ├── index.html
  ├── package.json
  ├── README.md
  ├── vite.config.js
  ├── public/
  │     └── vite.svg
  └── src/
        ├── App.jsx
        ├── main.jsx
        ├── App.css
        ├── index.css
        ├── assets/
        │     └── (icons and images)
        ├── components/
        │     ├── NavBar.jsx
        │     └── FilterBar.jsx
        ├── pages/
        │     ├── MainPage.jsx
        │     ├── AnalyticsPage.jsx
        │     ├── TablesPage.jsx
        │     ├── OrderPage.jsx
        │     ├── MenuPage.jsx
        │     ├── MenuMainPage.jsx
        │     ├── CheckOutPage.jsx
        │     └── PagesStyle/
        └── redux/
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. **Clone the repository:**

   ```sh
   git clone <repo-url>
   cd Frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the `Frontend/` directory with the following variable:

   ```
   VITE_API_URL=<your-backend-url>
   ```

4. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will run at [http://localhost:5173](http://localhost:5173) by default.

---

## Available Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build

---

## Environment Variables

- `VITE_API_URL` — The base URL for the backend API (e.g., `https://food-delivery-app-backend-1w4l.onrender.com`)

---

## Technologies Used

- React
- Vite
- Redux Toolkit
- React Router
- CSS Modules