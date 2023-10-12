import React from 'react';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ModalCustom} from './ModalCustom';
import {Button, CheckBox, Gap} from '../../atom';
import {width, widthPercentage} from '../../../utils';
import {color, font, typography} from '../../../theme';

interface ModalInfoProps {
  visible: boolean;
  title: string;
  subtitle1: string;
  url: string;
  subtitle2: string;
  showCheckBox?: boolean;
  isChecked?: boolean;
  onPressClose: () => void;
  setIsChecked?: (params: boolean) => void;
  openLink?: () => void;
}

export const ModalInfo: React.FC<ModalInfoProps> = (props: ModalInfoProps) => {
  const {t} = useTranslation();
  const {
    visible,
    title,
    subtitle1,
    url,
    subtitle2,
    showCheckBox,
    isChecked,
    setIsChecked,
    onPressClose,
    openLink,
  } = props;

  const children = () => (
    <View style={styles.card}>
      <View style={styles.containerContent}>
        <Image source={require('../../../assets/image/cloud.png')} />
        <Text style={styles.modalTitle}>{title}</Text>
        <TouchableOpacity
          onPress={openLink}
          disabled={openLink === undefined}
          activeOpacity={1}>
          <Text style={styles.modalSubtitle}>
            <Text>{subtitle1}</Text>
            <Text style={{fontFamily: font.InterBold}}>{url}</Text>
            <Text>{subtitle2}</Text>
          </Text>
        </TouchableOpacity>
      </View>
      {showCheckBox && (
        <View style={styles.containerCheckBox}>
          <CheckBox
            handleOnPress={() => setIsChecked && setIsChecked(!isChecked)}
            active={isChecked || false}
          />
          <Gap width={widthPercentage(10)} />
          <Text style={[typography.Body2, {color: color.Neutral[10]}]}>
            {t('Modal.ModalInfo.CheckboxText')}
          </Text>
        </View>
      )}
      <Button
        label={t('Btn.Dismiss')}
        containerStyles={styles.containerBtn}
        onPress={onPressClose}
      />
    </View>
  );

  return <ModalCustom modalVisible={visible} children={children()} />;
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    backgroundColor: color.Dark[900],
    borderRadius: 4,
    paddingHorizontal: ms(20),
    paddingVertical: mvs(30),
  },
  containerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBtn: {
    width: '95%',
    backgroundColor: color.Success[400],
    alignSelf: 'center',
  },
  modalTitle: {
    color: color.Neutral[10],
    fontFamily: font.InterBold,
    fontSize: mvs(16),
    marginTop: mvs(15),
  },
  modalSubtitle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    marginTop: mvs(10),
    marginBottom: mvs(20),
  },
  containerCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mvs(15),
    marginLeft: widthPercentage(7),
  },
});
