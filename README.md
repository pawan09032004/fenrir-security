# Fenrir Security Dashboard

Fenrir Security Dashboard is a cutting-edge B2B SaaS platform designed to provide a seamless and intuitive interface for managing cybersecurity scans, findings, and logs. Built with modern technologies like React, Vite, and Tailwind CSS, this dashboard ensures high performance, responsiveness, and a delightful user experience.

## Live Demo

Experience the live application here:

[Live Demo](https://fenrir-security-three.vercel.app/)

## Video Walkthrough

Watch a detailed walkthrough of the application:

[Watch on Loom](https://drive.google.com/file/d/127dlt2080rSxEQAXxFNA-Px1T--jrpGE/view?usp=sharing)


## Key Features

- **Fully Implemented Screens**: Login, Dashboard, and Scan Detail pages.
- **Dark & Light Mode**: Theme persistence using `localStorage`.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **Interactive Elements**: Search bar with debounce, tabs, toast notifications, and confirmation modals.
- **Reusable Components**: Includes `Button`, `SeverityBadge`, `StatusChip`, `ProgressBar`, `ThemeToggle`, and more.
- **Mock Data Integration**: Preloaded mock data for scans, findings, and logs.
- **Vercel Deployment Ready**: Configured for seamless deployment with SPA routing.

## Screenshots

Showcase the application with the following screenshots:

- **Login Page**:
  ![Login Page](https://github.com/pawan09032004/fenrir-security/blob/e69c6ecf89f4740f4da2812e4c55f19ce41640ae/fenrir-security/Screenshot%202026-03-04%20010453.png)
- **Dashboard**:
  ![Dashboard](https://github.com/pawan09032004/fenrir-security/blob/e69c6ecf89f4740f4da2812e4c55f19ce41640ae/fenrir-security/Screenshot%202026-03-04%20010537.png)
- **Scan Detail**:
  ![Scan Detail](https://github.com/pawan09032004/fenrir-security/blob/e69c6ecf89f4740f4da2812e4c55f19ce41640ae/fenrir-security/Screenshot%202026-03-04%20010555.png)

## Tech Stack

| Technology      | Version |
|-----------------|---------|
| React           | 18+     |
| Vite            | 5       |
| Tailwind CSS    | 3       |
| React Router    | 6       |
| Lucide React    | Latest  |

## Getting Started

Follow these steps to set up and run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/fenrir-security.git
   ```
2. Navigate to the project directory:
   ```bash
   cd fenrir-security
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit:
   [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── context/ThemeContext.jsx   # Manages global dark/light theme
├── data/mockData.js           # Contains mock data for scans, findings, and logs
├── components/
│   ├── layout/Sidebar.jsx     # Sidebar with mobile hamburger menu
│   └── ui/                    # Reusable UI components (Button, Toast, Modal, etc.)
├── pages/
│   ├── Login.jsx              # Login page with form validation
│   ├── Dashboard.jsx          # Dashboard with scan stats, search, and filters
│   └── ScanDetail.jsx         # Detailed view of active scans and findings
└── App.jsx                    # Application entry point with routing and theme provider
```

## Deployment

Deploy the application to Vercel in just a few steps:

1. Install the Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```
2. Deploy the project:
   ```bash
   vercel --prod
   ```

The `vercel.json` file is pre-configured to handle SPA routing.

## Color Design System

| Token      | Hex       | Usage                        |
|------------|-----------|------------------------------|
| `primary`  | `#0CC8A8` | CTAs, active states, progress |
| `critical` | `#EF4444` | Critical severity            |
| `high`     | `#F97316` | High severity                |
| `medium`   | `#EAB308` | Medium severity              |
| `low`      | `#22C55E` | Low severity / completed     |


## Contact

If you have any questions or feedback, feel free to reach out:
Author: Pawan Meena
Email: pawanjorwal0903@gmail.com
LinkedIn: https://www.linkedin.com/in/pawanmeena-tech/

---

