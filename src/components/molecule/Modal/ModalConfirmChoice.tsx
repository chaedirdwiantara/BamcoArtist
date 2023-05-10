import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {Gap} from '../../atom';

interface ModalConfirmProps {
  modalVisible: boolean;
  backdropOnPress?: () => void;
  choiceA: string;
  choiceB: string;
  iconChoiceA?: React.ReactNode | undefined;
  iconChoiceB?: React.ReactNode | undefined;
  choiceOnPress: (value: string) => void;
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
  } = props;

  const choicePressed = (value: string) => {
    console.log(value);
  };

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0.8}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      onBackdropPress={backdropOnPress}>
      <View style={styles.root}>
        <TouchableOpacity
          style={styles.choiceContainer}
          onPress={() => choiceOnPress('choiceA')}>
          <Text style={styles.textChoice}>{choiceA}</Text>
        </TouchableOpacity>
        <Gap height={28} />
        <TouchableOpacity
          style={styles.choiceContainer}
          onPress={() => choiceOnPress('choiceB')}>
          <Text style={styles.textChoice}>{choiceB}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
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
  },
  textChoice: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(13),
    color: color.Neutral[10],
  },
});
