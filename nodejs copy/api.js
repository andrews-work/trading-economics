const te = require('tradingeconomics');

// Log in to Trading Economics API
te.login('01f1ffb2dc0b44a:k4g5bljrf5cwz25');

// Function to fetch calendar data for a specific country
const getCalendarDataForCountry = (country) => {
    return te.getCalendar()
        .then(data => {
            const sanitizedCountry = country.replace(/-/g, ' ').toLowerCase();
            const filteredData = data.filter(event => {
                const eventCountry = event.Country ? event.Country.toLowerCase() : ''; 
                return eventCountry === sanitizedCountry;
            });
            return filteredData;
        })
        .catch(err => {
            console.error('Error fetching data for', country, err);
            throw new Error('Could not fetch calendar data');
        });
};

module.exports = {
    getCalendarDataForCountry,
};
