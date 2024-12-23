const te = require('tradingeconomics');
const { getCountryNames } = require('../backend/services/api.js');

// country names
describe('api - country names', () => {
    let getMarketSnapSpy;

    // get countries from api
    beforeAll(() => {   

        getMarketSnapSpy = jest.spyOn(te, 'getMarketSnap').mockImplementation(() => {
            return Promise.resolve([
                { Country: 'Mexico' },
                { Country: 'Sweden' },
                { Country: 'Thailand' },
                { Country: 'New Zealand' },
            ]);
        });

    });

    // restore
    afterAll(() => {
        getMarketSnapSpy.mockRestore();
    });



    // country names
    it('get api country names', async () => {
      
        // expect these countries
        const countries = await getCountryNames();
        expect(countries).toEqual(['Mexico', 'Sweden', 'Thailand', 'New Zealand']);
    });

    // handle errors
    it('should handle errors when fetching country names', async () => {

        // Suppress console.error output
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // simulate error
        getMarketSnapSpy.mockImplementation(() => {
            return Promise.reject(new Error('API error'));
        });

        // expect error
        await expect(getCountryNames()).rejects.toThrow('API error');

        // restore
        consoleErrorSpy.mockRestore();
    });

    // filter out invalid countries
    it('should filter out invalid country names', async () => {

        // simulate api data fetch with invalid countries
        getMarketSnapSpy.mockImplementation(() => {
            return Promise.resolve([
                { Country: 'Mexico' },
                { Country: 'Sweden' },
                { Country: 'Thailand' },
                { Country: 'New Zealand' },
                { Country: '  ' },
                { Country: null },
            ]);
        });

        // expect valid countries
        const countries = await getCountryNames();
        expect(countries).toEqual(['Mexico', 'Sweden', 'Thailand', 'New Zealand']);
    });

});
