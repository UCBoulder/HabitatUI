import axios from 'axios';
import { getLocationPins, sendLocationPin } from '../../utils/APICalls';

// Mocking Axios
jest.mock('axios');

// Mocking console.error
console.error = jest.fn();

// Spy on console.log
const originalConsoleLog = console.log;
jest.spyOn(console, 'log').mockImplementation(() => {});

// Test getLocationPins
describe('getLocationPins', () => {
  it('fetches successfully data from an API', async () => {
    const mockData = { /* Mock your data here */ };
    axios.get.mockResolvedValueOnce({ data: mockData });

    // Call the function
    const result = await getLocationPins();

    // Expectations
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('http://192.168.56.1:3000/locTest');
  });

  it('handles errors when fetching data from an API', async () => {
    const errorMessage = 'Error fetching API data';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    // Call the function
    const result = await getLocationPins();

    // Expectations
    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith('Error fetching API data: ', new Error(errorMessage));
  });
});

// Test sendLocationPin
describe('sendLocationPin', () => {
  it('sends data to the backend successfully', async () => {
    const mockPosition = { coords: { latitude: 123, longitude: 456, accuracy: 7 } };
    const mockText = 'Test notes';
    const mockObservation = {
      Notes: 'Test notes',
      VerificationRating: 1,
      coords: {
        accuracy: 7,
        latitude: 123,
        longitude: 456,
      },
      timestamp: undefined,
    };

    axios.post.mockResolvedValueOnce({ data: mockObservation });

    // Call the function
    await sendLocationPin(mockPosition, mockText);

    // Expectations
    expect(axios.post).toHaveBeenCalledWith('http://192.168.56.1:3000/observations', mockObservation);
  });

  it('handles errors when sending data to the backend', async () => {
    const mockPosition = { coords: { latitude: 123, longitude: 456, accuracy: 7 } };
    const mockText = 'Test notes';
    const errorMessage = 'Error sending data to backend';
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    // Call the function
    const result = await sendLocationPin(mockPosition, mockText);

    // Expectations
    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith('Error sending data to backend: ', new Error(errorMessage));
  });
});

// Restore original console.log
console.log = originalConsoleLog;
