import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Color from '../../../theme/Color';
import {Button, SsuInput} from '../../atom';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface ChangeEmailProps {
  onPressGoBack: () => void;
}

export const ChangeEmailContent: React.FC<ChangeEmailProps> = ({
  onPressGoBack,
}) => {
  const [state, setState] = useState({
    oldEmail: 'H@sunnysideup.io',
    newEmail: '',
    verifCode: '',
  });

  const [error, setError] = useState({
    newEmail: false,
    verifCode: false,
  });

  const onChangeText = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const onPressSave = () => {};

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Change Email"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{marginBottom: heightPercentage(15)}}
      />

      <SsuInput.InputLabel
        label="Old Email"
        value={state.oldEmail}
        editable={false}
        containerInputStyles={{borderBottomWidth: 0}}
      />

      <SsuInput.InputLabel
        label="New Email"
        placeholder="Add New Email"
        value={state.newEmail}
        isError={error.newEmail}
        onChangeText={(newText: string) => onChangeText('newEmail', newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
      />

      <Button
        label="Send Verification To New Email"
        onPress={onPressSave}
        containerStyles={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(25),
    alignSelf: 'center',
    backgroundColor: Color.Pink[200],
  },
});
