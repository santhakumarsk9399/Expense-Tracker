# 💰 Expense Tracker App

A modern **Expense Tracker Web Application** built using React.js and Node.js to manage daily expenses efficiently with insightful analytics and a clean UI.

---

## 🚀 Features

- ➕ Add, edit, delete expenses
- 📊 Visual charts (Recharts)
- 📅 Filter expenses by date
- 💾 Persistent data using backend API
- 🔐 User-based expense tracking
- 📈 AI Insights (optional feature if added)
- 📱 Responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Bootstrap / CSS
- Recharts (for charts)
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB

---

## 📂 Project Structure
│
├── client/ # React Frontend
├── server/ # Node Backend
├── screenshots/ # App Screenshots
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/santhakumarsk9399/Expense-Tracker.git/


### 2️⃣ Setup Backend
cd server
npm install
npm start

### 3️⃣ Setup Frontend
cd client
npm install
npm run dev


---

## 🔑 Environment Variables

Create a `.env` file in both frontend & backend:

### Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_connection

### Frontend (.env)

VITE_API_URL=http://localhost:5000
