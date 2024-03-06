import NetInfo from '@react-native-community/netinfo'

const CheckConnection = async () => {
  try {
    const state = await NetInfo.fetch()
    return state.isConnected
  } catch (error) {
    console.error('Error fetching network information', error)
    return false
  }
}

export default CheckConnection
