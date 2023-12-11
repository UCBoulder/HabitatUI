import axios from "axios";
import RNFS from 'react-native-fs';

// recieve one or many lat long coordinates from the API
export const getLocationPins = async () => {
  try {
    const locTestResponse = await axios.get("http://192.168.56.1:3000/locTest");
    return locTestResponse.data;
  } catch (error) {
    console.error("Error fetching API data: ", error);
    return null;
  }
};

// send one lat long coordinate to the API
export const sendLocationPin = async (position, text, imageSource) => {

  const observation = {
    coords: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
    },
    Notes: text,
    VerificationRating: 1,
    timestamp: position.timestamp,
  };

  try {

    if (imageSource) {
      const imageBase64 = await RNFS.readFile(imageSource, 'base64');

      const formData = new FormData();
      formData.append('image', {
        uri: imageSource,
        type: 'image/jpeg', 
        name: 'image.jpg',
        encoded64: imageBase64,
      });

      observation.image = formData;

    }
    console.log(observation.image._parts)
    const response = await axios.post("http://192.168.56.1:3000/observations",
      observation,
    );
    console.log("Response from backend: ", response.data);
  } catch (error) {
    console.error("Error sending data to backend: ", error);
    return null
  }
};

// observation {
//   "Notes": undefined,
//   "VerificationRating": 1,
//   "coords": {
//     "accuracy": 14.8149995803833,
//     "latitude": 38.547351,
//     "longitude": -106.9226196
// },
//   "image": {
//      "_parts":[[Array]]
// }
//   "timestamp": 1701473299603
// }


