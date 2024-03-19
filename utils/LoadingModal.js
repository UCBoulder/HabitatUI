import React from 'react'
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const LoadingModal = ({ isVisible }) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    </Modal>
  )
}

LoadingModal.propTypes = {
  isVisible: PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})

export default LoadingModal
