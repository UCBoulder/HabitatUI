import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { getLocationPins } from '../utils/APICalls'
import CustomMarker from '../components/CustomMarker'
import PropTypes from 'prop-types'
import { convertToCSV, saveCSVToFile } from '../utils/CsvSaving'

const MapPage = ({ userLocation }) => {
  const [apiCoordinates, setApiCoordinates] = useState([])

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const coordinates = await getLocationPins()
        coordinates && setApiCoordinates(coordinates)
      } catch (error) {
        console.error('Error fetching API data: ', error)
      }
    }

    fetchPins()
  }, [])

  const handleDownload = () => {
    if (apiCoordinates.length > 0) {
      const csvData = convertToCSV(apiCoordinates)
      saveCSVToFile(csvData)
    }
  }
  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="hybrid"
        initialRegion={{
          latitude: 38.5449,
          longitude: -106.9329,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {userLocation && (
          <CustomMarker
            data={userLocation}
          />
        )}

        {apiCoordinates.map((coordinate, index) => (
          <CustomMarker
            key={index}
            data={coordinate}
          />
        ))}
      </MapView>
      <View style={styles.downloadButtonContainer}>
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Text style={styles.buttonText}>Download</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

MapPage.propTypes = {
  userLocation: PropTypes.object
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  downloadButtonContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  downloadButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'black',
    textAlign: 'center'
  }
})

export default MapPage
