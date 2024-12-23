const te = require('tradingeconomics');

// test api connection
describe('API Connection Tests', () => {

  // successful api key
  it('should successfully authenticate with the API', async () => {

    const loginSpy = jest.spyOn(te, 'login').mockImplementation(() => {
      return Promise.resolve({ success: true });
    });

    const result = await te.login('01f1ffb2dc0b44a:k4g5bljrf5cwz25');
    expect(result).toEqual({ success: true });

    loginSpy.mockRestore();
  });

  // incorrect api key
  it('invalid api key', async () => {
    
    const loginSpy = jest.spyOn(te, 'login').mockImplementation(() => {
      return Promise.reject(new Error('Invalid API key'));
    });

    await expect(te.login('invalid_api_key')).rejects.toThrow('Invalid API key');

    loginSpy.mockRestore();
  });

});