import 'react-native-reanimated';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider} from './context/app.context';
import {PortalProvider} from '@gorhom/portal';
import {RootStackScreen} from './navigations';
import {QueryClient, QueryClientProvider} from 'react-query';
import codePush from 'react-native-code-push';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

const App = () => {
  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
      <PortalProvider>
        <AppProvider>
          <QueryClientProvider client={queryClient}>
            <RootStackScreen />
          </QueryClientProvider>
        </AppProvider>
      </PortalProvider>
    </NavigationContainer>
  );
};

export default codePush(codePushOptions)(App);
