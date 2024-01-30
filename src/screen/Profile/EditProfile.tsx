import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Platform, StyleSheet, KeyboardAvoidingView} from 'react-native';

import Color from '../../theme/Color';
import {EditProfile} from '../../components';
import {useSettingHook} from '../../hooks/use-setting.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {useLocationHook} from '../../hooks/use-location.hook';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

export const EditProfileScreen: React.FC = () => {
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
  const {isLoading, dataProfile, getProfileUser, deleteValueProfile} =
    useProfileHook();
  const [selectedCountry, setSelectedCountry] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      getProfileUser();
      getDataAllCountry();
      getListMoodGenre({page: 0, perPage: 30});
      getListRolesInIndustry();
    }, []),
  );

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

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.root}>
        {dataProfile && (
          <EditProfile
            dataProfile={dataProfile.data}
            deleteValueProfile={deleteValueProfile}
            dataAllCountry={dataAllCountry !== undefined ? dataAllCountry : []}
            dataCitiesOfCountry={
              dataCitiesOfCountry !== undefined ? dataCitiesOfCountry : []
            }
            moods={listMood}
            genres={listGenre}
            roles={listRoles}
            setSelectedCountry={setSelectedCountry}
          />
        )}
        <ModalLoading visible={isLoading} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
