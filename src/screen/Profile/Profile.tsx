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
import {MainTabParams, RootStackParams} from '../../navigations';
import {storage} from '../../hooks/use-storage.hook';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {GuestContent, ProfileContent} from '../../components';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {useMusicianHook} from '../../hooks/use-musician.hook';

type ProfileProps = NativeStackScreenProps<MainTabParams, 'Profile'>;

export const ProfileScreen: React.FC<ProfileProps> = (props: ProfileProps) => {
  const params = props?.route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataProfile, getProfileUser} = useProfileHook();
  const {dataPlaylist, getPlaylist} = usePlaylistHook();
  const isLogin = storage.getString('profile');
  const isFocused = useIsFocused();
  const {isPlay, showPlayer, hidePlayer} = usePlayerHook();

  const {
    isLoading,
    isError,
    dataDetailMusician,
    dataAlbum,
    getDetailMusician,
    getAlbum,
  } = useMusicianHook();

  useEffect(() => {
    if (isFocused && isPlay) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      getPlaylist();
      getProfileUser();
    }, []),
  );

  const uuid = dataProfile?.data.uuid;

  //  ? Get Detail Musician
  useFocusEffect(
    useCallback(() => {
      if (uuid) {
        getDetailMusician({id: uuid});
        getAlbum({uuid: uuid});
      }
    }, [uuid]),
  );

  const onPressGoTo = (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => {
    navigation.navigate(screenName);
  };

  const goToEditProfile = () => {
    navigation.navigate('EditProfile', {...dataProfile});
  };

  const goToPlaylist = (id: number) => {
    navigation.navigate('Playlist', {id});
  };

  const profile = {
    fullname: dataProfile?.data.fullname,
    username: '@' + dataProfile?.data.username,
    bio: dataProfile?.data.about || "I'm here to support the musician",
    backgroundUri: dataProfile?.data?.banner || null,
    avatarUri: dataProfile?.data.imageProfileUrl,
    totalFollowing: dataProfile?.data.following,
    totalFollowers: dataProfile?.data.followers,
    totalFans: dataProfile?.data.fans,
    totalRelease: 0,
    totalPlaylist: 0,
    rank: 0,
  };

  return (
    <View style={styles.root}>
      {isLogin && uuid ? (
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
      ) : (
        <GuestContent />
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
