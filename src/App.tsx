import 'react-native-reanimated';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider} from './context/app.context';
import {PortalProvider} from '@gorhom/portal';
import {RootStackScreen} from './navigations';
import {QueryClientProvider} from 'react-query';
import codePush from 'react-native-code-push';
import {queryClient} from './service/queryClient';
import {color} from './theme';
import {StepNumber, Tooltip} from './components/molecule/TooltipGuideline';
import * as Sentry from '@sentry/react-native';
import {CopilotProvider} from 'react-native-copilot';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};

Sentry.init({
  dsn: 'https://bb89728b1d55117b100dee828d724b86@o4505644342050816.ingest.sentry.io/4505820195586048',
});

const style = {
  backgroundColor: color.DarkBlue[100],
};

const App = () => {
  return (
    <NavigationContainer>
      <PortalProvider>
        <AppProvider>
          <QueryClientProvider client={queryClient}>
            <CopilotProvider
              stepNumberComponent={StepNumber}
              tooltipComponent={Tooltip}
              tooltipStyle={style}
              arrowColor={color.DarkBlue[100]}>
              <RootStackScreen />
            </CopilotProvider>
          </QueryClientProvider>
        </AppProvider>
      </PortalProvider>
    </NavigationContainer>
  );
};

export default codePush(codePushOptions)(App);
