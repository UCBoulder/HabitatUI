///testing if the buttons on home page switch to t=other pages as expected

import * as React from 'react'
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraPage from '../../Pages/CameraPage'
import { TouchableOpacity } from 'react-native'
import 'react-native-camera';

jest.mock('@react-navigation/native');

describe('Navigation', () => {
  test('navigates from map page to infor page on button press', () => {
    const Stack = createStackNavigator();

    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="SecondPage" component={SecondPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    // Find the button and simulate a press
    const button = getByText('Go to Second Page');
    fireEvent.press(button);

    // Check if navigation was called with the correct screen name
    expect(navigation.navigate).toHaveBeenCalledWith('InfoPage');
  });
});