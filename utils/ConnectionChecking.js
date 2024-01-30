import NetInfo from "@react-native-community/netinfo";

const serviceCheck = async () => {
  try {
    const state = await NetInfo.fetch();
    console.log("Is connected?", state.isConnected);
    return state.isConnected;
  } catch (error) {
    console.error("Error fetching network information", error);
    return false;
  }
}

export default serviceCheck;
