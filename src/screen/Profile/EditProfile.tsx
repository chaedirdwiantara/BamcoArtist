import React, {useState} from 'react';
import {
  View,
  Platform,
  StyleSheet,
  InteractionManager,
  KeyboardAvoidingView,
} from 'react-native';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';

import Color from '../../theme/Color';
import {EditProfile} from '../../components';
import {uploadImage} from '../../api/uploadImage.api';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {MainTabParams, RootStackParams} from '../../navigations';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

type EditProfileProps = NativeStackScreenProps<RootStackParams, 'EditProfile'>;

export const EditProfileScreen: React.FC<EditProfileProps> = ({
  navigation,
  route,
}: EditProfileProps) => {
  const {t} = useTranslation();
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const dataProfile = route.params.data;
  const banners =
    dataProfile !== undefined && dataProfile.banners?.length > 0
      ? dataProfile.banners[2].image
      : null;

  const avatar =
    dataProfile !== undefined && dataProfile.imageProfileUrls?.length > 0
      ? dataProfile.imageProfileUrls[2].image
      : null;

  const photos =
    dataProfile !== undefined && dataProfile.photos?.length > 0
      ? dataProfile.photos
      : [];

  const {updateProfileUser, addCollectPhotos, deleteValueProfile} =
    useProfileHook();

  const [avatarUri, setAvatarUri] = useState(avatar || '');
  const [backgroundUri, setBackgroundUri] = useState(banners || '');
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);

  const goBack = () => {
    navigation.goBack();
  };

  const onPressSave = async (param: {
    bio: string;
    about: string;
    website: string;
    photos: string[];
  }) => {
    await updateProfileUser({
      bio: param.bio,
      about: param.about,
      Website: param.website,
      imageProfileUrl: avatarUri,
      banner: backgroundUri,
    });
    await addCollectPhotos({photos: param.photos});
    setTimeout(() => {
      navigation2.navigate('Profile', {showToast: true});
    }, 500);
  };

  const setResetImage = (type: string) => {
    type === 'avatarUri' ? setAvatarUri('') : setBackgroundUri('');
  };

  const setUploadPhoto = async (image: Image, type: string) => {
    InteractionManager.runAfterInteractions(() => setLoadingUpload(true));
    try {
      const response = await uploadImage(image);
      if (type === 'avatarUri') {
        setAvatarUri(response.data);
      } else if (type === 'backgroundUri') {
        setBackgroundUri(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpload(false);
    }
  };

  const userName = dataProfile?.fullname;

  const goToGallery = (photo: Image[]) => {
    navigation.navigate('PhotoGallery', {
      userName,
      imageData: photo,
      type: 'editProfile',
    });
  };

  const profile = {
    fullname: dataProfile?.fullname,
    username: '@' + dataProfile?.username,
    bio: dataProfile?.bio || t('Profile.Label.Description'),
    about: dataProfile?.about,
    website: dataProfile?.website,
    avatarUri: avatarUri,
    backgroundUri: backgroundUri,
    photos: photos,
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.root}>
        <EditProfile
          profile={profile}
          type={'edit'}
          onPressGoBack={goBack}
          onPressSave={onPressSave}
          setUploadPhoto={(image: Image, type: string) =>
            setUploadPhoto(image, type)
          }
          setResetImage={(type: string) => {
            setResetImage(type);
          }}
          goToGallery={goToGallery}
          deleteValueProfile={deleteValueProfile}
        />
        <ModalLoading visible={loadingUpload} />
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
