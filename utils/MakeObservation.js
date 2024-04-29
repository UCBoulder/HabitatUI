import Geolocation from 'react-native-geolocation-service'
import { PermissionsAndroid, Alert } from 'react-native'
import { sendLocationPin } from './APICalls'
import { makeJson } from './MakeJson'
import { openSettings } from 'react-native-permissions'

// helper to combine button functionality and sending to the API
export const makeObservation = (userID, cover, acres, description, imageSource) => {
  return new Promise(async (resolve, reject) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to function properly.',
          buttonPositive: 'OK'
        }
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(async (position) => {
          try {
            const observation = await makeJson(position, userID, cover, acres, description, imageSource)
            await sendLocationPin(observation)
            resolve(observation)
          } catch (error) {
            reject(error)
          }
        }, (error) => {
          reject(error)
        })
      } else {
        Alert.alert('Location Permission Denied', 'Please enable location permissions to continue.')
      }
    } catch (error) {
      reject(error)
    }
  }).catch((error) => {
    Alert.alert('Turn on Location Services',
      'This app needs location services turned on to function. We use your location to accurately identify the location of cheatgrass. Do you want to enable this service?',
      [
        {
          text: 'Yes',
          onPress: () => {
            openSettings()
          }
        }
      ],
      { cancelable: false }
    )
    console.warn('Error with location permissions', error)
  })
}
