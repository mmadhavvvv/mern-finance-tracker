# 💰 WealthWave - Pro MERN Finance Tracker

A professional, full-stack wealth management dashboard designed for modern financial tracking. Built with the MERN stack (MongoDB, Express, React, Node.js), featuring secure authentication, real-time analytics, and a premium glassmorphic UI.

## 🚀 Live Demo
[Add your Live Link here after deployment]

## ✨ Key Features
-   🔐 **Secure Authentication**: JWT-based login and registration with password hashing.
-   📊 **Interactive Dashboard**: Visual spending analytics using Recharts (Area charts).
-   📱 **Full-Screen Premium UI**: Responsive design with a modern dark-mode aesthetic.
-   💸 **Transaction Management**: Easily add and track income and expenses.
-   🔒 **Protected Routes**: User-specific data isolation ensuring your privacy.
-   ⚡ **Fast & Lightweight**: Built with Vite for an ultra-smooth performance.

## 🛠️ Tech Stack
-   **Frontend**: React.js, React Router, Context API, Axios, Recharts, Lucide Icons.
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB Atlas (Mongoose).
-   **Authentication**: JSON Web Tokens (JWT), Bcrypt.js.
-   **Styling**: Vanilla CSS (Premium Custom Styles).

## ⚙️ Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/mmadhavvvv/mern-finance-tracker.git
cd mern-finance-tracker
```

### 2. Configure Backend
Go to the `server` directory and create a `.env` file:
```bash
cd server
npm install
```
Add the following to `.env`:
```text
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3. Configure Frontend
Go to the `client` directory:
```bash
cd ../client
npm install
```

### 4. Run the Application
From the **root directory**, run:
```bash
npm start
```

## 📄 License
MIT License - feel free to use this for your own projects!

---

*Developed with ❤️ as a portfolio project.*
