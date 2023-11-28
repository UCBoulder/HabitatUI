import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Button, StyleSheet } from "react-native";

// button that appears on the map page
const LocationButton = ({ onGetLocation }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    onGetLocation();
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.LocationButton}>
      <Button title="Get user location" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  LocationButton: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

export default LocationButton;
