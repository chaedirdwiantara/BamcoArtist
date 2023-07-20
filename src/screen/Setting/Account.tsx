import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {AccountContent} from '../../components';
import {RootStackParams} from '../../navigations';
import {useSettingHook} from '../../hooks/use-setting.hook';
import {useLocationHook} from '../../hooks/use-location.hook';

type AccountProps = NativeStackScreenProps<RootStackParams, 'Account'>;

export const AccountScreen: React.FC<AccountProps> = ({
  navigation,
  route,
}: AccountProps) => {
  const {data, fromScreen} = route.params;
  const {
    dataAllCountry,
    dataCitiesOfCountry,
    getCitiesOfCountry,
    getDataAllCountry,
  } = useLocationHook();
  const {
    getListMoodGenre,
    getListRolesInIndustry,
    listRoles,
    listGenre,
    listMood,
  } = useSettingHook();
  const [selectedCountry, setSelectedCountry] = useState<number>(0);

  useEffect(() => {
    getDataAllCountry();
    getListMoodGenre({page: 0, perPage: 30});
    getListRolesInIndustry();
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedCountry(data.locationCountry?.id || 0);
    }
  }, [data]);

  useEffect(() => {
    if (selectedCountry > 0) {
      getCitiesOfCountry({id: selectedCountry});
    }
  }, [data, selectedCountry]);

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
          roles={listRoles}
          onPressGoBack={onPressGoBack}
          setSelectedCountry={setSelectedCountry}
          fromScreen={fromScreen}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
