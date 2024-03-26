import axios from 'axios'
import { Alert } from 'react-native'
import config from '../config'
import connectionCheck from './CheckConnection'
import AsyncStorage from '@react-native-async-storage/async-storage'

const axiosInstance = axios.create({
  timeout: 10000 // 10 seconds timeout
})

// receive one or many lat long coordinates from the API
export const getLocationPins = async () => {
  const isConnected = await connectionCheck()
  if (isConnected) {
    try {
      const response = await axiosInstance.get(`${config.apiTestAddress}${config.apiPath}`)
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
  const storedObservations = await AsyncStorage.getItem('Observations')

  try {
    if (isConnected) {
      const response = await axiosInstance.post(`${config.apiTestAddress}${config.apiPath}`, observation)
      console.log('Response from backend: ', response.data)
      Alert.alert('Success', 'Your Observation Was Successfully Uploaded.')
    } else {
      const updatedObservations = storedObservations ? JSON.parse(storedObservations) : []
      updatedObservations.push(observation)
      await AsyncStorage.setItem('Observations', JSON.stringify(updatedObservations))
      Alert.alert('Warning', 'Your observation has been stored and can be uploaded when you have service.')
      console.log('list', updatedObservations.length)
    }
  } catch (error) {
    console.error('Error sending data to backend: ', error)

    if (error.response) {
      // Handle other errors based on Axios response
      Alert.alert('Failed', 'Your Observation Failed to Upload.', [{
        text: 'Retry',
        onPress: () => sendLocationPin(observation)
      },
      {
        text: 'Ok'
      }])
    } else if (error.request) {
      // Handle network error
      const updatedObservations = storedObservations ? JSON.parse(storedObservations) : []
      updatedObservations.push(observation)
      await AsyncStorage.setItem('Observations', JSON.stringify(updatedObservations))
      Alert.alert('Warning', 'Your observation was not uploaded due to a network error. It has been stored and can be uploaded when you have service.')
      console.log('list', updatedObservations.length)
    } else {
      // Handle other types of errors
      Alert.alert('Failed', 'An error occurred while sending your observation.', [{
        text: 'Retry',
        onPress: () => sendLocationPin(observation)
      },
      {
        text: 'Ok'
      }])
    }
  }
}

export const sendStoredObservations = async () => {
  const storedObservationsString = await AsyncStorage.getItem('Observations')
  const storedObservations = storedObservationsString ? JSON.parse(storedObservationsString) : []

  if (storedObservations.length > 0) {
    for (const storedObservation of storedObservations) {
      try {
        await axiosInstance.post(`${config.apiTestAddress}${config.apiPath}`, storedObservation)
      } catch (error) {
        console.error('Error sending stored observation to backend: ', error)
        Alert.alert('Failed', 'Your Observation Failed to Upload.', [{
          text: 'Retry',
          onPress: () => sendLocationPin(storedObservation)
        },
        {
          text: 'Ok'
        }])
        return // Exit the function if any observation fails to upload
      }
    }
    Alert.alert('Success', 'Your Stored Observation Was Successfully Uploaded.')
    await AsyncStorage.removeItem('Observations')
  }
}

export const checkAsyncStorage = async () => {
  const storedObservations = await AsyncStorage.getItem('Observations')
  console.log('stored obs', storedObservations)
  if (storedObservations) {
    sendStoredObservations()
  }
}
