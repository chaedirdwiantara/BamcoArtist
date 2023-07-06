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
  const dataProfile = route.params;
  const {
    dataAllCountry,
    dataCitiesOfCountry,
    getDataAllCountry,
    getCitiesOfCountry,
  } = useLocationHook();
  const {
    getListMoodGenre,
    getListRolesInIndustry,
    listRoles,
    listGenre,
    listMood,
  } = useSettingHook();
  const [selectedCountry, setSelectedCountry] = useState<string>(
    dataProfile.locationCountry || '',
  );

  useEffect(() => {
    getDataAllCountry();
    getListMoodGenre({page: 0, perPage: 30});
    getListRolesInIndustry();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getCitiesOfCountry({country: selectedCountry});
    }
  }, [selectedCountry]);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {dataProfile && (
        <AccountContent
          dataAllCountry={dataAllCountry !== undefined ? dataAllCountry : []}
          dataCitiesOfCountry={
            dataCitiesOfCountry !== undefined ? dataCitiesOfCountry : []
          }
          profile={dataProfile}
          moods={listMood}
          genres={listGenre}
          roles={listRoles}
          onPressGoBack={onPressGoBack}
          setSelectedCountry={setSelectedCountry}
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
