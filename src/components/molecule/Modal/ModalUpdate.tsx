import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {Button} from '../../atom';
import {color} from '../../../theme';

interface ModalUpdateProps {
  modalVisible: boolean;
  onPressClose?: () => void;
  onPressOk?: () => void;
}

export const ModalUpdate: React.FC<ModalUpdateProps> = (
  props: ModalUpdateProps,
) => {
  const {modalVisible, onPressClose, onPressOk} = props;
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
          <View style={styles.imageContainer}>
            <Image source={require('../../../assets/image/update.png')} />
          </View>

          <Text style={styles.title}>New Version Available</Text>
          <Text style={styles.subtitle}>
            We added new feature and fix some bug to make your experience
            better. Please update your application to the latest version.
          </Text>

          <View style={styles.containerButton}>
            <Button
              label="Update"
              textStyles={{fontSize: mvs(14)}}
              containerStyles={{
                width: '100%',
                marginBottom: heightPercentage(10),
              }}
              onPress={onPressOk}
            />
            {onPressClose && (
              <Button
                label="Maybe Later"
                type="border"
                borderColor="transparent"
                textStyles={{fontSize: mvs(14), color: color.Pink.linear}}
                containerStyles={{width: '100%'}}
                onPress={onPressClose}
              />
            )}
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
    backgroundColor: Color.Dark[900],
    justifyContent: 'center',
    borderRadius: 6,
    paddingHorizontal: widthPercentage(20),
    paddingVertical: heightPercentage(15),
  },
  title: {
    fontSize: mvs(16),
    color: Color.Neutral[10],
    fontFamily: Font.InterSemiBold,
    textAlign: 'center',
    marginBottom: heightPercentage(15),
  },
  subtitle: {
    fontSize: mvs(13),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
    marginTop: heightPercentage(5),
    textAlign: 'justify',
  },
  containerButton: {
    flexDirection: 'column',
    marginTop: heightPercentage(25),
  },
  option: {
    fontSize: mvs(14),
    paddingHorizontal: widthPercentage(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: heightPercentage(15),
  },
});
