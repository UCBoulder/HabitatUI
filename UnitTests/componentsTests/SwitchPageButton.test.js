import React from 'react';
import renderer from 'react-test-renderer';
import { TouchableOpacity, Text } from 'react-native';
import { SwitchPageButton } from '../../components/SwitchPageButton';

// Test if the button renders correcly and handles being pressed correctly
describe('SwitchPageButton', () => {
  it('renders correctly', () => {

    // Mock Props
    const navigation = { navigate: jest.fn() };
    const destinationScreen = 'Info';
    const title = 'Info';

    // Render the component
    const tree = renderer
      .create(<SwitchPageButton navigation={navigation} destinationScreen={destinationScreen} title={title} />)
      .toJSON();

    // Expect the rendered component to match the snapshot
    expect(tree).toMatchSnapshot();
  });

  it('handles press correctly', () => {
    // Mock any necessary props
    const navigation = { navigate: jest.fn() };
    const destinationScreen = 'Info';
    const title = 'Info';

    // Render the component
    const component = renderer.create(<SwitchPageButton navigation={navigation} destinationScreen={destinationScreen} title={title} />);
    const tree = component.toJSON();

    // Find the TouchableOpacity element and simulate a press
    const touchableOpacity = component.root.findByType(TouchableOpacity);
    touchableOpacity.props.onPress();

    // Expect the navigate function to be called with the correct argument
    expect(navigation.navigate).toHaveBeenCalledWith(destinationScreen);
  });
});
