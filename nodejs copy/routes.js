const express = require('express');
const path = require('path');
const api = require('./api');
const router = express.Router();

// Dynamic route for any country (e.g., /mexico)
router.get('/:country', async (req, res) => {
    const country = req.params.country.toLowerCase(); 
    console.log(`Fetching data for: ${country}`);

    try {
        // Fetch calendar data for the specific country
        const calendarData = await api.getCalendarDataForCountry(country);

        // Render data
        res.render('country', {
            country: country.charAt(0).toUpperCase() + country.slice(1),
            data: calendarData, 
        });
    } catch (err) {
        console.error(`Error fetching data for ${country}:`, err);
        res.status(500).json({ error: `Error fetching data for ${country}` });
    }
});

module.exports = router;
