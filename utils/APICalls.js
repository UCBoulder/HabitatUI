import axios from 'axios'
import RNFS from 'react-native-fs'
import { Alert } from 'react-native'
import connectionCheck from './ConnectionChecking'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Receive one or many lat long coordinates from the API
export const getLocationPins = async () => {
  try {
    const locTestResponse = await axios.get('http://192.168.56.1:3000/locTest')
    return locTestResponse.data
  } catch (error) {
    console.error('Error fetching API data: ', error)
    return null
  }
}

// Send one lat long coordinate to the API
export const sendLocationPin = async (position, userID, text, imageSource) => {
  const observation = {
    userID,
    coords: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    },
    Notes: text,
    VerificationRating: 1,
    timestamp: position.timestamp
  }

  if (imageSource) {
    const imageBase64 = await RNFS.readFile(imageSource, 'base64')

    const formData = new FormData()
    formData.append('image', {
      uri: imageSource,
      type: 'image/jpeg',
      name: 'image.jpg',
      encoded64: imageBase64
    })

    observation.image = imageBase64
  }

  const isConnected = await connectionCheck()
  const storedObservations = await AsyncStorage.getItem('Observation')

  if (isConnected && !storedObservations) {
    try {
      const response = await axios.post('http://192.168.56.1:3000/observations', observation)
      console.log('Response from backend: ', response.data)
      Alert.alert('Success', 'Your Observation Was Successfully Uploaded')
    } catch (error) {
      console.error('Error sending data to backend: ', error)

      Alert.alert('Failed', 'Your Observation Failed to Upload', [
        {
          text: 'Retry',
          onPress: () => sendLocationPin(position, userID, text, imageSource)
        },
        {
          text: 'Ok'
        }
      ])

      return null
    }
  } else {
    const updatedObservations = storedObservations ? JSON.parse(storedObservations) : []
    updatedObservations.push(observation)
    await AsyncStorage.setItem('Observation', JSON.stringify(updatedObservations))
  }
}

export const sendStoredObservations = async () => {
  const storedObservations = await AsyncStorage.getItem('Observations')

  if (storedObservations) {
    const observations = JSON.parse(storedObservations)

    for (const storedObservation of observations) {
      try {
        const response = await axios.post('http://192.168.56.1:3000/observations', storedObservation)
        console.log('Response from backend: ', response.data)
      } catch (error) {
        console.error('Error sending stored observation to backend: ', error)
      }
    }

    await AsyncStorage.removeItem('Observations')
  }
}

export const checkAsyncStorage = async () => {
  const storedObservations = await AsyncStorage.getItem('Observations')
  if (storedObservations) {
    sendStoredObservations()
  }
}
