jest.mock('../utils/ConnectionChecking', () => ({
  ...jest.requireActual('../utils/ConnectionChecking'),
  connectionCheck: jest.fn(() => false), // Mocking connectionCheck to always return false
}));
