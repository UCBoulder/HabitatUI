import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { loadUserID } from './utils/UserID'
import { requestLocationPermission, requestCameraPermission } from './utils/Permissions'
import { checkAsyncStorage } from './utils/APICalls'
import { MapScreen } from './components/MapScreen'
import InfoPage from './pages/InfoPage'
import CameraPage from './pages/CameraPage'
import ConfirmationPage from './pages/ConfirmationPage'
import AboutPage from './pages/AboutPage'
import DownloadPage from './pages/DownloadPage'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <View>
        <Image
          source={require('./images/BurgerMenuImage.png')}
          style={{ width: 300, height: 250, marginBottom: 15 }}
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
        screenOptions={{
          drawerActiveTintColor: 'black',
          drawerInactiveTintColor: 'black',
          headerShown: false
        }}
      >
        <Drawer.Screen name="Map" component={StackScreens} />
        <Drawer.Screen name="Info" component={InfoPage} />
        <Drawer.Screen name="About" component={AboutPage} headerShown={true}/>
        <Drawer.Screen name="Download" component={DownloadPage} />
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
      await checkAsyncStorage()
    }

    startUp()
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="MapScreen">
        {(props) => <MapScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Camera" component={CameraPage} />
      <Stack.Screen name="Confirmation" >
        {(props) => <ConfirmationPage {...props} userID={userID} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
