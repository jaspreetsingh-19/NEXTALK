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
## 📁 Project Structure

```text
nextalk/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── VideoMeet.jsx
│   └── .env.example
├── .gitignore
```
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
```
---

### 5. Install Frontend Dependencies
```bash

cd ../frontend
npm install
```
---

### 6. Run the Frontend Server
```bash
npm run dev
```
Visit: http://localhost:5173

---


---

### 🔒 Security
Uses HTTP-only cookies for storing JWT securely  
CORS setup for cross-origin requests between frontend and backend

---

### 🧠 Learning Goals
Deep understanding of WebRTC and real-time communication  
Efficient use of Socket.IO for peer connection signaling

---

### 🙌 Contributing
Contributors are welcome! Feel free to submit issues or pull requests.

---

### 📄 License
This project is licensed under the MIT License.

---

### 📧 Contact  
Built by Jaspreet Singh  
📧 Email: [jaspreetsingh7192006@gmail.com](mailto:jaspreetsingh7192006@gmail.com)

