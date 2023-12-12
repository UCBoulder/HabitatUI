import { request } from 'react-native-permissions';
import { requestCameraPermission, requestLocationPermission } from '../../utils/Permissions';

// Mock react-native-permissions module
jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {
    ANDROID: {
      ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
      CAMERA: 'android.permission.CAMERA',
    },
  },
  request: jest.fn(),
}));

// Test Permissions.js
describe('Permission functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('requestLocationPermission - granted', async () => {
    // Set the mock implementation for the request function
    request.mockResolvedValueOnce('granted');

    const logSpy = jest.spyOn(console, 'log');

    await requestLocationPermission();

    // Verify that the correct log message is printed
    expect(logSpy).toHaveBeenCalledWith('Location permission granted');
  });

  test('requestLocationPermission - denied', async () => {
    // Set the mock implementation for the request function
    request.mockResolvedValueOnce('denied');

    const logSpy = jest.spyOn(console, 'log');

    await requestLocationPermission();

    // Verify that the correct log message is printed
    expect(logSpy).toHaveBeenCalledWith('Location permission denied');
  });

  test('requestLocationPermission - error', async () => {
    // Set the mock implementation for the request function
    request.mockRejectedValueOnce(new Error('Permission request failed'));

    const errorSpy = jest.spyOn(console, 'error');

    await requestLocationPermission();

    // Verify that the correct error message is printed
  expect(errorSpy).toHaveBeenCalledWith(
    'Error requesting location permission: ',
    expect.objectContaining({ message: 'Permission request failed' })
  );
  });

  test('requestCameraPermission - granted', async () => {
    // Set the mock implementation for the request function
    request.mockResolvedValueOnce('granted');

    const logSpy = jest.spyOn(console, 'log');

    await requestCameraPermission();

    // Verify that the correct log message is printed
    expect(logSpy).toHaveBeenCalledWith('Camera permission granted');
  });

  test('requestCameraPermission - denied', async () => {
    // Set the mock implementation for the request function
    request.mockResolvedValueOnce('denied');

    const logSpy = jest.spyOn(console, 'log');

    await requestCameraPermission();

    // Verify that the correct log message is printed
    expect(logSpy).toHaveBeenCalledWith('Camera permission denied');
  });

  test('requestCameraPermission - error', async () => {
    // Set the mock implementation for the request function
    request.mockRejectedValueOnce(new Error('Permission request failed'));

    const errorSpy = jest.spyOn(console, 'error');

    await requestCameraPermission();

    // Verify that the correct error message is printed
    expect(errorSpy).toHaveBeenCalledWith(
      'Error requesting camera permission: ',
      expect.objectContaining({ message: 'Permission request failed' })
    );
  });
});
