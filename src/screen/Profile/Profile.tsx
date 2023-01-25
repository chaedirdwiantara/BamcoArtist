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

import Color from '../../theme/Color';
import {ProfileContent} from '../../components';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {MainTabParams, RootStackParams} from '../../navigations';

type ProfileProps = NativeStackScreenProps<MainTabParams, 'Profile'>;

export const ProfileScreen: React.FC<ProfileProps> = ({
  route,
}: ProfileProps) => {
  // const {showToast, deletePlaylist} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataProfile, getProfileUser} = useProfileHook();
  const {dataPlaylist, getPlaylist} = usePlaylistHook();
  const isFocused = useIsFocused();
  const {isPlay, showPlayer, hidePlayer} = usePlayerHook();

  const {dataDetailMusician, dataAlbum, getDetailMusician, getAlbum} =
    useMusicianHook();

  useEffect(() => {
    if (isFocused && isPlay) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
  }, [isFocused]);

  const uuid = dataProfile?.data.uuid;

  //  ? Get Detail Musician
  useFocusEffect(
    useCallback(() => {
      getProfileUser();
      if (uuid) {
        getDetailMusician({id: uuid});
        getAlbum({uuid});
        getPlaylist({uuid});
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

  const goToPlaylist = (id: number) => {
    navigation.navigate('Playlist', {id});
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
    bio: dataProfile?.data.bio || "I'm here to support the musician",
    backgroundUri: banners,
    avatarUri: avatar,
    totalFollowing: dataProfile?.data.following,
    totalFollowers: dataProfile?.data.followers,
    totalFans: dataProfile?.data.fans,
    totalRelease: 0,
    totalPlaylist: 0,
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
