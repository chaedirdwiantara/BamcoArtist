import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import ImagePicker, {Image, Video} from 'react-native-image-crop-picker';

import {Button} from '../../atom';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import SsuSheet from '../../atom/SsuSheet';
import {heightPercentage, normalize, width} from '../../../utils';
import {useTranslation} from 'react-i18next';

interface ModalImagePickerProps {
  title?: string;
  modalVisible: boolean;
  onPressClose: () => void;
  sendUri: (params: Image) => void;
  sendUriVideo?: (params: Video) => void;
  sendUriMultiple: (params: Image[]) => void;
  onDeleteImage: () => void;
  hideMenuDelete?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  showVideo?: boolean;
  onModalHide?: () => void;
}

export const ModalImagePicker: React.FC<ModalImagePickerProps> = ({
  title = 'Edit Display Profile',
  modalVisible,
  sendUri,
  sendUriVideo,
  sendUriMultiple,
  onPressClose,
  onDeleteImage,
  hideMenuDelete,
  multiple,
  maxFiles,
  showVideo,
  onModalHide,
}) => {
  const {t} = useTranslation();

  const onImageLibraryPress = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
      compressImageQuality: 0.9,
      cropping: true,
    }).then(image => {
      sendUri(image);
      onPressClose();
    });
  };

  const onSelectMultiple = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
      compressImageQuality: 0.9,
      cropping: true,
      multiple: true,
      mediaType: 'photo',
      maxFiles,
    }).then(image => {
      sendUriMultiple(image);
      onPressClose();
    });
  };

  const onSelectVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(image => {
      sendUriVideo?.(image);
      onPressClose();
    });
  };

  const onSelectVideoCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(image => {
      sendUriVideo?.(image);
      onPressClose();
    });
  };

  const onCameraPress = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
      compressImageQuality: 0.9,
      cropping: true,
    }).then(image => {
      sendUri(image);
      onPressClose();
    });
  };

  const children = () => {
    return (
      <View>
        <Text style={styles.titleStyle}>{title}</Text>
        <View style={styles.separator} />
        <View style={styles.containerMenu}>
          <TouchableOpacity
            style={{width: '100%', marginVertical: 10}}
            onPress={onCameraPress}>
            <Text style={styles.textMenu}>{t('Profile.Edit.Take')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: '100%', marginVertical: 10}}
            onPress={multiple ? onSelectMultiple : onImageLibraryPress}>
            <Text style={styles.textMenu}>{t('Profile.Edit.Add')}</Text>
          </TouchableOpacity>
          {showVideo && (
            <TouchableOpacity
              style={{width: '100%', marginVertical: 10}}
              onPress={onSelectVideo}>
              <Text style={styles.textMenu}>{t('Profile.Edit.AddVideo')}</Text>
            </TouchableOpacity>
          )}
          {showVideo && (
            <TouchableOpacity
              style={{width: '100%', marginVertical: 10}}
              onPress={onSelectVideoCamera}>
              <Text style={styles.textMenu}>
                {t('Profile.Edit.AddVideoCamera')}
              </Text>
            </TouchableOpacity>
          )}
          {hideMenuDelete && (
            <TouchableOpacity
              style={{width: '100%', marginVertical: 10}}
              onPress={onDeleteImage}>
              <Text style={styles.textMenu}>{t('Profile.Edit.Delete')}</Text>
            </TouchableOpacity>
          )}
        </View>
        <Button
          type="border"
          label={t('Btn.Cancel')}
          containerStyles={styles.btnContainer}
          textStyles={{color: Color.Success[400]}}
          onPress={onPressClose}
        />
      </View>
    );
  };

  return (
    <Modal
      isVisible={modalVisible}
      style={{margin: 0}}
      onModalHide={onModalHide}>
      <TouchableWithoutFeedback onPress={onPressClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <SsuSheet children={children()} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: Font.InterSemiBold,
    fontSize: normalize(18),
    lineHeight: mvs(28),
    textAlign: 'center',
    color: Color.Neutral[10],
  },
  separator: {
    backgroundColor: '#2B3240',
    width: width,
    height: mvs(1),
    marginVertical: heightPercentage(30),
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnContainer: {
    width: width * 0.85,
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(20),
    alignSelf: 'center',
  },
  textMenu: {
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
    fontSize: normalize(14),
  },
  containerMenu: {
    alignItems: 'flex-start',
    width: width * 0.85,
    alignSelf: 'center',
  },
});
