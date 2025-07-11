import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';


const RegisterPage = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault();

        login(username, password)
        console.log("login")
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Login Into Account</h2>
                <form onSubmit={handleSubmit} className="register-form">

                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                            placeholder="Enter your Username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="Enter your password password"
                            required
                        />
                    </div>

                    <button type="submit" className="register-button">
                        Login
                    </button>
                </form>

                <div className="register-footer">
                    <p>Do Not Have a Account? <Link to={"/register"} className="login-link">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
