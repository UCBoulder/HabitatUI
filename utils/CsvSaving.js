import RNFS from 'react-native-fs'
import { simplifyJson } from './simplifyJson'
import { Alert } from 'react-native'

export const convertToCSV = (data) => {
  const header = 'latitude,longitude,accuracy\n'
  const rows = data.map((json) => {
    const simplifiedJson = simplifyJson(json)
    const { coords } = simplifiedJson

    if (coords) {
      const { latitude, longitude, accuracy } = coords
      return `${latitude},${longitude},${accuracy}\n`
    }

    return ''
  }).join('')

  return header + rows
}

export const saveCSVToFile = async (csvData) => {
  const filePath = '/storage/emulated/0/Download/coordinates.csv'
  try {
    await RNFS.writeFile(filePath, csvData, 'utf8')
    Alert.alert('Success', `The Observation information has been downloaded to "${filePath}"`)
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
