import axios from 'axios'
import { Alert } from 'react-native'
import config from '../config'
import connectionCheck from './CheckConnection'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BackgroundFetch from 'react-native-background-fetch'
import { getAllExternalFilesDirs } from 'react-native-fs'

const axiosInstance = axios.create({
  timeout: 10000 // 10 seconds timeout
})

// receive one or many lat long coordinates from the API
export const getLocationPins = async () => {
  const isConnected = await connectionCheck()
  if (isConnected) {
    try {
      const response = await axiosInstance.get(`${config.apiTestAddress}${config.apiPath}`, {
        headers: {
          'x-api-key': process.env.API_KEY
        }
      })
      return response.data.Items
    } catch (error) {
      console.error('Error fetching API data: ', error)
      return null
    }
  }
}

// send one lat long coordinate to the API
export const sendLocationPin = async (observation) => {
  // Alert.alert('Warning', 'Top of sendlocation Pin function')
  console.log("before connection check ")
  const isConnected = await connectionCheck()

  console.log("after connection check ")
  const storedObservations = await AsyncStorage.getItem('Observations')
  console.log("after storedObservations ")
  let timeoutId = null // Variable to store the timeout ID

  const cancelTokenSource = axios.CancelToken.source() // Create a cancel token source
  console.log("before try ")
  try {
    if (isConnected) {
      console.log('Is connected: ', isConnected)
      // Start the timer
      timeoutId = setTimeout(async () => {
        
        cancelTokenSource.cancel('Timeout occurred') // Cancel the request if timeout occurs
        const updatedObservations = storedObservations ? JSON.parse(storedObservations) : []
        updatedObservations.push(observation)
        await AsyncStorage.setItem('Observations', JSON.stringify(updatedObservations))
        await initBackgroundFetch()
        Alert.alert('Warning', 'Your observation has been stored and can be uploaded when you have service.')
      }, 10000) // 10 seconds timeout
      console.log(process.env.API_KEY)
      const response = await axiosInstance.post(`${config.apiTestAddress}${config.apiPath}`, observation, {

        headers: {
          'x-api-key': process.env.API_KEY
        },
        cancelToken: cancelTokenSource.token // Pass the cancel token to the request config
      })

      // Clear the timeout if the request completes before 5 seconds
      clearTimeout(timeoutId)

      console.log('Response from backend: ', response.data)
      Alert.alert('Success', 'Your Observation Was Successfully Uploaded.')
    } else {
      
      const updatedObservations = storedObservations ? JSON.parse(storedObservations) : []
      updatedObservations.push(observation)
      // Alert.alert('Warning', 'In else statement of sendLocationPin function if not connected to internet. after updatedObservations.push(observation)')
      await AsyncStorage.setItem('Observations', JSON.stringify(updatedObservations))
      // Alert.alert('Warning', 'after awaited for async storage')
      console.log('after awaited for async storage')
      await initBackgroundFetch()
      // Alert.alert('Warning', 'after init background fetch')
      console.log('after init background fetch')
      Alert.alert('Success', 'Your observation has been stored and can be uploaded when you have service.')
    }
  } catch (error) {
    console.error('Error sending data to backend: ', error)
    // Clear the timeout if an error occurs
    clearTimeout(timeoutId)

    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message)
      return // Exit the function if the request was canceled
    }

    if (error.response.status === 413) { // Paylod too large
      Alert.alert('Warning', 'There was an error processing the image. Retake the image if possible')
    }

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
      await initBackgroundFetch()
      Alert.alert('Warning', 'Your observation was not uploaded due to a network error. It has been stored and can be uploaded when you have service.')
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
        await axiosInstance.post(`${config.apiTestAddress}${config.apiPath}`, storedObservation, {
          headers: {
            'x-api-key': process.env.API_KEY
          }
        })
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
  if (storedObservations) {
    sendStoredObservations()
  }
}

export const initBackgroundFetch = async () => {
  const onEvent = async (taskId) => {
    console.log('Background task: ', taskId)
    const isConnected = await connectionCheck()

    if (isConnected) {
      await sendStoredObservations()
      BackgroundFetch.finish(taskId)
    }
  }
  const onTimeout = async (taskId) => {
    console.log('Background task timeout: ', taskId)
    Alert.alert('Warning', 'Background task timeout')
    BackgroundFetch.finish(taskId)
  }
  try {
    // if(!isConnected){
      const status = await BackgroundFetch.configure({
        minimumFetchInterval: 15, // Fetch interval in minutes
        stopOnTerminate: false,
        startOnBoot: true
      }, onEvent, onTimeout);
    // } 
    // console.log('BackgroundFetch configure success:', status);
  } catch (error) {
    // This is an error that only occurs when the user on IOS has disabled background fetch
      console.error('Error details:', error.message, error.stack);
      errorMessageLine1 = " Your observation has been stored locally on your phone.\n When you are back in cell phone range, close this app  all the way and reopen. \n" 
      errorMessageLine2 = "\n If you have just re-opened your app after saving an observation, wait for it to upload\n \n To close the app: \n"
      errorMessageLine3 = " Swipe up from the bottom and be sure to pause in the middle of the screen.\n"
      errorMessageLine4 = " Locate this app, and swipe up to close it.\n\n "
      errorMessageLine6 = " To prevent this in the future, go to Settings > General > Background App Refresh. With this enabled, our automatic upload feature can work. "
      errorMessage = errorMessageLine1 + errorMessageLine2 + errorMessageLine3 + errorMessageLine4  + errorMessageLine6
      Alert.alert('Warning: Manual Steps needed to Upload', errorMessage, error); 
  }
}
//Your observation has been stored locally on your phone. When you are back in cell phone range, close this app  all the way and reopen. Alternatively, if you don't know how to close apps you may shut off your phone, and restart the phone and the app. To close the app:
// Swipe up from the bottom and be sure to pause in the middle of the screen. You will see all of the apps you are running in a stack. Locate this app, and swipe up to close it.
// On iPhones with a Home button, double-click the home button. Select an app, and then swipe up to close it.
// To prevent this in the future, go to Settings > General > Background App Refresh. With this enabled, our automatic upload feature can work.