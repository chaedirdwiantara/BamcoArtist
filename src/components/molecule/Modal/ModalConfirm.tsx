import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {
  heightPercentage,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {color} from '../../../theme';

interface ModalConfirmProps {
  title?: string;
  subtitle?: string;
  modalVisible: boolean;
  onPressClose?: () => void;
  onPressOk?: () => void;
  disabled?: boolean;
  yesText?: string;
  noText?: string;
  oneButton?: boolean;
  rightButtonStyle?: ViewStyle;
  textNavigate?: string;
  textOnPress?: () => void;
  subtitleStyles?: TextStyle;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = (
  props: ModalConfirmProps,
) => {
  const {t} = useTranslation();
  const {
    title,
    subtitle,
    modalVisible,
    onPressClose,
    onPressOk,
    disabled,
    yesText,
    noText,
    oneButton,
    rightButtonStyle,
    textNavigate,
    textOnPress,
    subtitleStyles,
  } = props;

  const renderHighlightedSubtitle = (
    markedText: string,
    textToSearch: string,
  ) => {
    const indexStart = textToSearch.indexOf(markedText);
    const indexEnd = indexStart + markedText.length;

    if (indexStart === -1) {
      return <Text style={styles.highlightedText}>{textToSearch}</Text>;
    }

    const beforeHighlight = textToSearch.substring(0, indexStart);
    const highlighted = textToSearch.substring(indexStart, indexEnd);
    const afterHighlight = textToSearch.substring(indexEnd);

    return (
      <Text style={styles.subtitle}>
        {beforeHighlight}
        <Text style={styles.highlightedText} onPress={textOnPress}>
          {highlighted}
        </Text>
        {afterHighlight}
      </Text>
    );
  };

  return (
    <>
      {modalVisible && (
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
              {textNavigate && subtitle ? (
                renderHighlightedSubtitle(textNavigate, subtitle)
              ) : (
                <Text style={[styles.subtitle, subtitleStyles]}>
                  {subtitle}
                </Text>
              )}
              {!oneButton ? (
                <View style={styles.containerButton}>
                  <TouchableOpacity onPress={onPressClose}>
                    <Text style={styles.option}>
                      {noText ? noText : t('General.No')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={disabled}
                    onPress={onPressOk}
                    style={rightButtonStyle}>
                    <Text style={styles.option}>
                      {yesText ? yesText : t('General.Yes')}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.containerButton}>
                  <TouchableOpacity onPress={onPressOk}>
                    <Text style={styles.option}>
                      {yesText ? yesText : t('General.Yes')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width * 0.9,
    backgroundColor: Color.Dark[900],
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: widthPercentage(20),
    paddingVertical: heightPercentage(15),
  },
  title: {
    fontSize: mvs(16),
    color: Color.Neutral[10],
    fontFamily: Font.InterSemiBold,
  },
  subtitle: {
    fontSize: mvs(15),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
    marginTop: widthResponsive(16),
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: heightPercentage(25),
  },
  option: {
    fontSize: mvs(14),
    paddingHorizontal: widthPercentage(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
  },
  highlightedText: {
    color: color.Pink[200],
  },
});
