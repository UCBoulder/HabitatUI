import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { getLocationPins } from '../utils/APICalls'
import CustomMarker from '../components/CustomMarker'
import PropTypes from 'prop-types'
import { convertToCSV, saveCSVToFile } from '../utils/CsvSaving'
import Icon from 'react-native-vector-icons/FontAwesome5' // Import the icon of your choice

const MapPage = ({ userLocation }) => {
  const [apiCoordinates, setApiCoordinates] = useState([])
  const [mapKey, setMapKey] = useState(0)

  useEffect(() => {
    fetchPins()
  }, [mapKey])

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

  const refreshMap = async () => {
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

        {userLocation && (
          <CustomMarker data={userLocation} />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.button} onPress={handleDownload}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.refreshButton} onPress={refreshMap}>
          <Icon name="sync" size={30} color="black" />
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
