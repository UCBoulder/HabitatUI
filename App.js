import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapScreen } from "./components/MapScreen";
import InfoPage from "./pages/InfoPage";
import CameraPage from "./pages/CameraPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import { requestLocationPermission, requestCameraPermission } from "./utils/Permissions";
import { v4 as uuidv4 } from 'uuid'

const Stack = createNativeStackNavigator();

export default function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    // ask for location permissions when the app first loads
    requestLocationPermission();
    // ask for camera permissions when the app first loads
    requestCameraPermission();
    // make a unique userID when the app first loads
    const userID = uuidv4();
    setUserID(userID);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Map" options={{ headerShown: false }}>
          {(props) => <MapScreen {...props} userLocation={userLocation} />}
        </Stack.Screen>

        <Stack.Screen name="Info" component={InfoPage} />

        <Stack.Screen name="Camera" component={CameraPage} options={{ headerShown: false }} />

        <Stack.Screen name="Confirmation" options={{ headerShown: false }}>
          {(props) => <ConfirmationPage {...props} setUserLocation={setUserLocation} userID={userID} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  )
}