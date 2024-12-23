const te = require('tradingeconomics');
const { getCountryData, getCountryNames } = require('../backend/services/api.js');

describe('api - country data', () => {

    let getMarketSnapSpy;
    let countryNames;

    // country data from api
    beforeAll(async () => {
        // Fetch country names
        countryNames = await getCountryNames();

        // Mock getMarketSnap
     
    });

    // restore
    afterAll(() => {
        getMarketSnapSpy.mockRestore();
    });

    // country data


});
