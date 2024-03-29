import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {Gap} from '../../atom';
import {Gift2Icon, GiftIcon, GlobalIcon} from '../../../assets/icon';

interface ModalConfirmProps {
  modalVisible: boolean;
  backdropOnPress?: () => void;
  choiceA: string;
  choiceB: string;
  iconChoiceA?: React.ReactNode | undefined;
  iconChoiceB?: React.ReactNode | undefined;
  choiceOnPress: (value: 'choiceA' | 'choiceB') => void;
  onModalHide?: () => void;
}

export const ModalConfirmChoice: React.FC<ModalConfirmProps> = (
  props: ModalConfirmProps,
) => {
  const {
    modalVisible,
    backdropOnPress,
    choiceA,
    choiceB,
    iconChoiceA,
    iconChoiceB,
    choiceOnPress,
    onModalHide,
  } = props;

  return (
    <>
      {modalVisible && (
        <Modal
          isVisible={modalVisible}
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          onBackdropPress={backdropOnPress}
          onModalHide={onModalHide}>
          <View style={styles.root}>
            <TouchableOpacity
              style={styles.choiceContainer}
              onPress={() => choiceOnPress('choiceA')}>
              {iconChoiceA ?? <GlobalIcon />}
              <Gap width={9} />
              <Text style={styles.textChoice}>{choiceA}</Text>
            </TouchableOpacity>
            <Gap height={28} />
            <TouchableOpacity
              style={styles.choiceContainer}
              onPress={() => choiceOnPress('choiceB')}>
              {iconChoiceB ?? <Gift2Icon />}
              <Gap width={9} />
              <Text style={styles.textChoice}>{choiceB}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-start',
    paddingHorizontal: widthResponsive(20),
    paddingVertical: widthResponsive(30),
    backgroundColor: color.Dark[600],
    borderRadius: 4,
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textChoice: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(13),
    color: color.Neutral[10],
  },
});
