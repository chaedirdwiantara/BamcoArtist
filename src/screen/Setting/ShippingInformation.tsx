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
  const {data, from} = route.params;
  const onPressGoBack = () => {
    navigation.goBack();
  };

  const {
    dataAllCountry,
    dataCitiesOfCountry,
    getDataAllCountry,
    getCitiesOfCountry,
  } = useLocationHook();
  const [selectedCountry, setSelectedCountry] = useState<number>(
    Number(data?.country) || 0,
  );

  useEffect(() => {
    getDataAllCountry();
  }, []);

  useEffect(() => {
    if (selectedCountry > 0) {
      getCitiesOfCountry({id: selectedCountry});
    }
  }, [data, selectedCountry]);

  return (
    <View style={styles.root}>
      <ShippingInformationContent
        dataAllCountry={dataAllCountry !== undefined ? dataAllCountry : []}
        dataCities={
          dataCitiesOfCountry !== undefined ? dataCitiesOfCountry : []
        }
        dataShipping={data}
        onPressGoBack={onPressGoBack}
        setSelectedCountry={setSelectedCountry}
        from={from}
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
