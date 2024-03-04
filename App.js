import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MapScreen } from './components/MapScreen'
import InfoPage from './pages/InfoPage'
import CameraPage from './pages/CameraPage'
import ConfirmationPage from './pages/ConfirmationPage'
import { requestLocationPermission, requestCameraPermission } from './utils/Permissions'
import { loadUserID } from './utils/UserID'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={StackScreens} />
        <Drawer.Screen name="Info" component={InfoPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

function StackScreens () {
  const [userID, setUserID] = useState(null)

  useEffect(() => {
    const startUp = async () => {
      await requestLocationPermission()
      await requestCameraPermission()
      await loadUserID(setUserID)
    }

    startUp()
  }, [])

  return (
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
  )
}
