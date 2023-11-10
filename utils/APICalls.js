import axios from "axios";

// recieve one or many lat long coordinates from the API
export const getLocationPins = async () => {
  try {
    const locTestResponse = await axios.get("http://172.22.192.1:3000/locTest");
    return locTestResponse.data;
  } catch (error) {
    console.error("Error fetching API data: ", error);
    return null;
  }
};

// send one lat long coordinate to the API
export const sendLocationPin = async (position) => {
    try {
      const response = await axios.post("http://172.22.192.1:3000/APITEST", {
        position,
      });
      console.log("Response from backend: ", response.data);
    } catch (error) {
      console.error("Error sending request to backend: ", error);
    }
  };

