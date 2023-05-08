import React, {FC, useCallback, useEffect} from 'react';
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
import {RootStackParams} from '../../navigations';
import {storage} from '../../hooks/use-storage.hook';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {OtherUserProfileContent} from './OtherUserProfileContent';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

type OtherProfileProps = NativeStackScreenProps<
  RootStackParams,
  'OtherUserProfile'
>;

type profile = {
  fullname: string;
  username: string;
  bio: string;
  backgroundUri: string;
  avatarUri: string;
  totalFollowing: number;
  totalPoint: number;
};

export const OtherUserProfile: FC<OtherProfileProps> = ({
  route,
}: OtherProfileProps) => {
  const data = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    dataFansProfile,
    isLoading,
    getOtherProfileUser,
    dataCountLiked,
    getUserCountLikedSong,
  } = useProfileHook();
  const {dataPlaylist, getPlaylist} = usePlaylistHook();
  const isLogin = storage.getString('profile');
  const isFocused = useIsFocused();
  const {
    isPlaying,
    visible: playerVisible,
    showPlayer,
    hidePlayer,
  } = usePlayerHook();

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      getPlaylist({uuid: data.id});
      getOtherProfileUser({id: data.id});
      getUserCountLikedSong({uuid: data.id});
    }, []),
  );

  const profile: profile = {
    fullname:
      dataFansProfile?.data.fullname !== undefined
        ? dataFansProfile.data.fullname
        : '',
    username: '@' + dataFansProfile?.data.username,
    bio: dataFansProfile?.data.about ? dataFansProfile?.data.about : '',
    backgroundUri:
      dataFansProfile && dataFansProfile?.data?.banners.length !== 0
        ? dataFansProfile?.data?.banners[3].image
        : '',
    avatarUri:
      dataFansProfile && dataFansProfile?.data.images.length !== 0
        ? dataFansProfile?.data.images[1].image
        : '',
    totalFollowing:
      dataFansProfile && dataFansProfile.data.following
        ? dataFansProfile?.data.following
        : 0,
    totalPoint:
      dataFansProfile && dataFansProfile.data.point.daily
        ? dataFansProfile.data.point.daily
        : 0,
  };

  const goToPlaylist = (id: number, name: string) => {
    navigation.navigate('Playlist', {id, name, from: 'other'});
  };

  const goToFollowing = () => {
    navigation.navigate('Following', {uuid: data.id});
  };

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {isLogin && (
        <OtherUserProfileContent
          profile={profile}
          selfProfile={dataFansProfile}
          goToPlaylist={goToPlaylist}
          dataPlaylist={dataPlaylist}
          goToEditProfile={() => {}}
          onPressGoTo={goToFollowing}
          totalCountlikedSong={dataCountLiked?.countLikedSong}
          playerVisible={playerVisible}
          otherUserProfile={true}
          onPressGoBack={onPressGoBack}
        />
      )}
      <ModalLoading visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
