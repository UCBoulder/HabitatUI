import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { getLocationPins } from "../utils/APICalls";
import { Pin } from "../components/Pin";

const MapPage = ({ userLocation }) => {
  const [apiCoordinates, setApiCoordinates] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    // fetch all of the pins from the API when the component loads
    const fetchPins = async () => {
      try {
        const coordinates = await getLocationPins();
        coordinates && setApiCoordinates(coordinates);
      } catch (error) {
        console.error("Error fetching API data: ", error);
      }
    };

    fetchPins();
  }, []);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const closeInfoWindow = () => {
    setSelectedMarker(null);
  };

  return (
    // set the default map location to be Gunnison
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: 38.5449,
          longitude: -106.9329,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="Your observation"
            onPress={() => handleMarkerPress(userLocation)}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text>{`Your observation\nLatitude: ${userLocation.coords.latitude}\nLongitude: ${userLocation.coords.longitude}`}</Text>
                <TouchableOpacity onPress={closeInfoWindow}>
                  <Text style={styles.closeButton}>X</Text>
                </TouchableOpacity>
                <Image
                  source={require('../images/PXL_20231211_211945981.MP.jpg')}
                  style={styles.imageCallout}
                />
              </View>
            </Callout>
          </Marker>
        )}
        {apiCoordinates.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            }}
            pinColor={Pin(coordinate.verification)}
            onPress={() => handleMarkerPress(coordinate)}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text>{`Latitude: ${coordinate.latitude}\nLongitude: ${coordinate.longitude}\n`}
                <Image
                  source={require('../images/PXL_20231211_211945981.MP.jpg')}
                  style = {{ width: 220, height: 75, justifyContent: 'flex-start', flex: 1, alignContent: 'center', resizeMode: 'stretch'}}
                  /></Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutContainer: {
    width: 220,
    height: 300,
  },
  imageCallout: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
    marginTop: 10,
  },
  closeButton: {
    fontSize: 20,
    color: "red",
    alignSelf: "flex-end",
  },
});

export default MapPage;
