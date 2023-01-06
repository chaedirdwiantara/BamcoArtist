import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {storage} from '../../hooks/use-storage.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {GuestContent, ProfileContent} from '../../components';
import {usePlayerHook} from '../../hooks/use-player.hook';

interface ProfileProps {
  props: {};
  route: any;
}

export const ProfileScreen: React.FC<ProfileProps> = (props: ProfileProps) => {
  const {params} = props?.route;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {isLoading, dataProfile, getProfileUser} = useProfileHook();
  const isLogin = storage.getString('profile');
  const isFocused = useIsFocused();
  const {isPlay, showPlayer, hidePlayer} = usePlayerHook();

  useEffect(() => {
    if (isFocused && isPlay) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
  }, [isFocused]);

  useEffect(() => {
    getProfileUser();
  }, [isLoading]);

  const onPressGoTo = (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => {
    navigation.navigate(screenName);
  };

  const goToEditProfile = () => {
    navigation.navigate('EditProfile', {...params, ...dataProfile});
  };

  const goToPlaylist = () => {
    navigation.navigate('Playlist', {...params});
  };

  const profile = {
    fullname: dataProfile?.data.fullname,
    username: '@' + dataProfile?.data.username,
    bio:
      params?.bio ||
      dataProfile?.data.about ||
      "I'm here to support the musician",
    backgroundUri:
      params?.backgroundUri?.path || dataProfile?.data?.banner || null,
    avatarUri: params?.avatarUri?.path || dataProfile?.data.imageProfileUrl,
    totalFollowing: dataProfile?.data.following,
  };

  return (
    <View style={styles.root}>
      {isLogin ? (
        <ProfileContent
          profile={profile}
          playlist={params}
          onPressGoTo={screenName => onPressGoTo(screenName)}
          goToEditProfile={goToEditProfile}
          goToPlaylist={goToPlaylist}
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
