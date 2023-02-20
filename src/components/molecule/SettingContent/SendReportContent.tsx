import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ImagePicker, {Image} from 'react-native-image-crop-picker';

import {Button, SsuInput} from '../../atom';
import {color} from '../../../theme';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {useUploadImageHook} from '../../../hooks/use-uploadImage.hook';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {sendReport} from '../../../api/setting.api';
import {ModalSuccessDonate} from '../Modal/ModalSuccessDonate';
import {useTranslation} from 'react-i18next';

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

  useEffect(() => {
    if (listImage.length > 0) {
      for (let i = 0; i < listImage.length; i++) {
        setUploadImage(listImage[i]);
      }
    }
  }, [listImage]);

  useEffect(() => {
    dataImage?.data !== undefined && !dataResponseImg.includes(dataImage.data)
      ? setDataResponseImg([...dataResponseImg, dataImage?.data])
      : null;
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

  const onCameraPress = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
      compressImageQuality: 0.9,
      cropping: true,
      multiple: true,
      maxFiles: 4,
    }).then(image => {
      listImage.length + image.length <= 4 &&
        setListImage([...listImage, ...image]);
    });
  };

  const onImageLibraryPress = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
      compressImageQuality: 0.9,
      cropping: true,
      multiple: true,
      maxFiles: 4,
    }).then(image => {
      listImage.length + image.length <= 4 &&
        setListImage([...listImage, ...image]);
    });
  };

  const removeImage = (id: number) => {
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
    backgroundColor: color.Pink[200],
  },
});
