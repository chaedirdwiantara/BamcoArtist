import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {width, widthResponsive} from '../../../utils';
import {useTranslation} from 'react-i18next';
import {DataDropDownType} from '../../../data/report';
import {PressedRadioIcon, RadioButtonIcon} from '../../../assets/icon';
import {Gap, SsuInput} from '../../atom';
import {color} from '../../../theme';

interface ModalReportProps {
  title?: string;
  modalVisible: boolean;
  onPressClose?: () => void;
  onPressOk?: () => void;
  disabled?: boolean;
  dataReport: DataDropDownType[];
}

export const ModalReport: React.FC<ModalReportProps> = (
  props: ModalReportProps,
) => {
  const {t} = useTranslation();
  const {title, modalVisible, onPressClose, onPressOk, disabled, dataReport} =
    props;

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const choiceOnPress = (label: string, index: number) => {
    setActiveIndex(index);
    //TODO: WIRING AND SEND LABEL
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
      backdropTransitionOutTiming={600}>
      <View style={styles.root}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Gap height={20} />
          {dataReport.map((item, index) => (
            <TouchableOpacity
              style={styles.choiceContainer}
              onPress={() => choiceOnPress(item.label, index)}>
              {activeIndex === index ? (
                <PressedRadioIcon style={styles.customIconStyle} />
              ) : (
                <RadioButtonIcon />
              )}
              <Gap width={12} />
              <Text key={index} style={styles.subtitle}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
          <Gap height={4} />
          <SsuInput.TextArea
            containerStyles={styles.reportContainer}
            numberOfLines={7}
            maxLength={400}
          />
          <Gap height={20} />
          <View style={styles.containerButton}>
            <TouchableOpacity onPress={onPressClose}>
              <Text style={styles.option}>{'Cancel'}</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={disabled} onPress={onPressOk}>
              <Text style={styles.option}>{'Send'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width * 0.9,
    backgroundColor: Color.Dark[800],
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: widthResponsive(20),
    paddingVertical: widthResponsive(15),
  },
  title: {
    fontSize: mvs(16),
    color: Color.Neutral[10],
    fontFamily: Font.InterSemiBold,
  },
  subtitle: {
    fontSize: mvs(15),
    color: Color.Neutral[10],
    fontWeight: '400',
    fontFamily: Font.InterRegular,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  option: {
    fontSize: mvs(14),
    paddingHorizontal: widthResponsive(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: widthResponsive(12),
  },
  reportContainer: {
    borderWidth: 1,
    borderColor: color.Dark[300],
    borderBottomWidth: 1,
    borderBottomColor: color.Dark[300],
    backgroundColor: color.Dark[900],
    paddingVertical: widthResponsive(9),
    paddingHorizontal: widthResponsive(7),
  },
  customIconStyle: {
    marginLeft: widthResponsive(-2),
    marginRight: widthResponsive(-2.8),
    marginBottom: widthResponsive(-1),
  },
});
