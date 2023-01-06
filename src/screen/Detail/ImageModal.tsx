import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import Modal from 'react-native-modal';
import {color} from '../../theme';
import FastImage from 'react-native-fast-image';
import {heightPercentage, heightResponsive} from '../../utils';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CloseCircleIcon} from '../../assets/icon';

interface ModalImageProps {
  toggleModal: () => void;
  modalVisible: boolean;
  image: string;
}

const ImageModal: FC<ModalImageProps> = (props: ModalImageProps) => {
  const {toggleModal, modalVisible, image} = props;

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={1}
      backdropColor={color.Dark[800]}
      onBackButtonPress={toggleModal}>
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
          <CloseCircleIcon />
        </TouchableOpacity>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollView}
          style={{
            width: widthPercentageToDP('100%'),
          }}>
          <FastImage source={{uri: image}} style={[styles.imageStyle]} />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    alignItems: 'center',
  },
  imageStyle: {
    height: heightResponsive(375, 812),
    width: widthPercentageToDP('100%'),
    marginTop: heightPercentage(-12),
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginTop: heightPercentage(12),
  },
});
