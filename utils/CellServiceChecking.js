import { NetInfo } from "react-native"

const cellServiceCheck = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
            console.log("online")
        } else {
            console.log("offline")
        }
    })
}

export default cellServiceCheck;