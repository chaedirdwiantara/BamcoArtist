import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider} from './context/app.context';
import {PortalProvider} from '@gorhom/portal';
import {RootStackScreen} from './navigations';
import {QueryClient, QueryClientProvider} from 'react-query';

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

export default App;
