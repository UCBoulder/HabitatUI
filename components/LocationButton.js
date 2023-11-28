import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LocationButton = ({ onGetLocation }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    onGetLocation();
    navigation.navigate('Camera');
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

export default LocationButton;
