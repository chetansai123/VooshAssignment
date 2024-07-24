import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/TopBar.css';
import logo from "../assets/logo.png";

const TopBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="top-bar">
            <div className="logo" onClick={() => navigate('/')}>
                <img src={logo} alt="Logo" className="logo-icon" />
            </div>
            <div className="auth-buttons">
                {token ? (
                    <button className="auth-button" onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        {location.pathname !== '/login' && (
                            <button className="auth-button" onClick={() => navigate('/login')}>Login</button>
                        )}
                        {location.pathname !== '/register' && (
                            <button className="auth-button" onClick={() => navigate('/register')}>Sign Up</button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TopBar;
