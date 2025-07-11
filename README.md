# 🎥 NEXTALK – Video Conferencing App

**NEXTALK** is a full-stack video conferencing web application built using the **MERN stack**, **WebRTC**, and **Socket.IO**. It allows users to register, log in, create or join meetings, toggle video/audio, share their screen, and interact in real-time.

---

## 🌐 Tech Stack

- **Frontend**: React, CSS, FontAwesome, WebRTC, Socket.IO-client  
- **Backend**: Node.js, Express.js, Socket.IO  
- **Database**: MongoDB  
- **Authentication**: JWT with HTTP-only cookies  

---

## 🚀 Features

- 👤 User Registration & Login (Secure JWT Authentication)
- 📹 Real-Time Video & Audio Communication
- 🔊 Mute/Unmute Audio & Toggle Video
- 🖥️ Screen Sharing Functionality
- 🔐 Lobby with Display Name Input Before Joining Meeting
- 👥 Dynamic Participant List
- 🔗 Create and Join Meeting by ID
- 🚪 End Call Button
- 🌙 Modern UI with Dark Theme and FontAwesome Icons

---

## 📸 UI Preview

> Coming soon – screenshots or a short demo GIF!

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/jaspreetsingh-19/NEXTALK.git
cd NEXTALK
```
---

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```
---


### 3. Setup Environment Variables
Create a .env file inside backend/:
```bash
env

MONGO_URI=your_mongodb_connection_string
PORT=8000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
VITE_API_URL=http://localhost:8000
```
---

### 4. Run the Backend Server
```bash
npm run dev
5. Install Frontend Dependencies
bash
Copy
Edit
cd ../frontend
npm install
6. Run the Frontend Server
bash
Copy
Edit
npm run dev
Visit: http://localhost:5173

📂 Folder Structure
pgsql
Copy
Edit
NEXTALK/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   └── VideoMeet.jsx
└── README.md
🔒 Security
Uses HTTP-only cookies for storing JWT securely

CORS setup for cross-origin requests between frontend and backend

🧠 Learning Goals
Deep understanding of WebRTC and real-time communication

Efficient use of Socket.IO for peer connection signaling

State management in React for dynamic UIs

🙌 Contributing
Contributions are welcome! Feel free to submit issues or pull requests.

📄 License
This project is licensed under the MIT License.

📧 Contact
Built with ❤️ by Jaspreet Singh

yaml
Copy
Edit

---

Let me know if you want to:

- Add screenshots or a demo link
- Add contribution guidelines or deployment steps (e.g., Netlify/Vercel)
- Include badges (GitHub stars, forks, etc.) or a changelog

Would you like me to create a `LICENSE` file or generate a GIF preview as well?
