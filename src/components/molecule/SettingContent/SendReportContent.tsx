import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import ImagePicker, {Image} from 'react-native-image-crop-picker';

import {color} from '../../../theme';
import {Button, SsuInput} from '../../atom';
import {ModalLimit} from '../Modal/ModalLimit';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {sendReport} from '../../../api/setting.api';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {ModalSuccessDonate} from '../Modal/ModalSuccessDonate';
import {useUploadImageHook} from '../../../hooks/use-uploadImage.hook';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface SendReportProps {
  title: string;
  onPressGoBack: () => void;
}

export const SendReportContent: React.FC<SendReportProps> = ({
  title,
  onPressGoBack,
}) => {
  const {t} = useTranslation();
  const [state, setState] = useState({
    email: '',
    message: '',
  });
  const [listImage, setListImage] = useState<Image[]>([]);
  const [dataResponseImg, setDataResponseImg] = useState<string[]>([]);
  const {isLoadingImage, dataImage, setUploadImage} = useUploadImageHook();
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showModalLimit, setShowModalLimit] = useState<boolean>(false);
  const [modalLimitType, setModalLimitType] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [unUploadedPhotos, setUnUploadedPhotos] = useState<Image[]>([]);

  useEffect(() => {
    if (unUploadedPhotos.length > 0 && active) {
      for (let i = 0; i < unUploadedPhotos.length; i++) {
        setUploadImage(unUploadedPhotos[i]);
      }
    }
  }, [unUploadedPhotos]);

  useEffect(() => {
    if (active) {
      dataImage?.data !== undefined && !dataResponseImg.includes(dataImage.data)
        ? setDataResponseImg([...dataResponseImg, dataImage?.data])
        : null;
    }
  }, [dataImage]);

  const onChangeText = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const onPressSend = async () => {
    try {
      const payload = {
        ...state,
        imageUrl: dataResponseImg,
      };
      await sendReport(payload);
      setShowModalSuccess(true);
    } catch (error) {}
  };

  const sendSingleUri = (val: Image) => {
    const allPhotos = [...listImage, val];
    setUnUploadedPhotos([val]);
    setListImage(allPhotos);
  };

  const sendMultipleUri = (val: Image[]) => {
    setActive(true);
    let newVal: Image[] = [];
    let newUniqueImageVal: Image[] = [];
    const allLength = listImage.length + val.length;
    val.map(res => {
      // check if new image is not include in listImage, compare using filename / size
      const propertyToCompare = Platform.OS === 'ios' ? 'filename' : 'size';
      if (
        listImage.length === 0 ||
        listImage.filter(v => v[propertyToCompare] === res[propertyToCompare])
          .length === 0
      ) {
        newUniqueImageVal.push(res);
      }
    });

    newVal =
      allLength > 4
        ? newUniqueImageVal.slice(0, 4 - listImage.length)
        : newUniqueImageVal;

    const allPhotos = [...listImage, ...newVal];
    setUnUploadedPhotos(newVal);
    setListImage(allPhotos);

    if (allLength > 4) {
      setShowModalLimit(true);
      setModalLimitType('onUpload');
    }
  };

  const onCameraPress = () => {
    if (listImage.length >= 4) {
      setShowModalLimit(true);
      setModalLimitType('');
    } else {
      ImagePicker.openCamera({
        compressImageMaxWidth: 1024,
        compressImageMaxHeight: 1024,
        compressImageQuality: 0.9,
        cropping: true,
      }).then(image => {
        sendSingleUri(image);
      });
    }
  };

  const onImageLibraryPress = () => {
    if (listImage.length >= 4) {
      setShowModalLimit(true);
      setModalLimitType('');
    } else {
      ImagePicker.openPicker({
        compressImageMaxWidth: 1024,
        compressImageMaxHeight: 1024,
        compressImageQuality: 0.9,
        cropping: true,
        multiple: true,
        maxFiles: 4 - listImage.length,
      }).then(image => {
        sendMultipleUri(image);
      });
    }
  };

  const removeImage = (id: number) => {
    setActive(false);
    setListImage(listImage.filter((x: Image) => x.path !== listImage[id].path));
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={title}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(12)}}
      />

      <SsuInput.InputLabel
        value={state.email}
        onChangeText={(newText: string) => onChangeText('email', newText)}
        placeholder={t('Setting.Report.Placeholder.Email') || ''}
        containerStyles={styles.textInput}
        inputStyles={{paddingHorizontal: widthPercentage(10)}}
      />

      <SsuInput.InputLabel
        value={state.message}
        onChangeText={(newText: string) => onChangeText('message', newText)}
        placeholder={t('Setting.Report.Placeholder.Text') || ''}
        containerStyles={styles.textArea}
        multiline
        numberOfLines={10}
        inputStyles={styles.inputDesc}
        showImage={true}
        onPressCamera={onCameraPress}
        onPressLibrary={onImageLibraryPress}
        containerInputStyles={{borderBottomWidth: 0}}
        listImage={listImage}
        onPressDeleteImage={removeImage}
      />

      <ModalLoading visible={isLoadingImage} />

      <ModalSuccessDonate
        title={t('General.Thanks') || ''}
        subtitle={t('Modal.Report.Success') || ''}
        buttonText={t('Modal.Report.Back') || ''}
        modalVisible={showModalSuccess}
        toggleModal={onPressGoBack}
      />

      <ModalLimit
        text={
          modalLimitType === 'onUpload'
            ? t('Modal.Limit.SubtitleSR2')
            : t('Modal.Limit.SubtitleSR1')
        }
        modalVisible={showModalLimit}
        onPressClose={() => setShowModalLimit(false)}
      />

      <Button
        label={t('Btn.Send')}
        onPress={onPressSend}
        containerStyles={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  textInput: {
    marginTop: heightPercentage(10),
  },
  textArea: {
    paddingHorizontal: 0,
    marginTop: heightPercentage(10),
  },
  inputDesc: {
    width: width * 0.9,
    aspectRatio: 2 / 1,
    textAlignVertical: 'top',
    paddingHorizontal: widthPercentage(10),
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(25),
    alignSelf: 'center',
  },
});
