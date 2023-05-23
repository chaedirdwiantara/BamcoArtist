import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import Color from '../../theme/Color';
import {ProfileContent} from '../../components';
import {storage} from '../../hooks/use-storage.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {useSettingHook} from '../../hooks/use-setting.hook';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {MainTabParams, RootStackParams} from '../../navigations';

type ProfileProps = NativeStackScreenProps<MainTabParams, 'Profile'>;

export const ProfileScreen: React.FC<ProfileProps> = ({
  route,
}: ProfileProps) => {
  const {showToast, deletePlaylist} = route.params;

  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataProfile, dataCountProfile, getProfileUser, getTotalCountProfile} =
    useProfileHook();
  const isFetching = storage.getBoolean('fetchingProfile');
  const {dataPlaylist, getPlaylist} = usePlaylistHook();
  const {dataExclusiveContent, getExclusiveContent} = useSettingHook();
  const {dataDetailMusician, dataAlbum, getDetailMusician, getAlbum} =
    useMusicianHook();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const uuid = dataProfile?.data.uuid;

  useEffect(() => {
    getProfileUser();
    if (uuid) {
      getTotalCountProfile({uuid});
      getDetailMusician({id: uuid});
      getAlbum({uuid});
      getPlaylist({uuid});
      getExclusiveContent({uuid});
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    storage.set('fetchingProfile', false);
  }, [uuid, refreshing, showToast, deletePlaylist, isFetching]);

  useEffect(() => {
    if (showToast && !deletePlaylist) {
      setToastVisible(showToast);
      setToastText('Your Profile have been updated!');
    } else if (deletePlaylist) {
      setToastVisible(deletePlaylist);
      setToastText('Playlist have been deleted!');
    }
  }, [route.params]);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  const onPressGoTo = (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => {
    navigation.navigate(screenName);
  };

  const goToEditProfile = () => {
    if (dataProfile !== undefined) {
      navigation.navigate('EditProfile', {...dataProfile?.data});
    }
  };

  const goToPlaylist = (id: number, name: string) => {
    navigation.navigate('Playlist', {id, name});
  };

  const goToFollowers = () => {
    uuid && navigation.navigate('Followers', {uuid});
  };

  const banners =
    dataProfile?.data !== undefined && dataProfile?.data.banners?.length > 0
      ? dataProfile?.data.banners[2].image
      : null;

  const avatar =
    dataProfile?.data !== undefined &&
    dataProfile?.data.imageProfileUrls?.length > 0
      ? dataProfile?.data.imageProfileUrls[2].image
      : null;

  const profile = {
    fullname: dataProfile?.data.fullname,
    username: '@' + dataProfile?.data.username,
    bio: dataProfile?.data.bio || t('Profile.Label.Description'),
    backgroundUri: banners,
    avatarUri: avatar,
    totalFollowing: dataProfile?.data.following,
    totalFollowers: dataProfile?.data.followers,
    totalFans: dataProfile?.data.fans,
    totalRelease: dataCountProfile?.countAlbumReleased,
    totalPlaylist: dataCountProfile?.countPlaylist,
    rank: dataProfile?.data.rank || 0,
  };

  return (
    <View style={styles.root}>
      {dataProfile?.data && (
        <ProfileContent
          profile={profile}
          goToPlaylist={goToPlaylist}
          dataPlaylist={dataPlaylist}
          goToEditProfile={goToEditProfile}
          onPressGoTo={screenName => onPressGoTo(screenName)}
          uuid={uuid}
          dataAlbum={dataAlbum}
          dataDetailMusician={dataDetailMusician}
          ownProfile
          goToFollowers={goToFollowers}
          exclusiveContent={dataExclusiveContent ?? undefined}
          toastVisible={toastVisible}
          setToastVisible={setToastVisible}
          toastText={toastText}
          refreshing={refreshing}
          setRefreshing={() => setRefreshing(true)}
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
