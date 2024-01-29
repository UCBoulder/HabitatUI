import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid'

export const loadUserID = async (setUserID) => {
  try {
    // check if a userID is already in local storage
    const storedUserID = await AsyncStorage.getItem('userID')

    if (!storedUserID) {
      // if not create a new one. Presumably a new user
      const userID = uuidv4()
      await AsyncStorage.setItem('userID', userID)
      setUserID(userID)
    } else {
      setUserID(storedUserID)
    }
  } catch (error) {
    console.error('AsyncStorage error: ', error)
  }
}
