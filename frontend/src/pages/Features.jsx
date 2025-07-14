

import { Link, useNavigate } from "react-router-dom"
import "../Features.css"



function Features() {
  let nav = useNavigate()

  function handleClick() {
    nav("/")
  }
  return (
    <div className="features-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                </svg>
              </div>
              <span className="logo-text" onClick={handleClick}>NEXTALK</span>
            </div>
            <div className="header-buttons">
              <button className="btn btn-outline">Login</button>
              <button className="btn btn-primary">Register</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Powerful Features for Seamless Communication</h1>
            <p className="hero-description">
              Discover all the tools you need to connect, collaborate, and communicate effectively with NEXTALK's
              comprehensive feature set.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="main-features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card large">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                </svg>
              </div>
              <div className="feature-content">
                <h3>Crystal Clear HD Video</h3>
                <p>
                  Experience stunning 1080p HD video quality with adaptive streaming that adjusts to your connection.
                </p>
                <ul className="feature-specs">
                  <li>Up to 1080p resolution</li>
                  <li>Adaptive bitrate streaming</li>
                  <li>Low latency optimization</li>
                  <li>Auto quality adjustment</li>
                </ul>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="feature-content">
                <h3>Advanced Audio</h3>
                <p>Professional-grade audio with noise cancellation and echo reduction.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5z" />
                </svg>
              </div>
              <div className="feature-content">
                <h3>Screen Sharing</h3>
                <p>Share your entire screen or specific applications with one click.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </svg>
              </div>
              <div className="feature-content">
                <h3>Real-time Chat</h3>
                <p>Send messages, files, and emojis during your video calls.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                </svg>
              </div>
              <div className="feature-content">
                <h3>Easy Sharing</h3>
                <p>Invite participants with a simple link or meeting ID.</p>
              </div>
            </div>


          </div>
        </div>
      </section>


      {/* Platform Support */}
      <section className="platform-section">
        <div className="container">
          <div className="section-header">
            <h2>Works Everywhere You Do</h2>
            <p>Access NEXTALK from any device, anywhere</p>
          </div>
          <div className="platform-grid">
            <div className="platform-card">
              <div className="platform-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20,18C20.5,18 21,17.5 21,17V7C21,6.5 20.5,6 20,6H4C3.5,6 3,6.5 3,7V17C3,17.5 3.5,18 4,18H12V19H8V20H16V19H12V18H20M5,8H19V16H5V8Z" />
                </svg>
              </div>
              <h3>Desktop Apps</h3>
              <p>Native apps for Windows, macOS, and Linux</p>
            </div>

            <div className="platform-card">
              <div className="platform-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
              </div>
              <h3>Web Browser</h3>
              <p>No downloads needed - works in any modern browser</p>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience NEXTALK?</h2>
            <p>Join thousands of teams already using NEXTALK for their communication needs</p>
            <div className="cta-buttons">
              <Link to={"/register"} className="btn btn-large btn-primary">Ready to Interact</Link>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features
