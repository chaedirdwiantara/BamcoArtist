import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../../theme/Color';
import {AccountContent} from '../../../components';
import {RootStackParams} from '../../../navigations';
import {useSettingHook} from '../../../hooks/use-setting.hook';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {useLocationHook} from '../../../hooks/use-location.hook';

type AccountInformationProps = NativeStackScreenProps<
  RootStackParams,
  'AccountInformation'
>;
export const AccountInformationScreen: React.FC<AccountInformationProps> = ({
  navigation,
  route,
}: AccountInformationProps) => {
  const {fromScreen} = route.params;
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
  const {dataProfile, getProfileUser} = useProfileHook();
  const [selectedCountry, setSelectedCountry] = useState<number>(0);

  useEffect(() => {
    getDataAllCountry();
    getListMoodGenre({page: 0, perPage: 30});
    getListRolesInIndustry();
    getProfileUser();
  }, []);

  useEffect(() => {
    if (dataProfile?.data) {
      setSelectedCountry(dataProfile.data.locationCountry?.id || 0);
    }
  }, [dataProfile]);

  useEffect(() => {
    if (selectedCountry > 0) {
      getCitiesOfCountry({id: selectedCountry});
    }
  }, [dataProfile, selectedCountry]);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {dataProfile?.data && (
        <AccountContent
          dataAllCountry={dataAllCountry !== undefined ? dataAllCountry : []}
          dataCitiesOfCountry={
            dataCitiesOfCountry !== undefined ? dataCitiesOfCountry : []
          }
          profile={dataProfile.data}
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
