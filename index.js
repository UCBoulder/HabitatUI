/**
 * @format
 */

import { Text, AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import 'react-native-get-random-values'

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

AppRegistry.registerComponent(appName, () => App)
