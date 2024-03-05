import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MapScreen } from './components/MapScreen'
import InfoPage from './pages/InfoPage'
import CameraPage from './pages/CameraPage'
import ConfirmationPage from './pages/ConfirmationPage'
import { requestLocationPermission, requestCameraPermission } from './utils/Permissions'
import { loadUserID } from './utils/UserID'
import { checkAsyncStorage } from './utils/APICalls'

const Stack = createNativeStackNavigator()

export default function App () {
  const [userID, setUserID] = useState(null)

  useEffect(() => {
    const startUp = async () => {
      await requestLocationPermission()
      await requestCameraPermission()
      await loadUserID(setUserID)
      await checkAsyncStorage()
    }

    startUp()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Map" options={{ headerShown: false }}>
          {(props) => <MapScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Info" component={InfoPage} />

        <Stack.Screen name="Camera" component={CameraPage} options={{ headerShown: false }} />

        <Stack.Screen name="Confirmation" options={{ headerShown: false }}>
          {(props) => <ConfirmationPage {...props} userID={userID} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  )
}
