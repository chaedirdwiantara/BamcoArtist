import React, {FC} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';

import {Button} from '../../atom';
import {color, typography} from '../../../theme';
import {CheckGradientIcon} from '../../../assets/icon';
import {heightResponsive, widthResponsive} from '../../../utils';

interface ModalSuccessProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  onPress: () => void;
  modalVisible: boolean;
  containerStyle?: ViewStyle;
}

export const ModalSuccess: FC<ModalSuccessProps> = (
  props: ModalSuccessProps,
) => {
  const {onPress, modalVisible, title, subtitle, buttonText} = props;
  return (
    <>
      {modalVisible && (
        <Modal
          isVisible={modalVisible}
          onBackdropPress={onPress}
          onBackButtonPress={onPress}
          style={styles.modalStyle}>
          <View style={styles.container}>
            <CheckGradientIcon style={styles.iconStyle} />
            <Text style={[typography.Subtitle1, styles.textStyles]}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[typography.Button2, styles.textStyles]}>
                {subtitle}
              </Text>
            )}
            <Button
              label={buttonText || ''}
              containerStyles={styles.btnDonate}
              onPress={onPress}
            />
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: color.Dark[800],
    alignItems: 'center',
    paddingHorizontal: widthResponsive(24),
    borderRadius: 4,
  },
  iconStyle: {
    marginTop: heightResponsive(32),
    marginBottom: heightResponsive(20),
  },
  textStyles: {
    color: color.Neutral[10],
    marginBottom: heightResponsive(20),
    textAlign: 'center',
  },
  btnDonate: {
    width: '100%',
    backgroundColor: color.Success[400],
    marginBottom: heightResponsive(32),
  },
});
