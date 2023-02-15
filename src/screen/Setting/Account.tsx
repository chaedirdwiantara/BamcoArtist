import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {AccountContent} from '../../components';
import {RootStackParams} from '../../navigations';
import {useLocationHook} from '../../hooks/use-location.hook';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

type AccountProps = NativeStackScreenProps<RootStackParams, 'Account'>;

export const AccountScreen: React.FC<AccountProps> = ({
  navigation,
  route,
}: AccountProps) => {
  const {data} = route.params;
  const {
    dataAllCountry,
    dataCitiesOfCountry,
    dataCitiesOfOrigin,
    getDataAllCountry,
    getCitiesOfCountry,
  } = useLocationHook();
  const [selectedOrigin, setSelectedOrigin] = useState<string>(
    data?.data.originCountry || '',
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    data?.data.locationCountry || '',
  );
  const [inputType, setInputType] = useState<string>('location');
  const [firstFetch, setFirstFetch] = useState<boolean>(true);

  useEffect(() => {
    getDataAllCountry();
  }, []);

  useEffect(() => {
    if (firstFetch) {
      getCitiesOfCountry({country: selectedOrigin}, {type: 'origin'});
      getCitiesOfCountry({country: selectedCountry}, {type: 'location'});
      setFirstFetch(false);
    } else {
      const country =
        inputType === 'location' ? selectedCountry : selectedOrigin;
      getCitiesOfCountry({country}, {type: inputType});
    }
  }, [selectedCountry, selectedOrigin]);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {data && (
        <AccountContent
          dataAllCountry={dataAllCountry !== undefined ? dataAllCountry : []}
          dataCitiesOfCountry={
            dataCitiesOfCountry !== undefined ? dataCitiesOfCountry : []
          }
          dataCitiesOfOrigin={
            dataCitiesOfOrigin !== undefined ? dataCitiesOfOrigin : []
          }
          profile={data}
          onPressGoBack={onPressGoBack}
          setInputType={setInputType}
          setSelectedOrigin={setSelectedOrigin}
          setSelectedCountry={setSelectedCountry}
        />
      )}
      <ModalLoading visible={!data} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
