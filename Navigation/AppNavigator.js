import { createStackNavigator } from "react-navigation-stack";
import MapPage from "../Pages/MapPage";
import InfoPage from "../Pages/InfoPage";

// Function that defines the pages that can be switched between
// if more pages need to be added put them here.
const AppNavigator = createStackNavigator({
    Map: MapPage,
    Info: InfoPage,
});

export default AppNavigator;