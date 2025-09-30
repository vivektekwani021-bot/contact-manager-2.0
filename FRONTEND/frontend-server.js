// frontend-server.js

const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// --- 1. EJS Setup ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- 2. Static Files Setup ---
// This serves files from the /public folder (e.g., /js/api.js)
app.use(express.static(path.join(__dirname, 'public')));


// --- 3. Frontend Routes ---

// Default route redirects to Login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Registration Page (Public)
app.get('/register', (req, res) => {
    res.render('register', { error: null }); 
});

// Login Page (Public)
app.get('/login', (req, res) => {
    res.render('login');
});

// Contacts Page (Protected on Client-Side)
app.get('/contacts', (req, res) => {
    // Client-side JS (api.js) handles token check and redirection
    res.render('contacts'); 
});


// --- 4. Start Server ---
app.listen(PORT, () => {
    console.log(`Frontend server running on http://localhost:${PORT}`);
    console.log(`(Make sure your backend is running on port 5000!)`);
});