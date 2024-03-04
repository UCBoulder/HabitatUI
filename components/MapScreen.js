import React from 'react'
import MapPage from '../pages/MapPage'
import { InfoPageButton } from './InfoPageButton'
import MakeObservationButton from './MakeObservationButton'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

// Function that makes the MapScreen with various props
export function MapScreen (props) {
  return (
    <View style={styles.MapScreen}>
      <MapPage userLocation={props.userLocation} />
      <MakeObservationButton />
      {/* <InfoPageButton
        navigation={props.navigation}
        destinationScreen="Info"
        title="Info"
      /> */}
    </View>
  )
}

MapScreen.propTypes = {
  userLocation: PropTypes.object,
  navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  MapScreen: {
    flex: 1
  }
})
