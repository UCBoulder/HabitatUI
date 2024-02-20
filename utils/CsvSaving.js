import RNFS from 'react-native-fs'
import { simplifyJson } from './simplifyJson'

export const convertToCSV = (data) => {
  const header = 'latitude,longitude\n'
  const rows = data.map((item) => {
    const simplifiedItem = simplifyJson(item)
    const { coords } = simplifiedItem

    if (coords) {
      console.log(coords)
      const { latitude, longitude } = coords
      return `${latitude},${longitude}\n`
    }

    return ''
  }).join('')

  return header + rows
}

export const saveCSVToFile = async (csvData) => {
  const filePath = '/storage/emulated/0/Download/coordinates.csv'
  try {
    await RNFS.writeFile(filePath, csvData, 'utf8')
    console.log('CSV file saved:', filePath)
  } catch (error) {
    console.error('Error saving CSV file: ', error)
  }
}
