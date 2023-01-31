import React, {useState} from 'react';
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

import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {ModalSocMed} from '../Modal/ModalSocMed';
import {ProfileHeader} from './components/Header';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {ArrowLeftIcon, SaveIcon} from '../../../assets/icon';
import {heightPercentage, widthPercentage} from '../../../utils';

interface EditProfileProps {
  profile: any;
  type: string;
  onPressGoBack: () => void;
  onPressSave: (params: {bio: string; about: string}) => void;
  setUploadImage: (image: Image, type: string) => void;
  setResetImage: (type: string) => void;
  goToGallery: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  type,
  profile,
  onPressGoBack,
  onPressSave,
  setUploadImage,
  setResetImage,
}) => {
  const [bio, setBio] = useState(profile.bio || '');
  const [about, setAbout] = useState(profile.about || '');
  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
    modalSocMed: false,
  });
  const [uriType, setUriType] = useState('');
  const [uri, setUri] = useState({
    avatarUri: {path: null},
    backgroundUri: {path: null},
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
    closeModal();
  };

  const closeModal = () => {
    setModalVisible({
      modalConfirm: false,
      modalImage: false,
      modalSocMed: false,
    });
  };

  const sendUri = (val: Image) => {
    setUploadImage(val, uriType);
    setUri({...uri, [uriType]: val});
  };

  const sendMultipleUri = (val: Image[]) => {
    val.length <= 4 ? setPhotos([...photos, ...val]) : null;
  };

  const closeImage = (id: number) => {
    setPhotos(photos.filter((x: Image) => x.path !== photos[id].path));
  };

  const avatarUri = uri?.avatarUri?.path || profile.avatarUri || null;
  const backgroundUri =
    uri?.backgroundUri?.path || profile.backgroundUri || null;

  const titleModalPicker =
    uriType === 'avatarUri' ? 'Edit Display Profile' : 'Edit Header';
  const hideMenuDelete =
    uriType === 'avatarUri'
      ? avatarUri !== null && avatarUri !== ''
      : backgroundUri !== null && backgroundUri !== '';

  const newColorBio = bio.length === 110 ? Color.Error[400] : Color.Neutral[10];
  const newColorAbout =
    about.length === 600 ? Color.Error[400] : Color.Neutral[10];

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title="Edit Profile"
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
          avatarUri={avatarUri}
          backgroundUri={backgroundUri}
          fullname={profile.fullname}
          username={profile.username}
          containerStyles={{height: heightPercentage(206)}}
          iconPress={openModalImage}
        />

        <View style={styles.textAreaContainer}>
          <Text style={styles.title}>{'About'}</Text>
          <SsuInput.InputLabel
            label="Bio"
            placeholder="Tell us about yourself"
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
            label="About"
            placeholder="Tell us about yourself"
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
        titleModal={'Social Media'}
      />

      <ModalConfirm
        modalVisible={isModalVisible.modalConfirm}
        title="Edit Profile"
        subtitle="Are you sure to finish edit profile?"
        onPressClose={closeModal}
        onPressOk={() => onPressSave({bio, about})}
      />
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
