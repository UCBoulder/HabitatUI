//Do the pages render?

import React from 'react';
import { render } from '@testing-library/react-native';
import InfoPage from '../../Pages/InfoPage.js'; 
import ConfirmationPage from '../../Pages/ConfirmationPage.js'

describe('InfoPage', () => {
  test('renders info page content', () => {
    const { getByTestId } = render(<InfoPage />);

    expect(getByTestId('infographic')).toBeTruthy();
  });
});

jest.mock("react-native-geolocation-service", () => ({
    Geolocation: jest.fn()
}));

// describe('ConfirmationPage', () => {
//     test('renders confirmation page content', () => {
//       const { getByTestId } = render(<ConfirmationPage />);
  
//       expect(getByTestId('confirmButton')).toBeTruthy();
//     });
//   });