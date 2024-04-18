import RNFS from 'react-native-fs'
import { Platform } from 'react-native'
import { simplifyJson } from './simplifyJson'
import { FormatDate } from '../utils/FormatDate'

export const convertToCSV = (data) => {
  const header = 'Date,Latitude,Longitude,Accuracy,Cover,Acres,Description,Image\n'
  const rows = data.map((json) => {
    const simplifiedJson = simplifyJson(json)
    const observationDate = FormatDate(simplifiedJson.timestamp)
    const { coords } = simplifiedJson

    if (coords) {
      const { latitude, longitude, accuracy } = coords
      return `${observationDate.formattedDate},${latitude},${longitude},${accuracy},${simplifiedJson.Notes.cover},${simplifiedJson.Notes.acres},${simplifiedJson.Notes.description},${simplifiedJson.observationImageURL}\n`
    }

    return ''
  }).join('')

  return header + rows
}

export const saveCSVToFile = async (csvData) => {
  const timestamp = new Date().getTime() // Get current timestamp
  const fileName = Platform.OS === 'ios' ?  `${RNFS.LibraryDirectoryPath}/Observations_${timestamp}.csv` : `${RNFS.DownloadDirectoryPath}/Observations_${timestamp}.csv`
  try {
    await RNFS.writeFile(fileName, csvData, 'utf8')
    return fileName
  } catch (error) {
    console.error('Error saving CSV file: ', error)
    throw error
  }
}
