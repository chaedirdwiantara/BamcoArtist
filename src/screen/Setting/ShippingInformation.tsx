import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {ShippingInformationContent} from '../../components';
import {useLocationHook} from '../../hooks/use-location.hook';

type ShippingInformationProps = NativeStackScreenProps<
  RootStackParams,
  'ShippingInformation'
>;
export const ShippingInformationScreen: React.FC<ShippingInformationProps> = ({
  navigation,
  route,
}: ShippingInformationProps) => {
  const {data} = route.params;
  const onPressGoBack = () => {
    navigation.goBack();
  };

  const {
    dataAllCountry,
    dataStateInCountry,
    dataCitiesInState,
    getDataAllCountry,
    getStateInCountry,
    getCitiesInState,
  } = useLocationHook();
  const [selectedCountry, setSelectedCountry] = useState<string>(
    data?.country || '',
  );
  const [selectedState, setSelectedState] = useState<string>(
    data?.province || '',
  );

  useEffect(() => {
    getDataAllCountry();
  }, []);

  useEffect(() => {
    getStateInCountry({country: selectedCountry});
  }, [selectedCountry]);

  useEffect(() => {
    getCitiesInState({country: selectedCountry, state: selectedState});
  }, [selectedCountry, selectedState]);

  return (
    <View style={styles.root}>
      <ShippingInformationContent
        dataAllCountry={dataAllCountry !== undefined ? dataAllCountry : []}
        dataState={dataStateInCountry !== undefined ? dataStateInCountry : []}
        dataCities={dataCitiesInState !== undefined ? dataCitiesInState : []}
        dataShipping={data}
        onPressGoBack={onPressGoBack}
        setSelectedCountry={setSelectedCountry}
        setSelectedState={setSelectedState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
