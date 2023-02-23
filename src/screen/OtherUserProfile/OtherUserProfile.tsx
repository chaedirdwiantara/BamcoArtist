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
import {GuestContent, ProfileContent} from '../../components';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {OtherUserProfileContent} from './OtherUserProfileContent';

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
  const {isPlaying, showPlayer, hidePlayer} = usePlayerHook();

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
  };

  return (
    <View style={styles.root}>
      {isLogin ? (
        <OtherUserProfileContent
          profile={profile}
          selfProfile={dataFansProfile}
          goToPlaylist={() => {}}
          dataPlaylist={dataPlaylist}
          goToEditProfile={() => {}}
          onPressGoTo={() => {}}
          totalCountlikedSong={dataCountLiked?.countLikedSong}
        />
      ) : isLogin && isLoading ? (
        <ModalLoading visible={isLoading} />
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
