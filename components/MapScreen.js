import React from 'react'
import MapPage from '../pages/MapPage'
import MakeObservationButton from './MakeObservationButton'
import { BurgerMenuButton } from './BurgerMenuButton'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

// Function that makes the MapScreen with various props
export function MapScreen (props) {
  return (
    <View style={styles.MapScreen}>
      <MapPage userLocation={props.userLocation} />
      <BurgerMenuButton navigation={props.navigation} />
      <MakeObservationButton />
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
