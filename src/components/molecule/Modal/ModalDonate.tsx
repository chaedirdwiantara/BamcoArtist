import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import SsuSheet from '../../atom/SsuSheet';
import {RootStackParams} from '../../../navigations';
import {color, typography} from '../../../theme';
import {Button, Gap, SsuInput} from '../../atom';
import {listDonate} from '../../../data/listDonate';
import {RadioButton} from '../RadioButton/RadioButton';
import {CoinIcon, CoinInput} from '../../../assets/icon';
import {useTranslation} from 'react-i18next';

interface ModalDonateProps {
  totalCoin: number;
  modalVisible: boolean;
  onPressClose: () => void;
  onPressDonate: () => void;
  onModalHide: () => void;
}

export const ModalDonate: React.FC<ModalDonateProps> = ({
  totalCoin,
  modalVisible,
  onPressClose,
  onPressDonate,
  onModalHide,
}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [donate, setDonate] = useState('');
  const [donateList, setDonateList] = useState(listDonate);
  const [focusInput, setFocusInput] = useState(false);

  const onPressSelected = (index: number) => {
    let newList = [...donateList];
    // all radio selected => false
    newList = newList.map(v => ({...v, selected: false}));
    // change selected value
    newList[index].selected = true;
    setDonateList(newList);
  };

  const goToScreenCoin = () => {
    onPressClose();
    navigation.navigate('TopupCoin');
  };

  const children = () => {
    return (
      <>
        <Text style={styles.titleStyle}>{t('Home.Tab.TopMusician.Tip')}</Text>
        <View style={styles.separator} />
        <View style={styles.containerContent}>
          <Text style={[typography.Subtitle1, {color: color.Neutral[10]}]}>
            {t('Setting.Tips.Label.TipType')}
          </Text>
          <Gap height={heightPercentage(20)} />
          {donateList.map((val, i) => (
            <View key={i}>
              <RadioButton
                text={t(val.text)}
                selected={val.selected}
                onPress={() => onPressSelected(i)}
              />
              <Gap height={heightPercentage(10)} />
            </View>
          ))}
        </View>
        <SsuInput.InputText
          value={donate}
          leftIcon={<CoinInput />}
          onChangeText={(newText: string) => setDonate(newText)}
          placeholder={t('Setting.Tips.Label.InputDonation') || ''}
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
          keyboardType={'number-pad'}
        />

        <View style={styles.containerCoin}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[typography.Button2, {color: color.Neutral[10]}]}>
              {t('Setting.Tips.Label.YourCoin')}
            </Text>
            <CoinIcon style={styles.coinIcon} />
            <Text style={[typography.Button2, {color: color.Pink.linear}]}>
              {totalCoin}
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
          containerStyles={styles.btnCancel}
          textStyles={{color: Color.Pink.linear}}
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
  textMenu: {
    color: Color.Neutral[10],
    textAlign: 'center',
    fontFamily: Font.InterRegular,
    fontSize: normalize(14),
  },
  containerContent: {
    width: widthPercentage(327),
    marginBottom: heightPercentage(15),
  },
  containerCoin: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: widthPercentage(327),
  },
  coinIcon: {
    alignSelf: 'center',
    marginHorizontal: widthPercentage(5),
  },
});
