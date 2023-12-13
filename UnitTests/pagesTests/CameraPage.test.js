import React from 'react';
import { render, fireEvent , waitFor} from '@testing-library/react-native';
import CameraPage from '../../pages/CameraPage';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));

jest.mock('react-native-vision-camera', () => ({
  Camera: 'Camera',
  useCameraDevice: jest.fn(() => 'back'),
}));

describe('CameraPage', () => {
  it('renders CameraPage correctly', () => {
    const { getByTestId } = render(<CameraPage />);
    expect(getByTestId('takePhotoButton')).toBeTruthy();
  });

  it('captures photo when take photo button is pressed', async () => {
    const { getByTestId } = render(<CameraPage />);
    fireEvent.press(getByTestId('takePhotoButton'));
    await waitFor(() => expect(getByTestId('showPhoto')).toBeDefined());
  });

  it('handles redo button press', async () => {
    const { getByText, getByTestId } = render(<CameraPage />);
    fireEvent.press(getByTestId('takePhotoButton'));
    fireEvent.press(getByTestId('retakeButton'));
    expect(getByTestId('showPhoto')).toBeFalsy(); 
    expect(getByTestId('takePhotoButton')).toBeTruthy();
  });

  it('handles confirmation button press', async () => {
    const { getByTestId, getByText } = render(<CameraPage />);
    fireEvent.press(getByTestId('takePhotoButton'));
    fireEvent.press(getByTestId('confirmButton'));
  });
});
