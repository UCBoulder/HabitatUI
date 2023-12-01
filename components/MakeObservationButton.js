import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Button that appears on the map screen which starts the cheatgrass observation process for the user
const MakeObservationButton = ({ onGetLocation }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Camera', { onGetLocation });
  };

  return (
    <View style={styles.locationButtonContainer}>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Make Observation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  locationButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  locationButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default MakeObservationButton;
