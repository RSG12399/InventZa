import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { } from "firebase/auth";
import { AuthContext, AuthProvider } from '../Backend-main/AuthContext';
import GlobalLoaderBoundary, {} from "../Backend-main/GlobalLoaderBoundary";
// The use of 'Link' is simulated as it typically comes from 'react-router-dom'.

// --- STYLESHEET (Pure CSS) ---
const loginStyles = `
    /* Use Inter font for a modern look */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
    
    * {
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    }

    /* Outer Container: Dark, atmospheric background */
    .app-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100%;
        background: #0a192f; /* Deep Navy/Teal Background (Like the screenshot) */
        color: #e6f1ff; /* Light text for high contrast */
        padding: 20px;
    }

    /* Login Card */
    .card {
        background: #172a45; /* Slightly lighter inner background */
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        max-width: 400px;
        width: 100%;
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
    }
    
    .card:hover {
        transform: translateY(-8px) scale(1.02) rotateX(2deg) skewY(-0.5deg);
        box-shadow: 0 20px 50px rgba(100, 255, 218, 0.15), 0 0 40px rgba(100, 255, 218, 0.08);
    }

    /* Title */
    .title {
        font-size: 2em;
        font-weight: 700;
        margin-bottom: 30px;
        color: #64ffda; /* Bright accent color for the title */
        text-align: center;
    }

    /* Form Group (for Email/Password inputs) */
    form div {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #ccd6f6;
    }

    input {
        width: 100%;
        padding: 12px;
        border: 1px solid #303c55;
        border-radius: 6px;
        background: #0d2138;
        color: #e6f1ff;
        font-size: 1em;
        transition: border-color 0.3s, box-shadow 0.3s;
    }

    input:focus {
        border-color: #64ffda; /* Accent color on focus */
        outline: none;
        box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.3);
    }

    /* Primary Login Button */
    .login-btn {
        width: 100%;
        padding: 12px;
        margin-top: 10px;
        border: none;
        border-radius: 6px;
        background: #64ffda; /* Vibrant accent color */
        color: #0a192f;
        font-size: 1.05em;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s, transform 0.1s;
    }

    .login-btn:hover {
        background: linear-gradient(90deg, #f0c51aff, #76ffda);
        transition: background 0.5s;
        transform: ;
    }
    
    /* Divider */
    .divider {
        border: 0;
        height: 1px;
        background: #303c55;
        margin: 30px 0;
    }

    /* Google Login Button */
    .google-login-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccd6f6;
        border-radius: 6px;
        background: none;
        color: #ccd6f6;
        font-size: 1em;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.3s, border-color 0.3s;
    }
    
    .google-login-btn img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    .google-login-btn:hover {
        background: rgba(100, 255, 218, 0.1);
        border-color: #64ffda;
    }

    /* Sign Up Link */
    .signup-link {
        text-align: center;
        margin-top: 25px;
        font-size: 0.9em;
        color: #ccd6f6;
    }
    
    /* Styling for the Link component (simulated) */
    .signup-link a {
        color: #64ffda;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s;
    }
    
    .signup-link a:hover {
        color: #99fddf;
        text-decoration: underline;
    }
`;


// --- REACT COMPONENT ---

// Mock Link component for demonstration (in a real app, this would be imported)
const Link = ({ to, children }) => <a href={to} style={{color: 'inherit'}}>{children}</a>;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logInWithGoogle, login } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Login | InventZa";
    }, []);

    return (
        <>
            <style>{loginStyles}</style>

            <div className="app-container">
                <div className="card">
                    <h2 className="title">Login</h2>
                    <form onSubmit={login}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="login-btn">
                            Login
                        </button>
                    </form>

                    <hr className="divider" />

                    <button onClick={logInWithGoogle} className="google-login-btn">
                        <img 
                            src="https://img.icons8.com/color/16/000000/google-logo.png" 
                            alt="Google Logo" 
                            style={{ width: '20px', height: '20px', marginRight: '10px' }}
                        />
                        Login with Google
                    </button>

                    <p className="signup-link">
                        Don't have an account? <Link to="/Signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;