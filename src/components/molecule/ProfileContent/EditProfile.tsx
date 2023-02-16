import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {Image} from 'react-native-image-crop-picker';

import {ModalConfirm} from '../..';
import {Gap, SsuInput} from '../../atom';

import ListPhotos from './ListPhotos';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {ModalSocMed} from '../Modal/ModalSocMed';
import {ProfileHeader} from './components/Header';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {ArrowLeftIcon, SaveIcon} from '../../../assets/icon';
import {heightPercentage, widthPercentage} from '../../../utils';
import ProfileComponent from '../../../screen/MusicianProfile/ProfileComponent';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {useTranslation} from 'react-i18next';
import {ParamsProps} from '../../../interface/base.interface';

interface EditProfileProps {
  profile: any;
  type: string;
  onPressGoBack: () => void;
  onPressSave: (params: {bio: string; about: string; website: string}) => void;
  setUploadImage: (image: Image, type: string) => void;
  setResetImage: (type: string) => void;
  goToGallery: () => void;
  deleteValueProfile: (props?: ParamsProps) => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  type,
  profile,
  onPressGoBack,
  onPressSave,
  setUploadImage,
  setResetImage,
  deleteValueProfile,
}) => {
  const {t} = useTranslation();
  const {dataProfile, getProfileUser} = useProfileHook();
  const [bio, setBio] = useState(profile.bio || '');
  const [about, setAbout] = useState(profile.about || '');
  const [website, setWebsite] = useState(profile.website || '');
  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
    modalSocMed: false,
  });
  const [uriType, setUriType] = useState('');
  const [uri, setUri] = useState({
    avatarUri: {path: profile.avatarUri || null},
    backgroundUri: {path: profile.backgroundUri || null},
  });
  const [photos, setPhotos] = useState<Image[]>([]);

  const openModalConfirm = () => {
    setModalVisible({
      modalConfirm: true,
      modalSocMed: false,
      modalImage: false,
    });
  };

  const openModalImage = (newType: string) => {
    setModalVisible({
      modalImage: true,
      modalSocMed: false,
      modalConfirm: false,
    });
    setUriType(newType);
  };

  const openModalSocMed = () => {
    setModalVisible({
      modalSocMed: true,
      modalConfirm: false,
      modalImage: false,
    });
  };

  const resetImage = () => {
    setUri({...uri, [uriType]: null});
    setResetImage(uriType);

    // call api delete image
    const valueName = uriType === 'avatarUri' ? 'imageProfileUrl' : 'banner';
    deleteValueProfile({
      context: valueName,
    });
    closeModal();
  };

  const closeModal = () => {
    setModalVisible({
      modalConfirm: false,
      modalImage: false,
      modalSocMed: false,
    });
    getProfileUser();
  };

  const sendUri = (val: Image) => {
    setUploadImage(val, uriType);
    setUri({...uri, [uriType]: val});
  };

  const sendMultipleUri = (val: Image[]) => {
    setPhotos([...photos, ...val]);
    for (let i = 0; i < val.length; i++) {
      setUploadImage(val[i], 'photos');
    }
  };

  const closeImage = (id: number) => {
    setPhotos(photos.filter((x: Image) => x.path !== photos[id].path));
  };

  const titleModalPicker =
    uriType === 'avatarUri'
      ? t('Profile.Edit.ProfilePicture')
      : t('Profile.Edit.HeaderPicture');
  const hideMenuDelete =
    uriType === 'avatarUri'
      ? uri.avatarUri !== null && uri.avatarUri?.path !== null
      : uri.backgroundUri !== null && uri.backgroundUri?.path !== null;

  const newColorBio = bio.length === 110 ? Color.Error[400] : Color.Neutral[10];
  const newColorAbout =
    about.length === 600 ? Color.Error[400] : Color.Neutral[10];

  useEffect(() => {
    getProfileUser();
  }, []);

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title={t('Profile.Edit.Title')}
        rightIcon={<SaveIcon />}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        rightIconAction={openModalConfirm}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />
      <ScrollView>
        <ProfileHeader
          type={type}
          avatarUri={uri.avatarUri?.path}
          backgroundUri={uri.backgroundUri?.path}
          fullname={profile.fullname}
          username={profile.username}
          containerStyles={{height: heightPercentage(206)}}
          iconPress={openModalImage}
        />

        <View style={styles.textAreaContainer}>
          <Text style={styles.title}>{t('Musician.Label.About')}</Text>
          <SsuInput.InputLabel
            label={t('Profile.Edit.Bio') || ''}
            placeholder={t('Profile.Edit.About') || ''}
            value={bio}
            multiline
            maxLength={110}
            onChangeText={(newText: string) => setBio(newText)}
            containerStyles={{marginTop: heightPercentage(15)}}
          />
          <Text
            style={[
              styles.length,
              {color: newColorBio},
            ]}>{`${bio.length}/110`}</Text>
        </View>

        <View style={styles.textAreaContainer}>
          <SsuInput.InputLabel
            label={t('Musician.Label.About') || ''}
            placeholder={t('Profile.Edit.About') || ''}
            value={about}
            multiline
            maxLength={600}
            onChangeText={(newText: string) => setAbout(newText)}
            containerStyles={{marginTop: heightPercentage(15)}}
          />
          <Text
            style={[
              styles.length,
              {color: newColorAbout},
            ]}>{`${about.length}/600`}</Text>
        </View>

        <View style={styles.textAreaContainer}>
          <SsuInput.InputLabel
            label={t('Musician.Label.Website')}
            placeholder={t('Profile.Edit.Website')}
            value={website}
            onChangeText={(newText: string) => setWebsite(newText)}
            containerStyles={{marginTop: heightPercentage(15)}}
          />
          <Text
            style={[
              styles.length,
              {color: newColorAbout},
            ]}>{`${about.length}/600`}</Text>
        </View>

        <View style={styles.textAreaContainer}>
          <Text style={styles.title}>{t('Musician.Label.Social')}</Text>
          <TouchableOpacity onPress={openModalSocMed}>
            <Text style={styles.addText}>{`+ ${t(
              'Profile.Edit.Social',
            )}`}</Text>
          </TouchableOpacity>
          <ProfileComponent
            title=""
            gap={0}
            socmedSection
            socmed={dataProfile?.data.socialMedia ?? []}
            containerStyles={{paddingHorizontal: 0}}
          />
        </View>

        <View
          style={[
            styles.textAreaContainer,
            {marginBottom: heightPercentage(30)},
          ]}>
          <Text style={styles.title}>{t('Musician.Label.Photos')}</Text>
          <TouchableOpacity onPress={() => openModalImage('photos')}>
            <Text style={styles.addText}>{`+ ${t(
              'Profile.Edit.Photos',
            )}`}</Text>
          </TouchableOpacity>
          <Gap height={heightPercentage(20)} />
          <ListPhotos data={photos} photoOnpress={() => null} />
        </View>
      </ScrollView>

      <ModalImagePicker
        title={titleModalPicker}
        modalVisible={isModalVisible.modalImage}
        sendUri={sendUri}
        sendUriMultiple={sendMultipleUri}
        onDeleteImage={resetImage}
        onPressClose={closeModal}
        hideMenuDelete={hideMenuDelete && uriType !== 'photos'}
        multiple={uriType === 'photos'}
      />

      <ModalSocMed
        modalVisible={isModalVisible.modalSocMed}
        onPressClose={closeModal}
        titleModal={t('Musician.Label.Social')}
      />

      <ModalConfirm
        modalVisible={isModalVisible.modalConfirm}
        title={t('Modal.EditProfile.Title') || ''}
        subtitle={t('Modal.EditProfile.Subtitle') || ''}
        onPressClose={closeModal}
        onPressOk={() => onPressSave({bio, about, website})}
      />

      {/* <ModalLoading visible={isLoading || loadingUpload} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  label: {
    fontSize: mvs(12),
    color: Color.Dark[50],
    marginBottom: heightPercentage(5),
    marginTop: heightPercentage(20),
    lineHeight: heightPercentage(20),
  },
  textAreaContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  textArea: {
    paddingHorizontal: 0,
  },
  inputBio: {
    textAlignVertical: 'top',
    paddingHorizontal: widthPercentage(10),
    height: Platform.OS === 'ios' ? heightPercentage(60) : undefined,
  },
  length: {
    fontSize: mvs(12),
    marginTop: heightPercentage(5),
  },
  title: {
    fontSize: mvs(13),
    color: Color.Success[500],
    fontFamily: Font.InterSemiBold,
    marginTop: heightPercentage(20),
  },
  addText: {
    fontSize: mvs(12),
    color: Color.Pink[2],
    fontFamily: Font.InterRegular,
    marginTop: heightPercentage(10),
  },
});
