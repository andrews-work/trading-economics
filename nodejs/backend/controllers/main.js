
const apiService = require('../services/api');

const getGdpDataOnce = async () => {
    return await apiService.getGDPData();
};

const getCalendarData = async() => {
    return await apiService.getCalendarData();
};

const getMarketData = async() => {
    return await apiService.getMarketData();
};

const getForecastData = async() => {
    return await apiService.getForecastData();
};

const homePage = async (req, res) => {
    try {
        console.log('Fetching data for countries...');
        
        // Fetch countries, GDP data, and calendar data
        const countries = await apiService.getCountryNames();
        const gdpData = await getGdpDataOnce();
        const calendarData = await getCalendarData();

        // Log the countries to verify they were fetched correctly
        console.log('Fetched Countries:', countries);
        console.log('Fetched GDP Data:', gdpData);
        console.log('Fetched Calendar Data:', calendarData);

        // Render the homepage with the fetched data
        res.render('index', { 
            countries, 
            gdpData, 
            calendarData
        });
    } catch (error) {
        console.error('Error fetching country data:', error);
        res.status(500).send('Error fetching country data for homepage');
    }
};

// New controller method to handle country-specific pages
const countryPage = async (req, res) => {
    try {
        const countryName = req.params.name; 
        const countryData = await apiService.getCountryData(countryName);
        const gdpData = await getGdpDataOnce();
        const calendarData = await getCalendarData();
        const marketData = await getMarketData();
        const forecastData = await getForecastData();

        // Filter calendar data for the specific country
        const countryCalendarEvents = calendarData.filter(event => event.Country.toLowerCase() === countryName.toLowerCase());

        // Pass data to view
        res.render('country', { 
            country: countryName, 
            data: countryData, 
            gdpData, 
            marketData,
            forecastData, 
            calendarData: countryCalendarEvents,
        });
        console.log("Market Data:", marketData);
    } catch (error) {
        console.error('Error fetching country data:', error);
        res.status(500).send('Error fetching data for country');
    }
};


// Compare page route
const comparePage = async (req, res) => {
    try {
        // Fetch country names dynamically
        const countries = await apiService.getCountryNames();
        const gdpData = await getGdpDataOnce();
        const calendarData = await getCalendarData();
        const marketData = await getMarketData();
        const forecastData = await getForecastData();

        // Get selected countries from the query parameters
        const { country1, country2 } = req.query;

        // Log the selected countries and all available countries
        console.log('Selected Country 1:', country1);
        console.log('Selected Country 2:', country2);
        console.log('Available Countries:', countries);

        // Filter the GDP data to only include the selected countries
        const filteredGdpData = gdpData.filter(data => 
            data.country === country1 || data.country === country2
        );

        // Filter calendar data for each country and structure it by country name
        const calendarDataByCountry = {};

        calendarData.forEach(event => {
            const country = event.Country.toLowerCase();
            if (country === country1.toLowerCase() || country === country2.toLowerCase()) {
                if (!calendarDataByCountry[country]) {
                    calendarDataByCountry[country] = [];
                }
                calendarDataByCountry[country].push(event);
            }
        });

        // Filter market data
        const filteredMarketData = marketData.filter(data => 
            data.country === country1 || data.country === country2
        );

        // Filter forecast data
        const filteredForecastData = forecastData.filter(data => 
            data.country === country1 || data.country === country2
        );

        // Pass the filtered data to the view
        res.render('compare', { 
            countries, 
            country1, 
            country2, 
            gdpData: filteredGdpData, 
            calendarData: calendarDataByCountry,
            marketData: filteredMarketData,
            forecastData: filteredForecastData
        });
    } catch (error) {
        console.error('Error fetching countries for comparison:', error);
        res.status(500).send('Error fetching countries for comparison');
    }
};


module.exports = {
    homePage,
    countryPage,
    comparePage
};
