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
export const sendLocationPin = async (position) => {
    try {
      const response = await axios.post("http://192.168.56.1:3000/error", {
        position,
      });
      console.log("Response from backend: ", response.data);
    } catch (error) {
      console.error("Error sending data to backend: ", error);
      return null
    }
  };

