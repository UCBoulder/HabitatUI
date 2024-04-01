import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';

// request location permissions
export const requestLocationPermission = async () => {
  let permission = (Platform.OS === 'ios') ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  
  try {
    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      console.log('Location permission granted')
    } else {
      console.log('Location permission denied')
    }
  } catch (error) {
    console.error('Error requesting location permission: ', error)
  }
}

export const requestCameraPermission = async () => {
  let permission = (Platform.OS === 'ios') ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  
  try {
    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      console.log('Camera permission granted')
    } else {
      console.log('Camera permission denied')
    }
  } catch (error) {
    console.error('Error requesting camera permission: ', error)
  }
}
