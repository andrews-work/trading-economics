const te = require('tradingeconomics');

// Log in to Trading Economics API
te.login('7660885bec7649e:ie7qwfa4evrpc7t');

// Function to fetch calendar data for a specific country
const getCalendarDataForCountry = (country) => {
    return te.getCalendar()
        .then(data => {
            const sanitizedCountry = country.replace(/-/g, ' ').toLowerCase();  // Convert dashes to spaces for URL consistency
            const filteredData = data.filter(event => {
                const eventCountry = event.Country ? event.Country.toLowerCase() : ''; // Safeguard for undefined Country
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
