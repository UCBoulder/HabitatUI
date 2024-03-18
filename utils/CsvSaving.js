import RNFS from 'react-native-fs'
import { simplifyJson } from './simplifyJson'
import { Alert } from 'react-native'

export const convertToCSV = (data) => {
  const header = 'Latitude,Longitude,Accuracy,Notes,Image\n'
  const rows = data.map((json) => {
    const simplifiedJson = simplifyJson(json)
    const { coords } = simplifiedJson

    if (coords) {
      const { latitude, longitude, accuracy } = coords
      return `${latitude},${longitude},${accuracy},${simplifiedJson.Notes},${simplifiedJson.observationImageURL}\n`
    }

    return ''
  }).join('')

  return header + rows
}

export const saveCSVToFile = async (csvData) => {
  const filePath = '/storage/emulated/0/Download/coordinates.csv'
  try {
    await RNFS.writeFile(filePath, csvData, 'utf8')
    Alert.alert('Success', 'The Observation information has been downloaded to Downloads/coordinates.csv')
  } catch (error) {
    Alert.alert('Failed', 'The Observation information failed to download', [{
      text: 'Retry',
      onPress: () => saveCSVToFile(csvData)
    },
    {
      text: 'Ok'
    }])
    console.error('Error saving CSV file: ', error)
  }
}
