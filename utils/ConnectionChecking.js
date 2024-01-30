import NetInfo from '@react-native-community/netinfo'

const connectionCheck = async () => {
  try {
    const state = await NetInfo.fetch()
    console.log('Is connected?', state.isConnected)
    return state.isConnected
  } catch (error) {
    console.error('Error fetching network information', error)
    return false
  }
}

export default connectionCheck
