import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {Image} from 'react-native-image-crop-picker';

import {ModalConfirm} from '../..';
import ListPhotos from './ListPhotos';
import Font from '../../../theme/Font';
import {Gap, SsuInput} from '../../atom';
import Color from '../../../theme/Color';
import {ModalLimit} from '../Modal/ModalLimit';
import {TopNavigation} from '../TopNavigation';
import {ModalSocMed} from '../Modal/ModalSocMed';
import {ProfileHeader} from './components/Header';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {ArrowLeftIcon, SaveIcon} from '../../../assets/icon';
import {ParamsProps} from '../../../interface/base.interface';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {heightPercentage, widthPercentage} from '../../../utils';
import {useUploadImageHook} from '../../../hooks/use-uploadImage.hook';
import ProfileComponent from '../../../screen/MusicianProfile/ProfileComponent';

interface EditProfileProps {
  profile: any;
  type: string;
  onPressGoBack: () => void;
  onPressSave: (params: {
    bio: string;
    about: string;
    website: string;
    photos: string[];
  }) => void;
  setUploadPhoto: (image: Image, type: string) => void;
  setResetImage: (type: string) => void;
  goToGallery: (photos: Image[]) => void;
  deleteValueProfile: (props?: ParamsProps) => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  type,
  profile,
  onPressGoBack,
  onPressSave,
  setUploadPhoto,
  setResetImage,
  deleteValueProfile,
  goToGallery,
}) => {
  const {t} = useTranslation();
  const {dataProfile, getProfileUser, removeCollectPhotos} = useProfileHook();
  const {isLoadingImage, dataImage, setUploadImage} = useUploadImageHook();

  const [bio, setBio] = useState(profile.bio || '');
  const [about, setAbout] = useState(profile.about || '');
  const [website, setWebsite] = useState(profile.website || '');
  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
    modalSocMed: false,
    modalLimit: false,
  });
  const [uriType, setUriType] = useState('');
  const [uri, setUri] = useState({
    avatarUri: {path: profile.avatarUri || null},
    backgroundUri: {path: profile.backgroundUri || null},
  });
  const [photos, setPhotos] = useState<Image[]>([]);
  const [unUploadedPhotos, setUnUploadedPhotos] = useState<Image[]>([]);
  const [dataResponseImg, setDataResponseImg] = useState<string[]>([]);
  const [active, setActive] = useState<boolean>(false);
  const [savedPhotos, setSavedPhotos] = useState<number>(0);
  const [modalLimitType, setModalLimitType] = useState<string>('');

  // handle if user already have photos
  useEffect(() => {
    if (profile?.photos.length > 0) {
      let newPhotos: Image[] = [];
      let newDataResponseImg: string[] = [];
      profile.photos.map((val: {images: {image: string}[]}, i: number) => {
        if (val.images.length > 0) {
          const newPath = val.images[0]?.image;
          newPhotos.push({
            path: newPath,
            size: i,
            filename: `${i.toString()}.jpg`,
            width: 0, // default value
            height: 0, // default value
            mime: '', // default value
          });
          newDataResponseImg.push(newPath);
        }
      });

      setPhotos(newPhotos);
      setDataResponseImg(newDataResponseImg);
      setSavedPhotos(newDataResponseImg.length);
    }
  }, []);

  // call EP setUploadImage for images that have not been added
  useEffect(() => {
    if (unUploadedPhotos.length > 0 && active) {
      for (let i = 0; i < unUploadedPhotos.length; i++) {
        setUploadImage(unUploadedPhotos[i]);
      }
    }
  }, [unUploadedPhotos]);

  // only active when uploading, not removing
  useEffect(() => {
    if (active) {
      dataImage?.data !== undefined && !dataResponseImg.includes(dataImage.data)
        ? setDataResponseImg([...dataResponseImg, dataImage?.data])
        : null;
    }
  }, [dataImage]);

  const openModalConfirm = () => {
    setModalVisible({
      modalConfirm: true,
      modalSocMed: false,
      modalImage: false,
      modalLimit: false,
    });
  };

  const openModalImage = (newType: string) => {
    setModalVisible({
      modalImage: true,
      modalSocMed: false,
      modalConfirm: false,
      modalLimit: false,
    });
    setUriType(newType);
  };

  const openModalSocMed = () => {
    setModalVisible({
      modalSocMed: true,
      modalConfirm: false,
      modalImage: false,
      modalLimit: false,
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
      modalLimit: false,
    });
    getProfileUser();
  };

  const sendUri = (val: Image) => {
    if (uriType === 'photos') {
      sendMultipleUri([val]);
    } else {
      setUploadPhoto(val, uriType);
      setUri({...uri, [uriType]: val});
    }
  };

  const unique = (arr: Image[]) => {
    const propertyToCompare = Platform.OS === 'ios' ? 'filename' : 'size';
    return arr.filter(
      (v, i, a) =>
        a.findIndex(v2 => v[propertyToCompare] === v2[propertyToCompare]) === i,
    );
  };

  const sendMultipleUri = (val: Image[]) => {
    setActive(true);
    let newVal: Image[] = [];
    let newUniqueImageVal: Image[] = [];
    const allLength = photos.length + val.length;
    val.map(res => {
      // check if new image is not include in photos, compare using filename / size
      const propertyToCompare = Platform.OS === 'ios' ? 'filename' : 'size';
      if (
        photos.length === 0 ||
        photos.filter(v => v[propertyToCompare] === res[propertyToCompare])
          .length === 0
      ) {
        newUniqueImageVal.push(res);
      }
    });
    setUnUploadedPhotos(newUniqueImageVal);

    newVal =
      allLength > 10
        ? newUniqueImageVal.slice(0, 10 - photos.length)
        : newUniqueImageVal;
    const allPhotos = unique([...photos, ...newVal]);
    setPhotos(allPhotos);
    if (allLength > 10) {
      setTimeout(() => {
        showModalLimit('onUpload');
      }, 500);
    }
  };

  const removePhoto = (id: number) => {
    setActive(false);
    removeCollectPhotos({photos: dataResponseImg[id]});
    setPhotos(photos.filter((x: Image) => x.path !== photos[id].path));
    setDataResponseImg(dataResponseImg.filter((val, index) => index !== id));
    id < savedPhotos && setSavedPhotos(savedPhotos - 1);
  };

  const showModalLimit = (newType: string) => {
    setModalVisible({
      modalLimit: true,
      modalSocMed: false,
      modalConfirm: false,
      modalImage: false,
    });
    setModalLimitType(newType);
  };

  const onPressAddPhotos = () => {
    photos.length < 10 ? openModalImage('photos') : showModalLimit('');
  };

  const titleModalPicker =
    uriType === 'avatarUri'
      ? t('Profile.Edit.ProfilePicture')
      : uriType === 'backgroundUri'
      ? t('Profile.Edit.HeaderPicture')
      : t('Profile.Edit.Photos');

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
            label={t('Musician.Label.Website') || ''}
            placeholder={t('Profile.Edit.Website') || ''}
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
          <TouchableOpacity onPress={onPressAddPhotos}>
            <Text style={styles.addText}>{`+ ${t(
              'Profile.Edit.Photos',
            )}`}</Text>
          </TouchableOpacity>
          <Gap height={heightPercentage(20)} />

          <ListPhotos
            data={photos}
            photoOnpress={goToGallery}
            removePhoto={removePhoto}
          />
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
        maxFiles={10 - photos.length}
      />

      <ModalSocMed
        titleModal={t('Musician.Label.Social')}
        modalVisible={isModalVisible.modalSocMed}
        onPressClose={closeModal}
      />

      <ModalLimit
        text={
          modalLimitType === 'onUpload'
            ? t('Modal.Limit.Subtitle2')
            : t('Modal.Limit.Subtitle1')
        }
        onPressClose={closeModal}
        modalVisible={isModalVisible.modalLimit}
      />

      <ModalConfirm
        modalVisible={isModalVisible.modalConfirm}
        title={t('Modal.EditProfile.Title') || ''}
        subtitle={t('Modal.EditProfile.Subtitle') || ''}
        onPressClose={closeModal}
        onPressOk={() =>
          onPressSave({
            bio,
            about,
            website,
            photos: dataResponseImg.slice(savedPhotos, dataResponseImg.length),
          })
        }
      />

      <ModalLoading visible={isLoadingImage} />
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
    fontSize: mvs(13),
    color: Color.Pink[2],
    fontFamily: Font.InterRegular,
    marginTop: heightPercentage(10),
  },
});
