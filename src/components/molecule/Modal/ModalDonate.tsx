import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  width,
  normalize,
  widthPercentage,
  heightPercentage,
} from '../../../utils';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import SsuSheet from '../../atom/SsuSheet';
import {CoinIcon} from '../../../assets/icon';
import {color, typography} from '../../../theme';
import {RootStackParams} from '../../../navigations';
import {Button, Gap, SelectBoxTip} from '../../atom';
import {useCreditHook} from '../../../hooks/use-credit.hook';
import {creditType, listCredit} from '../../../data/listDonate';

interface ModalDonateProps {
  modalVisible: boolean;
  onPressClose: () => void;
  onPressDonate: () => void;
  onModalHide: () => void;
}

export const ModalDonate: React.FC<ModalDonateProps> = ({
  modalVisible,
  onPressClose,
  onPressDonate,
  onModalHide,
}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {creditCount, getCreditCount} = useCreditHook();

  useEffect(() => {
    getCreditCount();
  }, []);

  const [selectedCredit, setSelectedCredit] = useState<string>('');
  const [selectedCreditType, setSelectedCreditType] = useState<string>('');
  const [donate, setDonate] = useState<string>('');
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

  const goToScreenCoin = () => {
    onPressClose();
    navigation.navigate('TopupCoin');
  };

  const CustomInput = () => {
    return (
      <View style={styles.containerCustom}>
        <Text style={[typography.Subtitle1, {color: color.Neutral[10]}]}>
          {t('Setting.Tips.CustomTip')}
        </Text>
        <View
          style={[
            styles.containerInput,
            {
              borderBottomWidth: focusInput ? 1 : 0,
            },
          ]}>
          <TextInput
            // value={donate}
            // onChangeText={(newText: string) => setDonate(newText)}
            style={styles.inputStyle}
            placeholder="0.00"
            placeholderTextColor={'#ffffff4d'}
            onFocus={() => {
              setFocusInput(true);
            }}
            onBlur={() => {
              setFocusInput(false);
            }}
            keyboardType={'number-pad'}
          />
        </View>
      </View>
    );
  };

  const children = () => {
    return (
      <>
        <Text style={styles.titleStyle}>{t('Home.Tab.TopMusician.Tip')}</Text>
        <View style={styles.separator} />
        {showCustomInput ? (
          <CustomInput />
        ) : (
          <View style={styles.containerContent}>
            <Text style={[typography.Subtitle1, {color: color.Neutral[10]}]}>
              {t('Setting.Tips.Label.TipType')}
            </Text>
            <Gap height={heightPercentage(10)} />
            <SelectBoxTip
              selected={selectedCredit}
              setSelected={setSelectedCredit}
              data={listCredit}
              boxStyle={styles.boxStyle1}
              containerStyle={styles.containerSelected1}
              activeColor={color.Pink[200]}
            />
          </View>
        )}

        <TouchableOpacity
          style={{
            marginTop: heightPercentage(5),
            marginBottom: heightPercentage(20),
          }}
          onPress={() => {
            setShowCustomInput(!showCustomInput);
            setDonate('');
          }}>
          {showCustomInput ? (
            <Text style={[typography.Subtitle1, {color: color.Pink[200]}]}>
              {t('Btn.Back')}
            </Text>
          ) : (
            <Text style={[typography.Subtitle1, {color: color.Success[400]}]}>
              {t('Setting.Tips.AddCustom')}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.containerContent}>
          <Text style={[typography.Subtitle1, {color: color.Neutral[10]}]}>
            {t('Setting.Tips.Label.ContinueSendTip')}
          </Text>
          <Gap height={heightPercentage(10)} />
          <SelectBoxTip
            selected={selectedCreditType}
            setSelected={setSelectedCreditType}
            data={creditType}
            boxStyle={styles.boxStyle2}
            containerStyle={styles.containerSelected2}
            activeColor={color.Pink[200]}
          />
        </View>

        <View style={styles.containerCoin}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[typography.Button2, {color: color.Neutral[10]}]}>
              {t('Setting.Tips.Label.YourCoin')}
            </Text>
            <CoinIcon style={styles.coinIcon} />
            <Text style={[typography.Button2, {color: color.Pink.linear}]}>
              {creditCount}
            </Text>
          </View>

          <TouchableOpacity onPress={goToScreenCoin}>
            <Text style={[typography.Button2, {color: color.Pink[2]}]}>
              + {t('Setting.Tips.Label.AddMoreCoin')}
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          label={t('Home.Tab.TopMusician.Tip')}
          containerStyles={styles.btnDonate}
          onPress={onPressDonate}
        />
        <Button
          type="border"
          label={t('Btn.Cancel')}
          borderColor={color.Success[400]}
          containerStyles={styles.btnCancel}
          textStyles={{color: Color.Success[400]}}
          onPress={onPressClose}
        />
      </>
    );
  };

  return (
    <Modal
      isVisible={modalVisible}
      avoidKeyboard
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
  btnDonate: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(20),
    backgroundColor: color.Success[400],
  },
  btnCancel: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(10),
  },
  textMenu: {
    color: Color.Neutral[10],
    textAlign: 'center',
    fontFamily: Font.InterRegular,
    fontSize: normalize(14),
  },
  containerContent: {
    width: width * 0.9,
    marginBottom: heightPercentage(15),
  },
  containerCoin: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width * 0.9,
  },
  coinIcon: {
    alignSelf: 'center',
    marginHorizontal: widthPercentage(5),
  },
  containerSelected1: {
    width,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSelected2: {
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxStyle1: {
    width: width * 0.4,
    marginHorizontal: widthPercentage(5),
  },
  boxStyle2: {
    borderRadius: widthPercentage(30),
    marginHorizontal: widthPercentage(5),
    paddingHorizontal: widthPercentage(20),
  },
  containerCustom: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInput: {
    borderBottomColor: color.Pink.linear,
    marginTop: heightPercentage(15),
    marginBottom: heightPercentage(10),
    paddingHorizontal: widthPercentage(12),
  },
  inputStyle: {
    fontSize: mvs(40),
    color: color.Neutral[10],
    marginVertical: Platform.OS === 'ios' ? mvs(8) : 0,
  },
});
