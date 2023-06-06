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
  kFormatter,
} from '../../../utils';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import SsuSheet from '../../atom/SsuSheet';
import {CoinIcon, ErrorIcon} from '../../../assets/icon';
import {color, font, typography} from '../../../theme';
import {RootStackParams} from '../../../navigations';
import {Button, Gap, SelectBoxTip} from '../../atom';
import {useCreditHook} from '../../../hooks/use-credit.hook';
import {creditType, listCredit} from '../../../data/listDonate';
import {useMusicianHook} from '../../../hooks/use-musician.hook';
import {ModalLoading} from '../ModalLoading/ModalLoading';

interface ModalDonateProps {
  userId: string;
  modalVisible: boolean;
  onPressClose: () => void;
  onPressDonate: () => void;
  onModalHide: () => void;
}

export const ModalDonate: React.FC<ModalDonateProps> = ({
  userId,
  modalVisible,
  onPressClose,
  onPressDonate,
  onModalHide,
}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {creditCount, getCreditCount, createNewDonation} = useCreditHook();
  const {getDetailMusician, dataDetailMusician} = useMusicianHook();

  useEffect(() => {
    getCreditCount();
  }, [modalVisible]);

  const [selectedCredit, setSelectedCredit] = useState<string>('');
  const [selectedCreditType, setSelectedCreditType] = useState<string>('');
  const [donate, setDonate] = useState<string>('');
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [disabledSendButton, setDisabledSendButton] = useState<boolean>(true);
  const [errorBalance, setErrorBalance] = useState<boolean>(false);
  const [errorDonate, setErrorDonate] = useState<boolean>(false);
  const [loadingDonate, setLoadingDonate] = useState<boolean>(false);

  useEffect(() => {
    if ((selectedCredit !== '' || donate !== '') && selectedCreditType !== '') {
      if (selectedCredit !== '' && creditCount >= Number(selectedCredit)) {
        setDisabledSendButton(false);
      } else if (donate !== '' && creditCount >= Number(donate)) {
        setDisabledSendButton(false);
      } else {
        setDisabledSendButton(true);
        setErrorBalance(true);
      }
    }
  }, [selectedCredit, selectedCreditType, donate]);

  useEffect(() => {
    getDetailMusician({id: userId});
  }, [userId]);

  const goToScreenCoin = () => {
    onPressClose();
    navigation.navigate('TopupCoin');
  };

  const resetForm = () => {
    setShowCustomInput(false);
    setDonate('');
    setSelectedCredit('');
    setSelectedCreditType('');
    setErrorBalance(false);
    setErrorDonate(false);
    setDisabledSendButton(true);
  };

  const onCloseModal = () => {
    resetForm();
    onPressClose();
  };

  const submitDonation = async () => {
    setLoadingDonate(true);
    const form = {
      ownerId: dataDetailMusician?.uuid || '',
      ownerUserName: dataDetailMusician?.username || '',
      ownerFullName: dataDetailMusician?.fullname || '',
      package: '',
      duration: Number(selectedCreditType),
      contributionRepeat: selectedCreditType !== '0' ? 1 : 0,
      credit: selectedCredit ? Number(selectedCredit) : Number(donate),
    };

    const response = await createNewDonation(form);
    setLoadingDonate(false);
    if (response.code === 200) {
      resetForm();
      onPressDonate();
    } else setErrorDonate(true);
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
            value={donate}
            onChangeText={(newText: string) => setDonate(newText)}
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
            setSelectedCredit('');
            setDisabledSendButton(true);
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
              {kFormatter(creditCount, 1)}
            </Text>
          </View>

          <TouchableOpacity onPress={goToScreenCoin}>
            <Text style={[typography.Button2, {color: color.Pink[2]}]}>
              + {t('Setting.Tips.Label.AddMoreCoin')}
            </Text>
          </TouchableOpacity>
        </View>

        {(errorBalance || errorDonate) && (
          <View style={styles.containerError}>
            <ErrorIcon
              fill={Color.Error[500]}
              style={{marginBottom: mvs(-1)}}
            />
            <Gap width={4} />
            <Text
              style={{
                fontFamily: font.InterRegular,
                fontWeight: '400',
                fontSize: mvs(10),
                color: Color.Error[500],
                maxWidth: '90%',
              }}>
              {errorBalance
                ? 'It`s seems your balance is lower than your tip amount'
                : 'Sorry, there is a problem, please try again' + userId}
            </Text>
          </View>
        )}

        <Button
          label={t('Home.Tab.TopMusician.Tip')}
          containerStyles={
            disabledSendButton ? styles.btnDonateDisabled : styles.btnDonate
          }
          onPress={submitDonation}
          disabled={disabledSendButton}
        />
        <Button
          type="border"
          label={t('Btn.Cancel')}
          borderColor={color.Success[400]}
          containerStyles={styles.btnCancel}
          textStyles={{color: Color.Success[400]}}
          onPress={onCloseModal}
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
      <ModalLoading visible={loadingDonate} />
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
  btnDonateDisabled: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(20),
    backgroundColor: '#8794AD',
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
  containerError: {
    paddingTop: mvs(6),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: width * 0.9,
  },
});
