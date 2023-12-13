///testing if the buttons on home page switch to t=other pages as expected

import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/stack';
import MapPage from "../../Pages/MapPage";
import { SwitchPageButton } from "../../components/SwitchPageButton";
import InfoPage from '../../Pages/InfoPage';


jest.mock('@react-navigation/native');

jest.mock('@react-navigation/stack');

jest.mock("react-native-maps", () => ({
    MapView: jest.fn()
}));

jest.mock("@react-navigation/native-stack", () => ({
    createNativeStackNavigator: jest.fn()
}));

// const Stack = createNativeStackNavigator();

describe('Navigation', () => {
  test('navigates from map page to information page on button press', () => {

    const { getByText } = render(
      <NavigationContainer>
        <SwitchPageButton/>
        {/* <Stack.Navigator initialRouteName="MapPage">
          <Stack.Screen name="Map" component={MapPage} />
          <Stack.Screen name="Info" page={InfoPage} />
        </Stack.Navigator> */}
      </NavigationContainer>
    );

    fireEvent.press(screen.getByName("Info"));
    // Find the button and simulate a press
    const button = SwitchPageButton;
    fireEvent.press(button);

    // Check if navigation was called with the correct screen name
    expect(screen.getByText('Info')).toBeOnTheScreen();
  });
});