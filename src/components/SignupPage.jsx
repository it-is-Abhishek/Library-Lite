import { useState } from 'react';
import { authAPI } from '../api/auth';
import './Auth.css';

function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate full name
        if (!fullName.trim()) {
            setError('Full name is required');
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const result = await authAPI.signup(email, password, fullName, confirmPassword);
            console.log('Signup successful:', result);
            // Redirect or update app state here
            alert('Signup successful! Please check your email to verify your account.');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={
                            confirmPassword && password
                                ? password === confirmPassword
                                    ? 'password-match'
                                    : 'password-mismatch'
                                : ''
                        }
                        required
                        minLength={6}
                    />
                    {confirmPassword && password && (
                        <div className={`password-hint ${password === confirmPassword ? 'match' : 'mismatch'}`}>
                            {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                        </div>
                    )}
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}

export default Signup;
