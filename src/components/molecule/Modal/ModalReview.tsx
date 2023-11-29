import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import SsuSheet from '../../atom/SsuSheet';
import {color, typography} from '../../../theme';
import {heightPercentage} from '../../../utils';
import {useTranslation} from 'react-i18next';
import Color from '../../../theme/Color';
import Rating from '../../atom/Review/Rating';
import ReviewInput from '../../atom/Review/ReviewInput';
import FileUpload from '../../atom/Review/FileUpload';
import {Button, Gap} from '../../atom';
import {mvs} from 'react-native-size-matters';

interface ModalReviewProps {
  modalVisible: boolean;
  onPressClose: () => void;
}

export const ModalReview: React.FC<ModalReviewProps> = ({
  modalVisible,
  onPressClose,
}) => {
  const {t} = useTranslation();

  const [review, setReview] = useState<string>('');

  const children = () => {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
        }}>
        <View style={styles.containerTitle}>
          <Text
            style={[
              typography.Heading4,
              {color: color.Neutral[10], textAlign: 'center'},
            ]}>
            {t('Review.Title')}
          </Text>
        </View>
        <View style={styles.border} />
        <View>
          <Rating />
          <ReviewInput value={review} onChange={setReview} />
          <FileUpload />
        </View>
        <View style={{paddingHorizontal: heightPercentage(20)}}>
          <Button
            label={t('Btn.Submit')}
            textStyles={{fontSize: mvs(14)}}
            containerStyles={{width: '100%'}}
            onPress={() => null}
          />
          <Gap height={heightPercentage(12)} />
          <Button
            type="border"
            label={t('Btn.Cancel')}
            textStyles={{fontSize: mvs(14), color: Color.Success[400]}}
            containerStyles={{width: '100%'}}
            onPress={onPressClose}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      {modalVisible && (
        <Modal isVisible={modalVisible} style={{margin: 0}} avoidKeyboard>
          <TouchableWithoutFeedback onPress={onPressClose}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <SsuSheet
            children={children()}
            containerStyle={{paddingHorizontal: 0}}
          />
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentage(16),
  },
  border: {
    borderTopWidth: 1,
    borderTopColor: Color.Dark[500],
    marginTop: heightPercentage(14),
  },
});
