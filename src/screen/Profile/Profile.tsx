import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import Color from '../../theme/Color';
import {MainTabParams, RootStackParams} from '../../navigations';
import {ProfileContent} from '../../components';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {useSettingHook} from '../../hooks/use-setting.hook';

type ProfileProps = NativeStackScreenProps<MainTabParams, 'Profile'>;

export const ProfileScreen: React.FC<ProfileProps> = ({
  route,
}: ProfileProps) => {
  // const {showToast, deletePlaylist} = route.params;

  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    isLoading,
    dataProfile,
    dataCountProfile,
    getProfileUser,
    getTotalCountProfile,
  } = useProfileHook();
  const {playlistLoading, dataPlaylist, getPlaylist} = usePlaylistHook();
  const isFocused = useIsFocused();
  const {isPlaying, showPlayer, hidePlayer} = usePlayerHook();
  const {dataExclusiveContent, getExclusiveContent} = useSettingHook();

  const {dataDetailMusician, dataAlbum, getDetailMusician, getAlbum} =
    useMusicianHook();

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
  }, [isFocused, isPlaying]);

  const uuid = dataProfile?.data.uuid;

  //  ? Get Detail Musician
  useFocusEffect(
    useCallback(() => {
      getProfileUser();
      if (uuid) {
        getTotalCountProfile({uuid});
        getDetailMusician({id: uuid});
        getAlbum({uuid});
        getPlaylist({uuid});
        getExclusiveContent({uuid});
      }
    }, [uuid]),
  );

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
    rank: 0,
  };

  return (
    <View style={styles.root}>
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
      />

      <ModalLoading visible={isLoading || playlistLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
