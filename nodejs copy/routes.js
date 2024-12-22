const express = require('express');
const path = require('path');
const api = require('./api');  // Import the API functions
const router = express.Router();

// Dynamic route for any country (e.g., /mexico)
router.get('/:country', async (req, res) => {
    const country = req.params.country.toLowerCase();  // Get country from the URL
    console.log(`Fetching data for: ${country}`);  // Log the country

    try {
        // Fetch calendar data for the specific country
        const calendarData = await api.getCalendarDataForCountry(country);

        // Render the EJS template with dynamic data
        res.render('country', {
            country: country.charAt(0).toUpperCase() + country.slice(1),  // Capitalize the first letter of the country
            data: calendarData,  // Inject calendar data into the page
        });
    } catch (err) {
        console.error(`Error fetching data for ${country}:`, err);
        res.status(500).json({ error: `Error fetching data for ${country}` });
    }
});

module.exports = router;
