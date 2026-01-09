# E-commerce Admin Panel

This project is a simplified E-commerce Admin Panel built with **Next.js**, **TypeScript**, and **Material UI (v5)**.  
It demonstrates a modular, scalable frontend architecture with mock and API-integrated data for managing products and orders.

---

## Project Overview

The Admin Panel allows an admin to:

- View and manage products (CRUD)
- Track orders (mocked)
- Filter and search data
- View order details in a modal
- Use a clean, responsive UI powered by Material UI and Style CSS

This project simulates a real-world admin dashboard for an online store.

---

## Tech Stack

| Area | Technology / Library | Reasoning |
| Framework | Next.js | Full-featured React framework with routing, SSR, and modern best practices |
| Language | TypeScript | Strong typing, improved maintainability, and safer refactoring |
| UI Library | Material UI | responsive UI with built-in components |
| Form Handling | react-hook-form + Yup/Zod (future) | Simple, declarative form handling and validation |
| Data | Mock API (`mockorders.ts`) & public API integration (`https://dummyjson.com/`) | Allows demonstration of both local mock data and external API integration |

---

## Folder Structure
scr
=> api
    index.ts (where i implement all the API route)
=> app
    /api
        /countries
            - route.ts (use Nextjs API Routes to call restcountries countries info public API)
    /CountryInfo
        # CountryInfo.css
        - page.tsx   
    /Dashboard
        # Dashboard.css
        - page.tsx
    /Login
        # login.css
        - page.tsx
    /Orders
        #order.css
        - page.tsx
        - mockorders.ts (where i do mock data for orders details)
    /Products
        # products.css
        - page.tsx
    # globals.css (all components and global css put in here)
    - layout.tsx (Main Startup layout)
    - page.tsx (Main Startup Page)
=> components
    /layout
        - AdminLayout.tsx (main Layout display for all Admin pages)
        - Sidebar.tsx
        - Topbar.tsx
=> store
    - authSlice.ts
    - hooks.ts
    - index.ts

**Notes:**

- Each page has its own folder for modularity
- Shared components (e.g., layout) are in `components/`
- CSS is per-page to isolate on every folder page styling for easy to maintain purpose

## Setup Guide 

1. Clone the repository:
git clone git@github.com:KaeHerng/ChongKaeHerng.Next.Assessment.git

2. cd into Repo: 
cd REPO_NAME

3. check branch: 
git branch -a

4. Checkout to the branch in this case main: 
git checkout main

5. install components: 
npm install

6. Create .env and Copy values inside .env.example 

7. run the project: 
npm run dev

8. use localhost 3000 to run this project on browser: 
http://localhost:3000
