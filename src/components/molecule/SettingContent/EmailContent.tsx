import React from 'react';
import {View, StyleSheet} from 'react-native';

import {SsuInput} from '../../atom';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {MenuText} from '../../atom/MenuText/MenuText';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface EmailProps {
  onPressGoBack: () => void;
  goToChangeEmail: () => void;
}

export const EmailContent: React.FC<EmailProps> = ({
  onPressGoBack,
  goToChangeEmail,
}) => {
  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Email"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(12)}}
      />
      <SsuInput.InputLabel
        label="Email"
        value={'H@sunnysideup.io'}
        editable={false}
        containerInputStyles={{borderBottomWidth: 0}}
        containerStyles={styles.containerInput}
      />
      <MenuText.RightIcon
        text={'Change Email'}
        containerStyles={{marginTop: heightPercentage(15)}}
        onPress={goToChangeEmail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  containerInput: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: heightPercentage(15),
  },
});
