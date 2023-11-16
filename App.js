import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapScreen } from "./components/NavigationComponents";
import InfoPage from "./Pages/InfoPage";
import { requestLocationPermission } from "./utils/HelperFunctions";
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userLocation, setUserLocation] = useState(null);
  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice('back')

  useEffect(() => {
    // ask for location permissions when the app first loads
    requestLocationPermission();
    
  }, []);

  if (device == null) return <NoCameraDeviceError />
  return (
    <Camera
    style={StyleSheet.absoluteFill}
    device={device}
    isActive={true}
    />
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Map">
    //       {(props) => <MapScreen {...props} userLocation={userLocation} setUserLocation={setUserLocation} />}
    //     </Stack.Screen>
    //     <Stack.Screen name="Info" component={InfoPage} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  )
}