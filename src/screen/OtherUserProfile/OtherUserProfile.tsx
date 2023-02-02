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

type OtherProfileProps = NativeStackScreenProps<
  RootStackParams,
  'OtherUserProfile'
>;

export const OtherUserProfile: FC<OtherProfileProps> = ({
  route,
}: OtherProfileProps) => {
  const data = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataFansProfile, isLoading, getOtherProfileUser} = useProfileHook();
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
      getPlaylist();
      getOtherProfileUser({id: data.id});
    }, []),
  );

  const profile = {
    fullname: dataFansProfile?.data.fullname,
    username: '@' + dataFansProfile?.data.username,
    bio: dataFansProfile?.data.about,
    backgroundUri:
      dataFansProfile?.data?.banners.length !== 0
        ? dataFansProfile?.data?.banners[3].image
        : '',
    avatarUri:
      dataFansProfile?.data.images.length !== 0
        ? dataFansProfile?.data.images[1].image
        : '',
    totalFollowing: dataFansProfile?.data.following,
  };

  return (
    <View style={styles.root}>
      {isLogin ? (
        <ProfileContent
          profile={profile}
          goToPlaylist={() => {}}
          dataPlaylist={dataPlaylist}
          goToEditProfile={() => {}}
          onPressGoTo={() => {}}
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
