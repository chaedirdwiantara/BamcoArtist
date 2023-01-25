import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'react-native-image-crop-picker';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Color from '../../theme/Color';
import {EditProfile} from '../../components';
import {uploadImage} from '../../api/uploadImage.api';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {MainTabParams, RootStackParams} from '../../navigations';

type EditProfileProps = NativeStackScreenProps<RootStackParams, 'EditProfile'>;

export const EditProfileScreen: React.FC<EditProfileProps> = ({
  navigation,
  route,
}: EditProfileProps) => {
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const dataProfile = route.params;
  const banners =
    dataProfile !== undefined && dataProfile.banners?.length > 0
      ? dataProfile.banners[2].image
      : null;

  const avatar =
    dataProfile !== undefined && dataProfile.imageProfileUrls?.length > 0
      ? dataProfile.imageProfileUrls[2].image
      : null;
  const {updateProfileUser} = useProfileHook();

  const [avatarUri, setAvatarUri] = useState(avatar || '');
  const [backgroundUri, setBackgroundUri] = useState(banners || '');
  const [photos, setPhotos] = useState<string[]>([]);

  const goBack = () => {
    navigation.goBack();
  };

  const onPressSave = (param: {bio: string; about: string}) => {
    updateProfileUser({
      bio: param.bio,
      about: param.about,
      imageProfileUrl: avatarUri,
      banner: backgroundUri,
    });
    navigation2.navigate('Profile', {showToast: true});
  };

  const setResetImage = (type: string) => {
    type === 'avatarUri' ? setAvatarUri('') : setBackgroundUri('');
  };

  const setUploadImage = async (image: Image, type: string) => {
    try {
      const response = await uploadImage(image);
      if (type === 'avatarUri') {
        setAvatarUri(response.data);
      } else if (type === 'backgroundUri') {
        setBackgroundUri(response.data);
      } else {
        setPhotos([response.data, photos]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const profile = {
    fullname: dataProfile?.fullname,
    username: '@' + dataProfile?.username,
    bio: dataProfile?.bio || "I'm here to support the musician",
    about: dataProfile?.about,
    avatarUri: avatarUri,
    backgroundUri: backgroundUri,
  };

  return (
    <View style={styles.root}>
      <EditProfile
        profile={profile}
        type={'edit'}
        onPressGoBack={goBack}
        onPressSave={onPressSave}
        setUploadImage={(image: Image, type: string) =>
          setUploadImage(image, type)
        }
        setResetImage={(type: string) => {
          setResetImage(type);
        }}
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
