
import { Link } from "react-router-dom"


function LandingPage() {
    return (
        <div className="landing-page">
            {/* Header */}
            <header className="header-landing">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <div className="logo-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                                </svg>
                            </div>
                            <span className="logo-text" >NEXTALK</span>
                        </div>
                        <div className="header-buttons">
                            <Link to={"/login"} className="btn btn-outline">Login</Link>
                            <Link to={"/register"} className="btn btn-primary">Register</Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <div className="container">
                    <div className="hero-section">
                        <div className="hero-content">
                            <h1 className="hero-title">Connect with Anyone, Anywhere</h1>
                            <p className="hero-description">
                                Experience seamless video conferencing with crystal-clear HD quality, real-time messaging, and advanced
                                screen sharing capabilities. Join millions of users who trust NEXTALK for their communication
                                needs.
                            </p>
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
                            <div className="hero-actions">
                                <Link to={"/register"} className="btn btn-large btn-primary">Get Started Free</Link>
                                <Link to={"/features"} className="btn btn-large btn-outline">Learn More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default LandingPage
