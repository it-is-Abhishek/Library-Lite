// API configuration
const API_BASE_URL = import.meta.env.API_BASE_URL;

// Auth API functions
export const authAPI = {
  // Signup
  signup: async (email, password, fullName, confirmPassword = null) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        password, 
        fullName,
        ...(confirmPassword && { confirmPassword })
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    // Store session token and user data
    if (data.session) {
      localStorage.setItem('access_token', data.session.access_token);
      localStorage.setItem('refresh_token', data.session.refresh_token);
    }
    
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  },    // Login
    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        // Store session token and user data
        if (data.session) {
            localStorage.setItem('access_token', data.session.access_token);
            localStorage.setItem('refresh_token', data.session.refresh_token);
        }
        
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return data;
    },

  // Logout
  logout: async () => {
    const token = localStorage.getItem('access_token');

    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    const data = await response.json();
    return data;
  },
  // Get current user
    getCurrentUser: async () => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${API_BASE_URL}/auth/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to get user');
        }

        // Update stored user data
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return data;
    },

    // Get stored user from localStorage
    getStoredUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('access_token');
    },
};
