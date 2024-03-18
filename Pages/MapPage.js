import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { getLocationPins } from '../utils/APICalls'
import CustomMarker from '../components/CustomMarker'
import PropTypes from 'prop-types'
import { useRoute } from '@react-navigation/native'

const MapPage = () => {
  const [apiCoordinates, setApiCoordinates] = useState([])
  const [mapKey, setMapKey] = useState(0)
  const route = useRoute()

  useEffect(() => {
    fetchPins()

    const refreshCallback = route.params?.refreshMap

    if (refreshCallback) {
      refreshMap()
    }
  }, [route])

  const fetchPins = async () => {
    try {
      const coordinates = await getLocationPins()
      coordinates && setApiCoordinates(coordinates)
    } catch (error) {
      console.error('Error fetching API data: ', error)
    }
  }

  const refreshMap = () => {
    // Incrementing the mapKey to force a re-render of the MapView
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
  map: {
    ...StyleSheet.absoluteFillObject
  }
})

export default MapPage
