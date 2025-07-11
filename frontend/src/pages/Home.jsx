import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import "../home.css"
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from "axios"
export default function HomePage() {

    const { logout } = useAuth()
    const nav = useNavigate()
    const [meetingId, setMeetingId] = useState("")


    function handleLogout() {
        logout()
        console.log("logged out")
    }


    async function handleCreateMeeting() {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/meetings/create",
                {},
                { withCredentials: true }
            );

            const meetingId = response.data.meetingId;
            toast.success("Meeting created");
            nav(`/meeting/${meetingId}`);
        } catch (e) {
            console.log("Error creating meeting:", e);
            toast.error("Failed to create meeting");
        }
    }



    async function handleJoinMeeting() {
        if (!meetingId) {
            return toast.error("Enter the meeting ID");
        }

        try {
            const response = await axios.get(
                `http://localhost:8000/api/meetings/${meetingId}`,
                { withCredentials: true }
            );

            nav(`/meeting/${meetingId}`);
        } catch (e) {
            console.error("Join meeting error:", e);
            toast.error("Failed to join meeting");
        }
    }

    return (
        <div className="app">
            {/* Header */}
            <header className="headerH">
                <div className="header-content">
                    <div className="header-left">
                        <div className="logo-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                            </svg>
                        </div>
                        <h1 className="logo-text">NEXTALK</h1>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </header>

            {/* Main Content */}
            <main className="main">
                <div className="welcome-section">
                    <h2 className="welcome-title">Welcome to NEXTALK</h2>
                    <p className="welcome-subtitle">
                        Connect with your team through secure, high-quality video meetings from anywhere in the world
                    </p>
                </div>

                {/* Join Meeting Section */}
                <div className="meeting-box-container">
                    {/* Join Meeting Box */}
                    <div className="join-meeting-card">
                        <div className="card-header">
                            <h3 className="card-title">Join a Meeting</h3>
                            <p className="card-subtitle">Enter your meeting details below</p>
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="meetingId" className="form-label">
                                    Meeting ID
                                </label>
                                <input type="text" id="meetingId" placeholder="Enter the meeting Id" className="form-input" value={meetingId} onChange={e => setMeetingId(e.target.value)} />
                            </div>
                            <button className="join-btn" onClick={handleJoinMeeting}>Join Meeting</button>
                        </div>
                    </div>

                    {/* Create Meeting Box */}
                    <div className="join-meeting-card">
                        <div className="card-header">
                            <h3 className="card-title">Create a Meeting</h3>
                            <p className="card-subtitle">Generate a new meeting link instantly</p>
                        </div>

                        <div>

                            <button className="join-btn" onClick={handleCreateMeeting}>Create Meeting</button>
                        </div>
                    </div>
                </div>


                <div className="hero-features">
                    <div className="feature">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                            </svg>
                        </div>
                        <div className="feature-text">
                            <h3>HD Video Calls</h3>
                            <p>Crystal clear video quality with adaptive streaming</p>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                            </svg>
                        </div>
                        <div className="feature-text">
                            <h3>Real-time Chat</h3>
                            <p>Instant messaging during your video conferences</p>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5z" />
                            </svg>
                        </div>
                        <div className="feature-text">
                            <h3>Screen Sharing</h3>
                            <p>Share your screen for presentations and collaboration</p>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <div className="feature-text">
                            <h3>Secure & Private</h3>
                            <p>End-to-end encryption for all your conversations</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
