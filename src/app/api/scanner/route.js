// Import necessary modules
const express = require('express');
const router = express.Router();

// Define the route for the QR code scanner page
router.get('/scanner', (req, res) => {
    res.render('scanner'); // Assuming you're using a template engine like EJS
});

module.exports = router;

