import React from 'react';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import SsuSheet from '../../atom/SsuSheet';
import {RootStackParams} from '../../../navigations';
import {color, typography} from '../../../theme';
import {Button, ButtonGradient} from '../../atom';
import {heightPercentage, normalize} from '../../../utils';

interface BottomSheetGuestProps {
  modalVisible: boolean;
  onPressClose: () => void;
}

export const BottomSheetGuest: React.FC<BottomSheetGuestProps> = ({
  modalVisible,
  onPressClose,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPress = (screen: 'Signup' | 'Login') => {
    navigation.navigate(screen);
    onPressClose();
  };

  const children = () => {
    return (
      <View>
        <View style={styles.containerTitle}>
          <Text
            style={[
              typography.Heading4,
              {color: color.Neutral[10], textAlign: 'center'},
            ]}>
            {'Sign Up or Sign In'}
          </Text>
          <Text style={[typography.Body1, styles.subtitle]}>
            {
              'You are exploring as guest,\nsign up or sign in to enjoy full content'
            }
          </Text>
        </View>
        <ButtonGradient
          label="Sign Up"
          textStyles={{fontSize: normalize(14)}}
          onPress={() => onPress('Signup')}
        />
        <Button
          type="border"
          label="Sign In"
          textStyles={{fontSize: normalize(14)}}
          containerStyles={{marginVertical: mvs(6)}}
          onPress={() => onPress('Login')}
        />
        <Button
          type="border"
          label="Maybe Later"
          borderColor="transparent"
          textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
          onPress={onPressClose}
        />
      </View>
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  containerTitle: {
    marginBottom: heightPercentage(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    color: color.Neutral[10],
    textAlign: 'center',
    letterSpacing: 0,
    marginTop: heightPercentage(20),
  },
});
