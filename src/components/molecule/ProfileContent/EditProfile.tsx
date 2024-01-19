import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {Image} from 'react-native-image-crop-picker';

import {Dropdown, ModalConfirm} from '../..';
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
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CloseCircleIcon,
  ErrorIcon,
  SaveIcon,
} from '../../../assets/icon';
import {ParamsProps} from '../../../interface/base.interface';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {heightPercentage, widthPercentage} from '../../../utils';
import {useUploadImageHook} from '../../../hooks/use-uploadImage.hook';
import ProfileComponent from '../../../screen/MusicianProfile/ProfileComponent';
import {ListCountryType} from '../../../interface/location.interface';
import {DataDropDownType} from '../../../data/dropdown';
import {
  ListRoleType,
  PreferenceList,
} from '../../../interface/setting.interface';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {dataProps} from '../DropDown/DropdownMulti';
import {formatValueName2} from '../../../utils/formatValueName';
import {ProfileResponseData} from '../../../interface/profile.interface';
import {profileStorage, storage} from '../../../hooks/use-storage.hook';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {font, typography} from '../../../theme';
import {MenuText} from '../../atom/MenuText/MenuText';
import DatePicker from 'react-native-date-picker';
import {dateFormatBirth} from '../../../utils/date-format';
import {
  dataGender,
  dataYearsFrom,
  dataYearsTo,
} from '../../../data/Settings/account';

interface EditProfileProps {
  dataProfile: ProfileResponseData;
  dataAllCountry: ListCountryType[];
  roles: ListRoleType[];
  moods: PreferenceList[];
  genres: PreferenceList[];
  triggerGetProfile: boolean;
  dataCitiesOfCountry: DataDropDownType[];
  deleteValueProfile: (props?: ParamsProps) => void;
  setSelectedCountry: (value: number) => void;
  setTriggerGetProfile: (val: boolean) => void;
}

interface InputProps {
  username: string;
  fullname: string;
  genre: number[];
  labels: string;
  yearsActiveFrom: string;
  yearsActiveTo: string;
  locationCountry: number;
  locationCity: string;
  typeOfMusician: number;
  gender: string;
}

const validation = yup.object({
  username: yup
    .string()
    .required('Username can not be blank, set a username')
    .matches(
      /^.{2,29}[a-z0-9]$/,
      'Username should be between 3 to 30 alphanumeric characters',
    ),
  fullname: yup
    .string()
    .strict(true)
    .trim('Full name cannot include leading and trailing spaces')
    .matches(/^.{3,50}$/, 'Fullname allowed 3 to 50 character'),
  labels: yup.string(),
  yearsActiveFrom: yup.string(),
  yearsActiveTo: yup.string(),
  locationCountry: yup.number(),
  locationCity: yup.string(),
  typeOfMusician: yup.number(),
  gender: yup.string(),
});

export const EditProfile: React.FC<EditProfileProps> = ({
  dataProfile,
  roles,
  moods,
  genres,
  dataAllCountry,
  dataCitiesOfCountry,
  triggerGetProfile,
  deleteValueProfile,
  setSelectedCountry,
  setTriggerGetProfile,
}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {isLoadingImage, dataImage, setUploadImage} = useUploadImageHook();
  const {
    isError,
    isLoading,
    errorMsg,
    updateProfilePreference,
    addCollectPhotos,
    setIsError,
    removeCollectPhotos,
  } = useProfileHook();

  const [bio, setBio] = useState('');
  const [about, setAbout] = useState('');
  const [website, setWebsite] = useState('');
  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
    modalSocMed: false,
    modalLimit: false,
  });
  const [uriType, setUriType] = useState<string>('');
  const [photos, setPhotos] = useState<Image[]>([]);
  const [unUploadedPhotos, setUnUploadedPhotos] = useState<Image[]>([]);
  const [dataResponseImg, setDataResponseImg] = useState<string[]>([]);
  const [active, setActive] = useState<boolean>(false);
  const [savedPhotos, setSavedPhotos] = useState<number>(0);
  const [modalLimitType, setModalLimitType] = useState<string>('');
  const [members, setMembers] = useState<string[]>([]);
  const [changes, setChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [valueGenres, setValueGenres] = useState<(number | undefined)[]>([]);
  const [valueMoodsPreference, setValueMoodsPreference] = useState<
    (number | undefined)[]
  >([]);
  const [valueGenresPreference, setValueGenresPreference] = useState<
    (number | undefined)[]
  >([]);
  const [valueTypeOfMusician, setValueTypeOfMusician] = useState<
    (number | undefined)[]
  >([]);
  const [birthdate, setBirthDate] = useState<string>('');
  const [openPickerBirth, setOpenPickerBirth] = useState<boolean>(false);
  const [uploadImgActive, setUploadImgActive] = useState<boolean>(false);
  // image for use (before upload)
  const [avatarUri, setAvatarUri] = useState<Image>();
  const [backgroundUri, setBackgroundUri] = useState<Image>();
  // image for send to API Edit Profile (after upload)
  const [uploadedAvatar, setUploadedAvatar] = useState<string>('');
  const [uploadedBgUri, setUploadedBgUri] = useState<string>('');

  const {
    control,
    formState: {errors, isValid, isValidating},
    getValues,
    setError,
  } = useForm<InputProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      username: dataProfile.username || '',
      fullname: dataProfile.fullname || '',
      labels: dataProfile.labels || '',
      yearsActiveFrom: dataProfile.yearsActiveFrom || '',
      yearsActiveTo: dataProfile.yearsActiveTo || '',
      locationCountry: dataProfile.locationCountry?.id || 0,
      locationCity: dataProfile.locationCity || '',
      typeOfMusician:
        dataProfile.rolesInIndustry.length > 0
          ? dataProfile.rolesInIndustry[0].id
          : -1,
      gender: dataProfile.gender || '',
    },
  });

  const defaultImg = {
    path: '',
    size: 500,
    mime: 'image/jpeg',
    width: 500,
    height: 500,
  };

  const getValue = (data: dataProps[]) => {
    if (data) {
      return data?.map((item: dataProps) => {
        return item['value'];
      });
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (dataProfile) {
      const gr = getValue(formatValueName2(dataProfile.genres));
      const md = getValue(formatValueName2(dataProfile.moods));
      const fvgr = getValue(formatValueName2(dataProfile.favoriteGenres));
      const musicianType =
        dataProfile.rolesInIndustry.length > 0
          ? dataProfile.rolesInIndustry[0].id
          : -1;
      const member =
        dataProfile.members?.length > 0 ? dataProfile.members : [''];
      const avatar =
        dataProfile.imageProfileUrls?.length > 0
          ? dataProfile.imageProfileUrls[2].image
          : '';
      const banners =
        dataProfile.banners?.length > 0 ? dataProfile.banners[2].image : '';
      setValueGenres(gr);
      setValueMoodsPreference(md);
      setValueGenresPreference(fvgr);
      setValueTypeOfMusician([musicianType]);
      setBirthDate(dataProfile.birthdate);
      setBio(dataProfile.bio);
      setAbout(dataProfile.about);
      setWebsite(dataProfile.website);
      setMembers(member);
      // default except path
      setAvatarUri({
        ...defaultImg,
        path: avatar || '',
      });
      setUploadedAvatar(avatar);
      setBackgroundUri({
        ...defaultImg,
        path: banners || '',
      });
      setUploadedBgUri(banners);
    }
  }, [dataProfile]);

  // handle if user already have photos
  useEffect(() => {
    if (dataProfile?.photos.length > 0) {
      let newPhotos: Image[] = [];
      let newDataResponseImg: string[] = [];
      dataProfile.photos.map((val: {images: {image: string}[]}) => {
        if (val.images.length > 0) {
          const newPath = val.images[0]?.image;
          newPhotos.push({
            ...defaultImg,
            path: newPath,
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

  // send selected image to API, to get new response img
  useEffect(() => {
    if (uploadImgActive) {
      const img = uriType === 'avatarUri' ? avatarUri : backgroundUri;
      img !== undefined && setUploadImage(img);
    }
  }, [avatarUri, backgroundUri]);

  // save to new state img from response API
  useEffect(() => {
    if (uploadImgActive) {
      const setDataResponse =
        uriType === 'avatarUri' ? setUploadedAvatar : setUploadedBgUri;
      dataImage?.data !== undefined ? setDataResponse(dataImage.data) : null;
    }
  }, [dataImage]);

  useEffect(() => {
    if (
      isValid &&
      dataProfile.socialMedia &&
      dataProfile.socialMedia.length > 0 &&
      valueGenres.length > 0 &&
      getValues('yearsActiveFrom') &&
      getValues('yearsActiveTo') &&
      getValues('locationCountry') &&
      getValues('locationCity') &&
      valueTypeOfMusician.length > 0
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating, isValid, dataProfile, valueGenres, valueTypeOfMusician]);

  const onPressConfirm = async () => {
    setShowModal(false);
    try {
      const payload = {
        username: getValues('username'),
        fullname: getValues('fullname'),
        labels: getValues('labels'),
        yearsActiveFrom: getValues('yearsActiveFrom'),
        yearsActiveTo: getValues('yearsActiveTo'),
        locationCountry: getValues('locationCountry'),
        locationCity: getValues('locationCity'),
        gender: getValues('gender'),
        birthdate,
        members: members.filter(val => val !== ''),
        genres: valueGenres as number[],
        moods: valueMoodsPreference as number[],
        favoriteGeneres: valueGenresPreference as number[],
        rolesInIndustry: valueTypeOfMusician as number[],
        imageProfileUrl: uploadedAvatar,
        banner: uploadedBgUri,
        bio: bio,
        about: about,
        Website: website,
      };
      const photo = dataResponseImg.slice(savedPhotos, dataResponseImg.length);
      await addCollectPhotos({photos: photo});
      await updateProfilePreference(payload);

      storage.set(
        'profile',
        JSON.stringify({...profileStorage(), fullname: getValues('fullname')}),
      );
      setIsSubmit(true);
      setChanges(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmit) {
      if (!isError && !isLoading) {
        onPressSuccess();
      }
      setIsSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  const onPressSuccess = () => {
    storage.set('editProfileSuccess', true);
    navigation.goBack();
  };

  const onPressAddMember = () => {
    if (members[members.length - 1] !== '') {
      setMembers([...members, '']);
      setChanges(true);
    }
  };

  const addMemberOnChange = (text: string, index: number) => {
    let temp = [...members];
    temp[index] = text;
    setMembers(temp);
    setChanges(true);
  };

  const removeMember = (index: number) => {
    if (members.length === 1) {
      setMembers(['']);
    } else {
      let temp = [...members];
      temp.splice(index, 1);
      setMembers(temp);
    }
    setChanges(true);
  };

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
    // reset value of state
    setUploadImgActive(false);
    if (uriType === 'avatarUri') {
      setAvatarUri(defaultImg);
      setUploadedAvatar('');
    } else {
      setBackgroundUri(defaultImg);
      setUploadedBgUri('');
    }
    // send the value of which images to delete
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
    // getProfileUser();
  };

  const sendUri = (val: Image) => {
    if (uriType === 'photos') {
      sendMultipleUri([val]);
    } else {
      setUploadImgActive(true);
      uriType === 'avatarUri' ? setAvatarUri(val) : setBackgroundUri(val);
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

  const goToGallery = (photo: Image[]) => {
    navigation.navigate('PhotoGallery', {
      userName: dataProfile.fullname,
      imageData: photo,
      type: 'editProfile',
    });
  };

  const titleModalPicker =
    uriType === 'avatarUri'
      ? t('Profile.Edit.ProfilePicture')
      : uriType === 'backgroundUri'
      ? t('Profile.Edit.HeaderPicture')
      : t('Profile.Edit.Photos');

  // show delete menu in modal picker if any of this value exist
  const showDeleteImage =
    uriType === 'avatarUri'
      ? avatarUri?.path !== ''
      : backgroundUri?.path !== '';

  const newColorBio =
    bio?.length === 110 ? Color.Error[400] : Color.Neutral[10];
  const newColorAbout =
    about?.length === 600 ? Color.Error[400] : Color.Neutral[10];

  // useEffect(() => {
  //   getProfileUser();
  // }, []);

  useEffect(() => {
    if (getValues('username').length < 3 || getValues('username').length > 30) {
      setError('username', {
        type: 'value',
        message: 'Username should be between 3 to 30 alphanumeric characters',
      });
    }
  }, []);

  const soloRole = valueTypeOfMusician[0] !== 3 && valueTypeOfMusician[0] !== 8;

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title={t('Profile.Edit.Title')}
        rightIcon={<SaveIcon stroke={disabledButton ? '#646567' : '#fff'} />}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={() => navigation.goBack()}
        rightIconAction={openModalConfirm}
        disabledRightIcon={disabledButton}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader
          type={'edit'}
          avatarUri={avatarUri?.path}
          backgroundUri={backgroundUri?.path}
          fullname={dataProfile.fullname}
          username={dataProfile.username}
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
            ]}>{`${bio?.length}/110`}</Text>

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
            ]}>{`${about?.length}/600`}</Text>

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
            ]}>{`${website?.length}/600`}</Text>

          <Text style={{marginTop: heightPercentage(20)}}>
            <Text style={styles.title}>{t('Musician.Label.Social')}</Text>
            <Text style={[typography.Overline, {color: Color.Pink[200]}]}>
              {' *' + t('General.Required')}
            </Text>
          </Text>
          <TouchableOpacity onPress={openModalSocMed}>
            <Text style={styles.addText}>{`+ ${t(
              'Profile.Edit.Social',
            )}`}</Text>
          </TouchableOpacity>
          {dataProfile.socialMedia && dataProfile.socialMedia?.length > 0 && (
            <ProfileComponent
              title=""
              gap={0}
              socmedSection
              socmed={dataProfile.socialMedia ?? []}
              containerStyles={{paddingHorizontal: 0}}
            />
          )}

          <Text style={styles.title}>{t('Musician.Label.Photos')}</Text>
          <TouchableOpacity onPress={onPressAddPhotos}>
            <Text style={styles.addText}>{`+ ${t(
              'Profile.Edit.Photos',
            )}`}</Text>
          </TouchableOpacity>
          <Gap height={photos.length > 0 ? heightPercentage(20) : 0} />

          <ListPhotos
            data={photos}
            photoOnpress={goToGallery}
            removePhoto={removePhoto}
          />

          <Text style={styles.title}>{'Account Information'}</Text>
          <Controller
            name="username"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label={t('Setting.Account.Label.Username') || ''}
                value={value}
                onChangeText={text => {
                  onChange(text.toLowerCase());
                  setIsError(false);
                  setChanges(true);
                }}
                placeholder={t('Setting.Account.Placeholder.Username') || ''}
                isError={errors?.username ? true : false}
                errorMsg={errors?.username?.message}
                containerStyles={{marginTop: heightPercentage(15)}}
              />
            )}
          />

          <Controller
            name="fullname"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label={t('Setting.Account.Label.Fullname') || ''}
                value={value}
                onChangeText={text => {
                  onChange(text);
                  setIsError(false);
                  setChanges(true);
                }}
                placeholder={t('Setting.Account.Placeholder.Fullname') || ''}
                isError={errors?.fullname ? true : false}
                errorMsg={errors?.fullname?.message}
                containerStyles={{marginTop: heightPercentage(15)}}
              />
            )}
          />

          <Dropdown.Multi
            data={formatValueName2(genres) ?? []}
            placeHolder={t('Setting.Account.Placeholder.Genre') || ''}
            dropdownLabel={t('Setting.Account.Label.Genre') || ''}
            textTyped={(_newText: string) => null}
            containerStyles={{marginTop: mvs(15), marginBottom: mvs(5)}}
            initialValue={valueGenres}
            isRequired={true}
            setValues={val => {
              setValueGenres(val);
              setChanges(true);
            }}
          />

          <View style={{marginTop: heightPercentage(15)}}>
            <Text style={[typography.Overline, {color: Color.Neutral[50]}]}>
              {t('Setting.Account.Label.DateOfBirth')}
            </Text>
          </View>
          <MenuText.RightIcon
            text={birthdate === '' ? 'YYYY-MM-DD' : birthdate}
            containerStyles={{marginTop: mvs(10), marginLeft: ms(4)}}
            icon={
              <ChevronDownIcon
                stroke="#7c7b7c"
                style={{
                  width: widthPercentage(16),
                  height: widthPercentage(16),
                  marginRight: ms(5),
                }}
              />
            }
            onPress={() => setOpenPickerBirth(true)}
          />

          <DatePicker
            modal
            open={openPickerBirth}
            date={birthdate === '' ? new Date() : new Date(birthdate)}
            mode="date"
            theme="dark"
            textColor={Color.Pink[200]}
            onConfirm={date => {
              setOpenPickerBirth(false);
              setBirthDate(dateFormatBirth(date));
            }}
            onCancel={() => {
              setOpenPickerBirth(false);
            }}
          />

          <Controller
            name="labels"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label={t('Setting.Account.Label.Label') || ''}
                value={value}
                onChangeText={text => {
                  onChange(text);
                  setIsError(false);
                  setChanges(true);
                }}
                placeholder={t('Setting.Account.Placeholder.Label') || ''}
                isError={errors?.labels ? true : false}
                errorMsg={errors?.labels?.message}
                containerStyles={{marginTop: heightPercentage(15)}}
              />
            )}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Controller
              name="yearsActiveFrom"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  initialValue={value}
                  data={dataYearsFrom}
                  placeHolder={t('Setting.Account.Placeholder.Active') || ''}
                  dropdownLabel={t('Musician.Label.Active') || ''}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setChanges(true);
                  }}
                  containerStyles={{
                    marginTop: heightPercentage(15),
                    width: '49%',
                  }}
                  isRequired={true}
                  isError={errors?.yearsActiveFrom ? true : false}
                  errorMsg={errors?.yearsActiveFrom?.message}
                />
              )}
            />

            <Controller
              name="yearsActiveTo"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  initialValue={value}
                  data={dataYearsTo}
                  placeHolder={t('Setting.Account.Placeholder.Active') || ''}
                  dropdownLabel={''}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setChanges(true);
                  }}
                  containerStyles={{
                    marginTop: heightPercentage(14),
                    width: '49%',
                  }}
                  isError={errors?.yearsActiveTo ? true : false}
                  errorMsg={errors?.yearsActiveTo?.message}
                />
              )}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: heightPercentage(4),
            }}>
            <Controller
              name="locationCountry"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  type="location"
                  initialValue={value}
                  data={dataAllCountry}
                  placeHolder={t('Setting.Account.Placeholder.Country') || ''}
                  dropdownLabel={t('Setting.Account.Label.Location') || ''}
                  textTyped={(newText: {label: string; value: number}) => {
                    onChange(newText.value);
                    setSelectedCountry(newText.value);
                    setChanges(true);
                  }}
                  containerStyles={{
                    marginTop: heightPercentage(16),
                    width: '49%',
                  }}
                  isRequired={true}
                  isError={errors?.locationCountry ? true : false}
                  errorMsg={errors?.locationCountry?.message}
                />
              )}
            />

            <Controller
              name="locationCity"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  initialValue={value}
                  data={dataCitiesOfCountry}
                  showSearch={true}
                  placeHolder={t('Setting.Account.Placeholder.City') || ''}
                  dropdownLabel={''}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setChanges(true);
                  }}
                  containerStyles={{
                    marginTop: heightPercentage(15),
                    width: '49%',
                  }}
                  isError={errors?.locationCity ? true : false}
                  errorMsg={errors?.locationCity?.message}
                />
              )}
            />
          </View>

          <Controller
            name="typeOfMusician"
            control={control}
            render={({field: {onChange, value}}) => (
              <Dropdown.Input
                initialValue={value}
                data={formatValueName2(roles) ?? []}
                placeHolder={t('Setting.Account.Label.TypeOfMusician') || ''}
                dropdownLabel={t('Setting.Account.Label.TypeOfMusician') || ''}
                textTyped={(newText: {label: string; value: number}) => {
                  onChange(newText.value);
                  setChanges(true);
                  setValueTypeOfMusician([newText.value]);
                }}
                containerStyles={{
                  marginTop: heightPercentage(15),
                }}
                isRequired={true}
                isError={errors?.typeOfMusician ? true : false}
                errorMsg={errors?.typeOfMusician?.message}
              />
            )}
          />

          {soloRole && (
            <Controller
              name="gender"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  initialValue={value}
                  data={dataGender}
                  placeHolder={t('Setting.Account.Placeholder.Gender')}
                  dropdownLabel={t('Setting.Account.Label.Gender')}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setChanges(true);
                  }}
                  containerStyles={{marginTop: heightPercentage(15)}}
                  isError={errors?.gender ? true : false}
                  errorMsg={errors?.gender?.message}
                />
              )}
            />
          )}

          {valueTypeOfMusician[0] === 3 &&
            members.map((val, index) => (
              <SsuInput.InputLabel
                key={index}
                label={
                  index === 0 ? t('Setting.Account.Label.Member') || '' : ''
                }
                value={val}
                onChangeText={text => addMemberOnChange(text, index)}
                placeholder={t('Setting.Account.Placeholder.Member') || ''}
                containerStyles={{
                  marginTop: index === 0 ? heightPercentage(15) : 0,
                }}
                rightIcon={
                  <TouchableOpacity onPress={() => removeMember(index)}>
                    <CloseCircleIcon
                      style={{
                        width: widthPercentage(22),
                        height: widthPercentage(22),
                      }}
                    />
                  </TouchableOpacity>
                }
              />
            ))}

          {valueTypeOfMusician[0] === 3 && (
            <TouchableOpacity onPress={onPressAddMember}>
              <Text
                style={[
                  typography.Body4,
                  {
                    color: Color.Pink[2],
                    paddingTop: mvs(7),
                    fontSize: mvs(11),
                  },
                ]}>
                + Add More
              </Text>
            </TouchableOpacity>
          )}

          <Dropdown.Multi
            data={formatValueName2(genres) ?? []}
            placeHolder={t('Setting.Preference.Placeholder.Genre')}
            dropdownLabel={t('Setting.Preference.Label.GenrePreference')}
            textTyped={(_newText: string) => null}
            containerStyles={{marginTop: mvs(20), marginBottom: mvs(5)}}
            initialValue={valueGenresPreference}
            setValues={val => {
              setValueGenresPreference(val);
              setChanges(true);
            }}
          />

          <Dropdown.Multi
            data={formatValueName2(moods) ?? []}
            placeHolder={t('Setting.Preference.Placeholder.Mood')}
            dropdownLabel={t('Setting.Preference.Label.MoodPreference')}
            textTyped={(_newText: string) => null}
            containerStyles={{marginTop: mvs(15), marginBottom: mvs(5)}}
            initialValue={valueMoodsPreference}
            setValues={val => {
              setValueMoodsPreference(val);
              setChanges(true);
            }}
          />

          {isError ? (
            <View style={styles.containerErrorMsg}>
              <ErrorIcon fill={Color.Error[400]} />
              <Gap width={ms(4)} />
              <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <ModalImagePicker
        title={titleModalPicker}
        modalVisible={isModalVisible.modalImage}
        sendUri={sendUri}
        sendUriMultiple={sendMultipleUri}
        onDeleteImage={resetImage}
        onPressClose={closeModal}
        showDeleteImage={showDeleteImage && uriType !== 'photos'}
        multiple={uriType === 'photos'}
        maxFiles={10 - photos.length}
      />

      <ModalSocMed
        titleModal={t('Musician.Label.Social')}
        modalVisible={isModalVisible.modalSocMed}
        onPressClose={() => {
          setTriggerGetProfile(!triggerGetProfile);
          closeModal();
        }}
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
        title={t('Setting.Account.Title') || ''}
        subtitle={t('Setting.Account.Confirm') || ''}
        onPressClose={closeModal}
        onPressOk={onPressConfirm}
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
    marginBottom: heightPercentage(80),
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
  containerErrorMsg: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: mvs(4),
    alignItems: 'center',
  },
  errorMsg: {
    color: Color.Error[400],
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    lineHeight: mvs(12),
    maxWidth: '90%',
  },
});
