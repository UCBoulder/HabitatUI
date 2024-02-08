import React, { useState } from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { makeObservation } from '../utils/MakeObservation'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome5'

const ConfirmationPage = ({ route, setUserLocation, userID }) => {
  const navigation = useNavigation()
  const { imageSource } = route.params
  const [text, onChangeText] = useState('')

  const confirmationButton = () => {
    makeObservation(setUserLocation, userID, text, imageSource)
    navigation.navigate('Map')
  }

  function handleBack () {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => handleBack()}>
        <Icon name="arrow-left" size={30} color="white" />
      </TouchableOpacity>

      {/* Display photo that was taken */}
      <Image
        source={{ uri: `file://${imageSource}` }}
        style={styles.confirmationImage}
        resizeMode='cover'
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Put text here"
        placeholderTextColor={'#aaa'}
        multiline={true}
        textAlignVertical="top"
        color="#aaa"
      />

      <TouchableOpacity
        style={styles.confirmationButton}
        onPress={confirmationButton}
      >
        <Text style={styles.buttonText}>Confirm Observation</Text>

      </TouchableOpacity>

    </View>
  )
}

ConfirmationPage.propTypes = {
  route: PropTypes.object.isRequired,
  setUserLocation: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmationImage: {
    width: '100%',
    height: '50%'
  },
  input: {
    flex: 1,
    height: 100,
    width: '100%',
    textDecorationColor: '#aaa',
    textAlignVertical: 'top'
  },
  confirmationButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    bottom: 20
  },
  buttonText: {
    color: 'black',
    textAlign: 'center'
  },
  backButton: {
    zIndex: 2,
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    borderRadius: 5
  }
})

export default ConfirmationPage
