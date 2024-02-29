import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { getLocationPins } from '../utils/APICalls'
import CustomMarker from '../components/CustomMarker'
import PropTypes from 'prop-types'
import { convertToCSV, saveCSVToFile } from '../utils/CsvSaving'

const MapPage = ({ observation }) => {
  const [apiCoordinates, setApiCoordinates] = useState([])
  const [mapKey, setMapKey] = useState(0)
  console.log(observation)

  useEffect(() => {
    // Fetch pins and refresh the map on component mount
    fetchPins()
    refreshMap()
  }, [])

  const fetchPins = async () => {
    try {
      const coordinates = await getLocationPins()
      coordinates && setApiCoordinates(coordinates)
    } catch (error) {
      console.error('Error fetching API data: ', error)
    }
  }

  const handleDownload = () => {
    if (apiCoordinates.length > 0) {
      const csvData = convertToCSV(apiCoordinates)
      saveCSVToFile(csvData)
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

        {observation && (
          <CustomMarker data={observation} />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.button} onPress={handleDownload}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity> */}
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
  map: {
    ...StyleSheet.absoluteFillObject
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5
  },
  refreshButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 50,
    marginVertical: 5
  },
  buttonText: {
    color: 'black',
    textAlign: 'center'
  }
})

export default MapPage
