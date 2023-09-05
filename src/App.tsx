import 'react-native-reanimated';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider} from './context/app.context';
import {PortalProvider} from '@gorhom/portal';
import {RootStackScreen} from './navigations';
import {QueryClient, QueryClientProvider} from 'react-query';

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://bb89728b1d55117b100dee828d724b86@o4505644342050816.ingest.sentry.io/4505820195586048',
});

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

export default Sentry.wrap(App);
