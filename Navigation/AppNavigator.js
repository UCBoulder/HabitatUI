import { createStackNavigator } from "react-navigation-stack";
import MapPage from "../Pages/MapPage";
import InfoPage from "../Pages/InfoPage";

const AppNavigator = createStackNavigator({
    Map: MapPage,
    Info: InfoPage,
});

export default AppNavigator;