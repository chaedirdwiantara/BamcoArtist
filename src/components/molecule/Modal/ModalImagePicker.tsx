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
import ImagePicker from 'react-native-image-crop-picker';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import {Button} from '../../atom';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import SsuSheet from '../../atom/SsuSheet';

interface ModalImagePickerProps {
  title?: string;
  modalVisible: boolean;
  onPressClose: () => void;
  sendUri: (params: any) => void;
  onDeleteImage: () => void;
  hideMenuDelete?: boolean;
}

export const ModalImagePicker: React.FC<ModalImagePickerProps> = ({
  title = 'Edit Display Profile',
  modalVisible,
  sendUri,
  onPressClose,
  onDeleteImage,
  hideMenuDelete,
}) => {
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
      <>
        <Text style={styles.titleStyle}>{title}</Text>
        <View style={styles.separator} />
        <View>
          <TouchableOpacity>
            <Text style={styles.textMenu} onPress={onCameraPress}>
              Take Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginVertical: 10}}
            onPress={onImageLibraryPress}>
            <Text style={styles.textMenu}>Add Photo from Gallery</Text>
          </TouchableOpacity>
          {hideMenuDelete && (
            <TouchableOpacity onPress={onDeleteImage}>
              <Text style={styles.textMenu}>Delete Photo</Text>
            </TouchableOpacity>
          )}
        </View>
        <Button
          type="border"
          label="Cancel"
          containerStyles={styles.btnContainer}
          textStyles={{color: Color.Pink.linear}}
          onPress={onPressClose}
        />
      </>
    );
  };

  return (
    <Modal isVisible={modalVisible} style={{margin: 0}}>
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
    width: widthPercentage(327),
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(20),
  },
  textMenu: {
    color: Color.Neutral[10],
    textAlign: 'center',
    fontFamily: Font.InterRegular,
    fontSize: normalize(14),
  },
});
