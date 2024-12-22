const te = require('tradingeconomics');

// login 
te.login('01f1ffb2dc0b44a:k4g5bljrf5cwz25');

// country names
async function getCountryNames() {
    try {
        const data = await te.getMarketSnap(country = ['mexico', 'sweden', 'thailand', 'new zealand']);
        const countries = data.map(item => item.Country);
        const filteredCountries = countries.filter(country => 
            !country.toLowerCase().includes('free accounts') && 
            typeof country === 'string' && country.trim() !== ''
        );
        const uniqueCountries = [...new Set(filteredCountries)];
        return uniqueCountries;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Fetch specific data for a country
async function getCountryData(countryName) {
    try {
        const data = await te.getMarketSnap(country = [countryName]);
        return data[0];
    } catch (error) {
        console.error('Error fetching country data:', error);
        throw error;
    }
}

// gdp 
async function getGDPData() {
    try {
        const data = await te.getIndicatorData(indicator = 'gdp');
        const processedData = data.map(item => ({
            country: item.Country,
            category: item.Category,
            latestValue: item.LatestValue
        }));
        return processedData;
    } catch (error) {
        console.error('Error fetching GDP data:', error);
        throw error;
    }
}

// calendar events
async function getCalendarData() {
    try {
        const data = await te.getCalendar();
        const limitedData = data.slice(0, 5); 
        return limitedData;
    } catch (error) {
        console.error('Error fetching calendar data:', error);
        throw error;
    }
}

// market data
async function getMarketData() {
    try {
        const data = await te.getMarketSnap(country = ['sweden', 'mexico', 'thailand', 'new zealand']);
        const limitedData = data.slice(0, 5); 
        return limitedData;
    } catch (error) {
        console.error('Error fetching market data:', error);
        throw error;
    }
}

async function getForecastData() {
    try {
        const data = await te.getMarketsForecast(category = 'index').then(function(data){
            console.log('forecaast', data)     
        });
        return data;
    } catch (error) {
        console.error('Error getting forecast', error);
        throw error;
    }
}

// export
module.exports = {
    getCountryNames,
    getCountryData,
    getGDPData,
    getCalendarData,
    getMarketData,
    getForecastData
};

