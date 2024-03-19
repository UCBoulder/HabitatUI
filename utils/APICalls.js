import axios from 'axios'
import { Alert } from 'react-native'
import config from '../config'
import connectionCheck from './CheckConnection'
import AsyncStorage from '@react-native-async-storage/async-storage'

// recieve one or many lat long coordinates from the API
export const getLocationPins = async () => {
  const isConnected = await connectionCheck()
  if (isConnected) {
    try {
      const response = await axios.get(`${config.apiTestAddress}${config.apiPath}`)
      return response.data.Items
    } catch (error) {
      console.error('Error fetching API data: ', error)
      return null
    }
  }
}

// send one lat long coordinate to the API
export const sendLocationPin = async (observation) => {
  const isConnected = await connectionCheck()
  const storedObservations = await AsyncStorage.getItem('Observation')

  if (isConnected) {
    try {
      const response = await axios.post(`${config.apiTestAddress}${config.apiPath}`, observation)
      console.log('Response from backend: ', response.data)
      Alert.alert('Success', 'Your Observation Was Successfully Uploaded.')
    } catch (error) {
      console.error('Error sending data to backend: ', error)

      Alert.alert('Failed', 'Your Observation Failed to Upload.', [{
        text: 'Retry',
        onPress: () => sendLocationPin(observation)
      },
      {
        text: 'Ok'
      }])

      return null
    }
  } else {
    const updatedObservations = storedObservations ? JSON.parse(storedObservations) : []
    updatedObservations.push(observation)
    await AsyncStorage.setItem('Observations', JSON.stringify(updatedObservations))
    Alert.alert('Success', 'Your observation has been stored and can be uploaded when you have service.')
  }
}

export const sendStoredObservations = async () => {
  const storedObservations = await AsyncStorage.getItem('Observations')
  const observations = JSON.parse(storedObservations)

  if (storedObservations) {
    for (const storedObservation of observations) {
      try {
        await axios.post(`${config.apiTestAddress}${config.apiPath}`, storedObservation)
      } catch (error) {
        console.error('Error sending stored observation to backend: ', error)
        Alert.alert('Failed', 'Your Observation Failed to Upload.', [{
          text: 'Retry',
          onPress: () => sendLocationPin(storedObservation)
        },
        {
          text: 'Ok'
        }])
      }
    }
    Alert.alert('Success', 'Your Stored Observation Was Successfully Uploaded.')
  }

  await AsyncStorage.removeItem('Observations')
}

export const checkAsyncStorage = async () => {
  const storedObservations = await AsyncStorage.getItem('Observations')
  if (storedObservations) {
    sendStoredObservations()
  }
}
