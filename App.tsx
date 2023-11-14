import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapScreen } from "./components/NavigationComponents";
import InfoPage from "./Pages/InfoPage";
import { requestLocationPermission } from "./utils/HelperFunctions";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // ask for location permissions when the app first loads
    requestLocationPermission();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map">
          {(props) => <MapScreen {...props} userLocation={userLocation} setUserLocation={setUserLocation} />}
        </Stack.Screen>
        <Stack.Screen name="Info" component={InfoPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}