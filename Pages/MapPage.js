import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { getLocationPins } from '../utils/APICalls'
import CustomMarker from '../components/CustomMarker'
import PropTypes from 'prop-types'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

const MapPage = () => {
  const [apiCoordinates, setApiCoordinates] = useState([])
  const [mapKey, setMapKey] = useState(0)
  const isFocused = useIsFocused()

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const coordinates = await getLocationPins()
        coordinates && setApiCoordinates(coordinates)
      } catch (error) {
        console.error('Error fetching API data: ', error)
      }
    }

    if (isFocused) {
      fetchPins()
    }
  }, [isFocused]) // Update when the screen is focused

  const refreshMap = () => {
    setMapKey(prevKey => prevKey + 1)
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        key={mapKey}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="hybrid"
        toolbarEnabled={false}
        initialRegion={{
          latitude: 38.5449,
          longitude: -106.9329,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {apiCoordinates.map((coordinate, index) => (
          <CustomMarker key={index} data={coordinate} />
        ))}
      </MapView>
      <View style={styles.refreshButtonContainer}>
        <TouchableOpacity style={styles.refreshButton} onPress={refreshMap}>
        <Icon name="refresh-ccw" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

MapPage.propTypes = {
  observation: PropTypes.object
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  },
  refreshButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18
  },
  refreshButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 250,
    right: 0,
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})

export default MapPage
