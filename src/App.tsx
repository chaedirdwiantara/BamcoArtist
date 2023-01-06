import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider} from './context/app.context';
import {PortalProvider} from '@gorhom/portal';
import {RootStackScreen} from './navigations';

const App = () => {
  return (
    <NavigationContainer>
      <PortalProvider>
        <AppProvider>
          <RootStackScreen />
        </AppProvider>
      </PortalProvider>
    </NavigationContainer>
  );
};

export default App;
