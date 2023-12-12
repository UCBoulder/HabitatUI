// //test stuff from the pages folder if thats even possible


// import * as React from 'react'
// import {render, fireEvent} from '@testing-library/react-native'
// //import '@testing-library/jest-dom'
// import CameraPage from '../../Pages/CameraPage'
// import { TouchableOpacity } from 'react-native'
// import 'react-native-camera';
// import { NavigationContainer } from '@react-navigation/native';

// jest.mock('react-native-camera', () => ({
//     RNCamera: jest.fn(),
//   }));

//   jest.mock('react-native-vision-camera', () => ({
//     Camera: jest.fn(),
//     useCameraDevice: jest.fn(),
//     navigation: jest.fn()
//   }));

// // test('shows the children when the checkbox is checked', () => {
// //     const testMessage = 'Test Message'
// //     render(<HiddenMessage>{testMessage}</HiddenMessage>) )}

// test('displays picture taken after button press', async () => {
//     const { getByTestId } = render(<CameraPage/>);
  
//     // Assuming your button has a testID
//     const button = component.root.findByType(TouchableOpacity) //getByTestId('takePhotoButton');
    
//     // Simulate a button click
//     fireEvent.press(button);
  
//     // You might need to wait for the camera to take the picture or mock its behavior
//     // For instance, you can mock a delay to simulate picture taking
//     // await new Promise(resolve => setTimeout(resolve, 1000));
  
//     // Check if the picture display element is present
//     const pictureDisplay = getByTestId('showPhoto');
//     expect(pictureDisplay).toBeDefined();
// })