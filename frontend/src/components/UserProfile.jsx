import { useState, useEffect } from 'react';
import { authAPI } from '../api/auth';
import './UserProfile.css';

// Example: Display user profile with database information
function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const data = await authAPI.getCurrentUser();
            setUser(data.user);
        } catch (error) {
            console.error('Error loading user:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (!user) return <div className="not-logged-in">Not logged in</div>;

    return (
        <div className="user-profile">
            <h2>User Profile</h2>

            {/* Auth Information */}
            <div className="auth-info">
                <h3>Authentication Info</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Auth ID:</strong> {user.id}</p>
            </div>

            {/* Database Information */}
            {user.dbUser && (
                <div className="db-info">
                    <h3>Database Info</h3>
                    <p><strong>Name:</strong> {user.dbUser.name}</p>
                    <p><strong>Full Name:</strong> {user.dbUser.fullName}</p>
                    <p><strong>Membership:</strong> {user.dbUser.membership}</p>
                    <p><strong>Member Since:</strong> {new Date(user.dbUser.createdAt).toLocaleDateString()}</p>

                    {/* Borrowing History */}
                    {user.dbUser.borrowings && user.dbUser.borrowings.length > 0 && (
                        <div className="borrowings">
                            <h4>Borrowing History</h4>
                            <ul>
                                {user.dbUser.borrowings.map(borrow => (
                                    <li key={borrow.id}>
                                        <strong>{borrow.book.title}</strong> by {borrow.book.author.name}
                                        <br />
                                        Status: {borrow.status}
                                        <br />
                                        Due: {new Date(borrow.dueDate).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserProfile;
