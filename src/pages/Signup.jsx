import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/ui/FormElements';
import { Loader, useToast } from '../context/ToastContext';
import './Auth.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        try {
            await signup(name, email, password);
            addToast('Account created successfully!', 'success');
            navigate('/');
        } catch (err) {
            setError(err || 'Failed to create account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container" data-test="register-page">
            <div className="auth-card fade-in">
                <h2 className="auth-title" data-test="page-title">Create Account</h2>
                <p className="auth-subtitle">Join us to find your perfect toy</p>

                {error && <div className="auth-error" data-test="register-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <Input
                        label="Full Name"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        data-test="name-input"
                        required
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        data-test="email-input"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        data-test="password-input"
                        required
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        data-test="confirm-password-input"
                        required
                    />

                    <Button type="submit" disabled={isLoading} data-test="register-button">
                        {isLoading ? <Loader dataTest="register-loader" /> : 'Sign Up'}
                    </Button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login" className="auth-link" data-test="login-link">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
