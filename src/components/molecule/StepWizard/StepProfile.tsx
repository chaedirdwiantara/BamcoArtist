import React, {useState} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  InteractionManager,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {Image} from 'react-native-image-crop-picker';

import {Dropdown} from '../DropDown';
import {Gap, SsuInput} from '../../atom';
import {color, font} from '../../../theme';
import {uploadImage} from '../../../api/uploadImage.api';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {CameraIcon, ErrorIcon} from '../../../assets/icon';
import {AvatarProfile} from '../AvatarProfile/AvatarProfile';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {formatValueName2} from '../../../utils/formatValueName';
import {heightPercentage, normalize, width} from '../../../utils';
import {PreferenceList} from '../../../interface/setting.interface';
import {Step3ErrorProps, Step3Props} from '../ImageSlider/ImageSlider';

interface AccountProps {
  genres?: PreferenceList[];
  stateProfile: Step3Props;
  setStateProfile: (param: Step3Props) => void;
  errorProfile: Step3ErrorProps;
  setErrorProfile: (param: Step3ErrorProps) => void;
}

export const StepProfile: React.FC<AccountProps> = ({
  genres,
  stateProfile,
  setStateProfile,
  errorProfile,
  setErrorProfile,
}) => {
  const {t} = useTranslation();
  const {isError, errorMsg, setIsError, deleteValueProfile} = useProfileHook();
  const [showModalImage, setShowModalImage] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const setUploadImage = async (image: Image) => {
    InteractionManager.runAfterInteractions(() => setImageLoading(true));
    try {
      const response = await uploadImage(image);
      onChangeText(response.data, 'imageProfileUrl');
    } catch (error) {
      console.log(error);
    } finally {
      setImageLoading(false);
    }
  };

  const sendUri = (val: Image) => {
    setUploadImage(val);
  };

  const resetImage = () => {
    onChangeText('', 'imageProfileUrl');
    deleteValueProfile({
      context: 'imageProfileUrl',
    });
    setShowModalImage(false);
  };

  const onChangeText = (value: string | number[], name: string) => {
    setStateProfile({
      ...stateProfile,
      [name]: value,
    });
  };

  const onChangeFullname = (text: string) => {
    onChangeText(text, 'fullname');
    setErrorProfile({
      ...errorProfile,
      fullname: text.length < 3 || text.length > 50,
    });
  };

  const onChangeUsername = (text: string) => {
    const validation = /^[a-z0-9]*$/;
    if (validation.test(text)) {
      onChangeText(text, 'username');
      setErrorProfile({
        ...errorProfile,
        username: text.length < 3 || text.length > 30,
      });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.root}>
          <View style={styles.containerAvatar}>
            <AvatarProfile
              imgUri={stateProfile.imageProfileUrl}
              type={'edit'}
              showIcon={true}
              icon={<CameraIcon />}
              onPress={() => setShowModalImage(true)}
              backgroundColor={'#353E4D'}
            />
          </View>

          <SsuInput.InputLabel
            label={t('Setting.Account.Label.Fullname') || ''}
            value={stateProfile.fullname}
            onChangeText={text => onChangeFullname(text)}
            placeholder={t('Setting.Account.Placeholder.FullnameStep') || ''}
            isError={errorProfile.fullname}
            errorMsg={t('Setting.Account.Error.Fullname') || ''}
            containerStyles={{marginTop: heightPercentage(10)}}
          />

          <SsuInput.InputLabel
            label={t('Setting.Account.Label.Username') || ''}
            value={stateProfile.username}
            onChangeText={text => onChangeUsername(text)}
            placeholder={t('Setting.Account.Placeholder.UsernameStep') || ''}
            isError={errorProfile.username}
            autoCapitalize="none"
            errorMsg={t('Setting.Account.Error.Username') || ''}
            containerStyles={{marginTop: heightPercentage(10)}}
          />

          <Dropdown.Multi
            data={formatValueName2(genres || []) ?? []}
            placeHolder={t('Setting.Account.Placeholder.Genre') || ''}
            dropdownLabel={t('Setting.Account.Label.Genre') || ''}
            textTyped={(_newText: string) => null}
            containerStyles={{marginTop: heightPercentage(10)}}
            initialValue={stateProfile.favoriteGeneres}
            setValues={val => onChangeText(val, 'favoriteGeneres')}
          />

          <View style={{paddingBottom: mvs(30)}}>
            <SsuInput.InputLabel
              label={t('Profile.Edit.Bio') || ''}
              placeholder={t('Profile.Edit.About') || ''}
              value={stateProfile.bio}
              containerStyles={styles.textArea}
              multiline
              numberOfLines={10}
              inputStyles={styles.inputDesc}
              maxLength={600}
              onChangeText={text => {
                onChangeText(text, 'bio');
                setIsError(false);
              }}
            />
            <Text
              style={[
                styles.length,
                {
                  color:
                    stateProfile.bio.length === 600
                      ? color.Error[400]
                      : color.Neutral[10],
                },
              ]}>{`${stateProfile.bio.length}/600`}</Text>
          </View>

          {isError ? (
            <View style={styles.containerErrorMsg}>
              <ErrorIcon fill={color.Error[400]} />
              <Gap width={ms(4)} />
              <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>
          ) : null}

          <ModalImagePicker
            title={t('Profile.Edit.ProfilePicture') || ''}
            modalVisible={showModalImage}
            sendUri={sendUri}
            onDeleteImage={resetImage}
            onPressClose={() => setShowModalImage(false)}
            hideMenuDelete={stateProfile.imageProfileUrl !== ''}
            sendUriMultiple={() => null}
          />

          <ModalLoading visible={imageLoading} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: width,
    paddingHorizontal: mvs(20),
  },
  containerErrorMsg: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: mvs(4),
    alignItems: 'center',
  },
  errorMsg: {
    color: color.Error[400],
    fontFamily: font.InterRegular,
    fontSize: normalize(10),
    lineHeight: mvs(12),
    maxWidth: '90%',
  },
  length: {
    fontSize: mvs(12),
    marginTop: mvs(5),
  },
  textArea: {
    paddingHorizontal: 0,
    marginTop: heightPercentage(10),
  },
  inputDesc: {
    width: width * 0.9,
    aspectRatio: 5 / 1,
    textAlignVertical: 'top',
  },
  containerAvatar: {
    alignSelf: 'center',
    marginBottom: mvs(10),
  },
});
