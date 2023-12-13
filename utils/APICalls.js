import axios from "axios";

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
export const sendLocationPin = async (position, locText, plantText) => {
  
  const observation = {
    coords: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
    },
    locationDescription: locText,
    plantDescription: plantText,
    VerificationRating: 1,
    timestamp: position.timestamp,
  };

  try {
    console.log(observation)
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
//   "timestamp": 1701473299603
// }


