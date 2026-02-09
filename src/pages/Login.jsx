import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/ui/FormElements';
import { Loader } from '../context/ToastContext';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!email || !password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err || 'Failed to login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container" data-test="login-page">
            <div className="auth-card fade-in">
                <h2 className="auth-title" data-test="page-title">Welcome Back</h2>
                <p className="auth-subtitle">Login to access your account</p>

                {error && <div className="auth-error" data-test="login-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <Input
                        label="Email Address"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        data-test="email-input"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password123"
                        data-test="password-input"
                        required
                    />

                    <Button type="submit" disabled={isLoading} data-test="login-button">
                        {isLoading ? <Loader dataTest="login-loader" /> : 'Login'}
                    </Button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/register" className="auth-link" data-test="register-link">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
