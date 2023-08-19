import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../../theme/Color';
import {RootStackParams} from '../../../navigations';
import {AddShippingAddress} from '../../../components';
import {useLocationHook} from '../../../hooks/use-location.hook';

type AddNewAddressProps = NativeStackScreenProps<
  RootStackParams,
  'AddNewAddress'
>;
export const AddNewAddressScreen: React.FC<AddNewAddressProps> = ({
  navigation,
  route,
}: AddNewAddressProps) => {
  const {data, from} = route.params;
  const onPressGoBack = () => {
    navigation.goBack();
  };

  const {
    dataAllCountry,
    dataCitiesOfCountry,
    getDataAllCountryShipping,
    getCitiesOfCountry,
  } = useLocationHook();
  const [selectedCountry, setSelectedCountry] = useState<string>(
    data?.country || '',
  );

  useEffect(() => {
    getDataAllCountryShipping();
  }, []);

  useEffect(() => {
    if (selectedCountry && dataAllCountry.length > 0) {
      // get id of selected country & send to get data city by country
      const filteredCountry = dataAllCountry.filter(
        val => val.value === selectedCountry,
      )[0].id;

      getCitiesOfCountry({id: filteredCountry});
    }
  }, [data, selectedCountry, dataAllCountry]);

  return (
    <View style={styles.root}>
      <AddShippingAddress
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
