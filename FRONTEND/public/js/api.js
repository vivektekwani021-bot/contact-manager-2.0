// public/js/api.js

const API_URL = 'http://localhost:5000/api';

function getToken() {
    return localStorage.getItem('token');
}

/**
 * Handles authenticated API calls to your protected routes.
 * Automatically adds the Bearer token and handles 401/403 errors.
 */
async function authenticatedFetch(endpoint, options = {}) {
    const token = getToken();

    // If no token, redirect to login (handles the 401 UNAUTHORIZED case)
    if (!token && endpoint.startsWith('/contacts')) {
        window.location.href = '/login';
        throw new Error('Authentication required for protected resource.');
    }

    const headers = {
        'Content-Type': 'application/json',
        // CRITICAL: Attaching the Bearer Token for validation
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

    // Check 2: If the token is invalid or expired (401/403 from backend)
    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Session expired or unauthorized.');
    }

    if (!response.ok) {
        // Attempt to parse the detailed error message
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    return response.json();
}