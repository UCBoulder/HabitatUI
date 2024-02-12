import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export const InfoPageButton = ({ navigation, destinationScreen, title }) => {
  return (
        <View style={styles.SwitchPageButton}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(destinationScreen)}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
  )
}

InfoPageButton.propTypes = {
  navigation: PropTypes.object.isRequired,
  destinationScreen: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  SwitchPageButton: {
    position: 'absolute',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginLeft: 12,
    marginTop: 12
  },
  buttonText: {
    color: 'black'
  }
})
