import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import {Button, SsuInput} from '../../atom';
import Font from '../../../theme/Font';
import SsuSheet from '../../atom/SsuSheet';
import {color} from '../../../theme';
import {Fb2Icon} from '../../../assets/icon';

interface ModalSocMedProps {
  titleModal: string;
  modalVisible: boolean;
  onPressClose: () => void;
}

export const ModalSocMed: React.FC<ModalSocMedProps> = ({
  titleModal,
  modalVisible,
  onPressClose,
}) => {
  const [focusInput, setFocusInput] = useState(false);

  const ListSocMed = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Fb2Icon style={{marginRight: 20}} />
        <SsuInput.InputText
          placeholder={'Add Username'}
          fontColor={color.Neutral[10]}
          borderColor={color.Pink.linear}
          onFocus={() => {
            setFocusInput(true);
          }}
          onBlur={() => {
            setFocusInput(false);
          }}
          containerStyles={styles.containerContent}
          isFocus={focusInput}
        />
      </View>
    );
  };

  const children = () => {
    return (
      <>
        <Text style={styles.titleStyle}>{titleModal}</Text>
        <View style={styles.separator} />
        <ListSocMed />
        <Button
          type="border"
          label="Cancel"
          containerStyles={styles.btnCancel}
          textStyles={{color: color.Pink.linear}}
          onPress={onPressClose}
        />
      </>
    );
  };

  return (
    <Modal avoidKeyboard isVisible={modalVisible} style={{margin: 0}}>
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
    color: color.Neutral[10],
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
  btnCancel: {
    width: widthPercentage(327),
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(10),
  },
  containerContent: {
    width: '90%',
  },
});
