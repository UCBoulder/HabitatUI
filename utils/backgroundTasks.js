import BackgroundFetch from 'react-native-background-fetch'
import { checkAsyncStorage, sendStoredObservations } from './APICalls'
import NetInfo from '@react-native-community/netinfo'

export const configureBackgroundFetch = () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15,
      enableHeadless: true,
      stopOnTerminate: false,
      startOnBoot: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY
    },
    async (taskId) => {
      console.log('[BackgroundFetch] TaskId: ', taskId)
      await checkAsyncStorage()
      BackgroundFetch.finish(taskId)
    },
    (error) => {
      console.error('[BackgroundFetch] Failed to configure background fetch: ', error)
    }
  )
}

export const checkNetwork = async () => {
  const netInfoState = await NetInfo.fetch()
  if (netInfoState.isConnected) {
    await sendStoredObservations()
  }
}
