import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import Font from '../../../theme/Font';
import {width, widthResponsive} from '../../../utils';
import {useTranslation} from 'react-i18next';
import {DataDropDownType} from '../../../data/report';
import {PressedRadioIcon, RadioButtonIcon} from '../../../assets/icon';
import {ErrorWarning, Gap, SsuInput} from '../../atom';
import {color, font} from '../../../theme';

interface ModalReportProps {
  title: string;
  secondTitle: string;
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
  const {
    title,
    secondTitle,
    modalVisible,
    onPressClose,
    onPressOk,
    disabled,
    dataReport,
  } = props;

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [reason, setReason] = useState<string>('');
  const [nextPage, setNextPage] = useState<boolean>(false);
  const [errorWarning, setErrorWarning] = useState<boolean>(false);

  const choiceOnPress = (label: string, index: number) => {
    setActiveIndex(index);
    setSelectedCategory(label);
    setErrorWarning(false);
  };

  const sendFirstPageOnPress = () => {
    if (selectedCategory) {
      setNextPage(true);
    } else {
      setErrorWarning(true);
    }
    onPressOk?.();
  };

  const sendSecondPageOnPress = () => {
    onPressOk?.();
  };

  const editOnPress = () => {
    setNextPage(false);
  };

  const cancelOnPress = () => {
    setNextPage(false);
    setSelectedCategory(undefined);
    setActiveIndex(-1);
    setReason('');
    setErrorWarning(false);
    onPressClose?.();
  };

  const modalFirstPage = () => {
    return (
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
            <Text key={index} style={styles.category}>
              {t(item.label)}
            </Text>
          </TouchableOpacity>
        ))}
        {errorWarning && (
          <>
            <ErrorWarning erroMsg={t('ModalComponent.Report.Warning')} />
            <Gap height={12} />
          </>
        )}
        <Gap height={4} />
        <SsuInput.TextArea
          containerStyles={styles.reportContainer}
          numberOfLines={7}
          maxLength={400}
          placeholder={`${t('ModalComponent.Report.Placeholder')}`}
          value={reason}
          onChangeText={(newText: string) => setReason(newText)}
        />
        <Gap height={20} />
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={cancelOnPress}>
            <Text style={styles.option}>
              {t('ModalComponent.Report.Button.Cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={disabled} onPress={sendFirstPageOnPress}>
            <Text style={styles.option}>
              {t('ModalComponent.Report.Button.Send')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const modalSecondPage = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{secondTitle}</Text>
        <Gap height={20} />
        <Text style={styles.subtitle}>
          {t('ModalComponent.Report.Subtitle.Category')}
        </Text>
        <Gap height={4} />
        <Text style={styles.category}>
          {selectedCategory ? t(selectedCategory) : ''}
        </Text>
        <Gap height={16} />
        <Text style={styles.subtitle}>
          {t('ModalComponent.Report.Subtitle.Category')}
        </Text>
        <Gap height={8} />
        <SsuInput.TextArea
          containerStyles={styles.reportContainer}
          numberOfLines={7}
          maxLength={400}
          value={reason}
          onChangeText={(newText: string) => setReason(newText)}
          editable={false}
        />
        <Gap height={20} />
        <View style={styles.containerButtonNextPage}>
          <TouchableOpacity onPress={editOnPress}>
            <Text style={[styles.option, {paddingLeft: 0}]}>
              {t('ModalComponent.Report.Button.Edit')}
            </Text>
          </TouchableOpacity>
          <View style={styles.containerButtonLeft}>
            <TouchableOpacity onPress={cancelOnPress}>
              <Text style={styles.option}>
                {t('ModalComponent.Report.Button.Cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={disabled}
              onPress={sendSecondPageOnPress}>
              <Text style={styles.option}>
                {t('ModalComponent.Report.Button.Send')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
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
        {!nextPage ? modalFirstPage() : modalSecondPage()}
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
    backgroundColor: color.Dark[800],
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: widthResponsive(20),
    paddingVertical: widthResponsive(15),
  },
  title: {
    fontSize: mvs(16),
    color: color.Neutral[10],
    fontFamily: Font.InterSemiBold,
  },
  subtitle: {
    fontSize: mvs(10),
    color: color.Neutral[50],
    fontWeight: '400',
    fontFamily: font.InterRegular,
  },
  category: {
    fontSize: mvs(15),
    color: color.Neutral[10],
    fontWeight: '400',
    fontFamily: font.InterRegular,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  containerButtonNextPage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerButtonLeft: {
    flexDirection: 'row',
  },
  option: {
    fontSize: mvs(14),
    paddingHorizontal: widthResponsive(12),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
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
