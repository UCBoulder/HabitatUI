import React from 'react';
import renderer from 'react-test-renderer';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MakeObservationButton from '../../components/MakeObservationButton';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Test if the button renders and handles a press
describe('MakeObservationButton', () => {
  it('renders correctly', () => {
    // Mock the navigate function from useNavigation
    const navigateMock = jest.fn();
    useNavigation.mockReturnValue({ navigate: navigateMock });

    // Render the component
    const tree = renderer.create(<MakeObservationButton />).toJSON();

    // Expect the rendered component to match the snapshot
    expect(tree).toMatchSnapshot();
  });

  it('handles press correctly', () => {
    // Mock the navigate function from useNavigation
    const navigateMock = jest.fn();
    useNavigation.mockReturnValue({ navigate: navigateMock });

    // Render the component
    const component = renderer.create(<MakeObservationButton />);
    const tree = component.toJSON();

    // Find the TouchableOpacity element and simulate a press
    const touchableOpacity = component.root.findByType(TouchableOpacity);
    touchableOpacity.props.onPress();

    // Expect the navigate function to be called with the correct argument
    expect(navigateMock).toHaveBeenCalledWith('Camera');
  });
});
