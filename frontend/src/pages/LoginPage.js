import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate('/tasks');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 id="login-text">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                <div className="additional-links">
                    <p>Don't have an account? <a href="/register">Sign Up</a></p>
                    <button className="google-login" type='submit'>Login with Google</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
