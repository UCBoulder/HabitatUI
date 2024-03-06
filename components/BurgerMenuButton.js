import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import PropTypes from 'prop-types'

export const BurgerMenuButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.burgerMenuButton}
      onPress={() => navigation.openDrawer()}
    >
      <Icon name="menu" size={30} color="black" />
    </TouchableOpacity>
  )
}

BurgerMenuButton.propTypes = {
  navigation: PropTypes.object
}

const styles = StyleSheet.create({
  burgerMenuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'white'
  }
})
