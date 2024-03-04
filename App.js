import React, { useEffect, useState } from 'react'
import { Image, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { loadUserID } from './utils/UserID'
import { requestLocationPermission, requestCameraPermission } from './utils/Permissions'
import { MapScreen } from './components/MapScreen'
import InfoPage from './pages/InfoPage'
import CameraPage from './pages/CameraPage'
import ConfirmationPage from './pages/ConfirmationPage'
import HowToUsePage from './pages/HowToUsePage'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Image
          source={require('./images/BurgerMenuImage.png')}
          style={{ width: 300, height: 250 }}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}

// Main App component
export default function App () {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ tabBarStyle: { width: '100%' } }}
      >
        <Drawer.Screen name="Home" component={StackScreens} />
        <Drawer.Screen name="Info" component={InfoPage} />
        <Drawer.Screen name="How to Use" component={HowToUsePage} />
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
      <Stack.Screen name="Camera" component={CameraPage} options={{ headerShown: false }} />
      <Stack.Screen name="Confirmation" options={{ headerShown: false }}>
        {(props) => <ConfirmationPage {...props} userID={userID} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
