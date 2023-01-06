import React from 'react';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import SsuSheet from '../../atom/SsuSheet';
import {color, font} from '../../../theme';
import {CopyIcon} from '../../../assets/icon';
import {Button, Gap, SquareImage} from '../../atom';

interface ModalShareProps {
  url: string;
  titleModal: string;
  modalVisible: boolean;
  imgUri?: string;
  type?: string;
  titleSong?: string;
  artist?: string;
  createdOn?: string;
  onPressClose: () => void;
  onPressCopy: () => void;
  hideMusic?: boolean;
}

export const ModalShare: React.FC<ModalShareProps> = ({
  url,
  titleModal,
  modalVisible,
  imgUri,
  type,
  titleSong,
  artist,
  createdOn,
  onPressClose,
  onPressCopy,
  hideMusic,
}) => {
  const onPressCopyLink = () => {
    onPressCopy();
    onPressClose();
  };

  const children = () => {
    return (
      <>
        <Text style={styles.titleStyle}>{titleModal}</Text>
        <View style={styles.separator} />

        {!hideMusic ? (
          <View style={styles.containerSong}>
            <SquareImage imgUri={imgUri || ''} size={widthPercentage(56)} />
            <View style={styles.textContainer}>
              <Text style={styles.songTitle}>{titleSong}</Text>
              <Gap height={2} />
              <Text style={styles.singerName}>{artist}</Text>
              <Gap height={2} />
              <Text style={styles.songDesc}>{`${type} · ${createdOn}`}</Text>
            </View>
          </View>
        ) : null}

        <TouchableOpacity style={styles.containerSong} onPress={onPressCopy}>
          <Text style={styles.copyLink}>{url}</Text>
          <Gap width={widthPercentage(5)} />
          <CopyIcon />
        </TouchableOpacity>

        <Button
          label="Copy Link"
          containerStyles={styles.btnCopy}
          onPress={onPressCopyLink}
        />
        <Button
          type="border"
          label="Cancel"
          containerStyles={styles.btnCancel}
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
  btnCopy: {
    width: widthPercentage(327),
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(20),
    backgroundColor: color.Pink[2],
  },
  btnCancel: {
    width: widthPercentage(327),
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(10),
  },
  containerSong: {
    width: widthPercentage(327),
    flexDirection: 'row',
    marginBottom: heightPercentage(15),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: widthPercentage(12),
  },
  songTitle: {
    fontFamily: font.InterMedium,
    fontSize: normalize(15),
    lineHeight: heightPercentage(20),
    color: color.Neutral[10],
  },
  singerName: {
    fontFamily: font.InterRegular,
    fontSize: normalize(12),
    color: color.Neutral[50],
  },
  songDesc: {
    fontFamily: font.InterMedium,
    fontSize: normalize(10),
    color: color.Dark[50],
  },
  copyLink: {
    fontFamily: font.InterRegular,
    fontSize: normalize(12),
    color: color.Neutral[10],
  },
});
