import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MapScreen} from './components/MapScreen';
import InfoPage from './Pages/InfoPage';
import CameraPage from './Pages/CameraPage';
import ConfirmationPage from './Pages/ConfirmationPage';
import {
  requestLocationPermission,
  requestCameraPermission,
} from './utils/Permissions';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // ask for location permissions when the app first loads
    requestLocationPermission();
    // ask for camera permissions when the app first loads
    requestCameraPermission();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" options={{headerShown: false}}>
          {props => <MapScreen {...props} userLocation={userLocation} />}
        </Stack.Screen>

        <Stack.Screen name="Info" component={InfoPage} />

        <Stack.Screen
          name="Camera"
          component={CameraPage}
          options={{headerShown: false}}
        />

        <Stack.Screen name="Confirmation" options={{headerShown: false}}>
          {props => (
            <ConfirmationPage {...props} setUserLocation={setUserLocation} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
