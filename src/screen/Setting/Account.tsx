import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {AccountContent} from '../../components';
import {RootStackParams} from '../../navigations';
import {useSettingHook} from '../../hooks/use-setting.hook';
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
    getDataAllCountry,
    getCitiesOfCountry,
  } = useLocationHook();
  const {getListMoodGenre, listGenre, listMood} = useSettingHook();
  const [selectedCountry, setSelectedCountry] = useState<string>(
    data?.data.locationCountry || '',
  );

  useEffect(() => {
    getDataAllCountry();
    getListMoodGenre({page: 0, perPage: 30});
  }, []);

  useEffect(() => {
    getCitiesOfCountry({country: selectedCountry});
  }, [selectedCountry]);

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
          profile={data}
          moods={listMood}
          genres={listGenre}
          onPressGoBack={onPressGoBack}
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
