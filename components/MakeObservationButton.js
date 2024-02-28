import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Button that appears on the map screen which starts the cheatgrass observation process for the user
const MakeObservationButton = () => {
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('Camera')
  }

  return (
    <View style={styles.locationButtonContainer}>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Make Observation</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  locationButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  locationButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18
  }
})

export default MakeObservationButton
