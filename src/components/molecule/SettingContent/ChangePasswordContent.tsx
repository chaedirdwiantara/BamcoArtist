import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Color from '../../../theme/Color';
import {Button, SsuInput} from '../../atom';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface ChangePasswordProps {
  onPressGoBack: () => void;
}

export const ChangePasswordContent: React.FC<ChangePasswordProps> = ({
  onPressGoBack,
}) => {
  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [error, setError] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
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
        title="Change Password"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{marginBottom: heightPercentage(15)}}
      />

      <SsuInput.InputLabel
        label="Input Old Password"
        password
        placeholder="Input Old Password"
        value={state.oldPassword}
        isError={error.oldPassword}
        onChangeText={(newText: string) => onChangeText('oldPassword', newText)}
        containerStyles={{marginTop: heightPercentage(15), width: '90%'}}
      />

      <SsuInput.InputLabel
        label="New Password"
        password
        placeholder="Input New Password"
        value={state.newPassword}
        isError={error.newPassword}
        onChangeText={(newText: string) => onChangeText('newPassword', newText)}
        containerStyles={{marginTop: heightPercentage(15), width: '90%'}}
      />

      <SsuInput.InputLabel
        label="Repeat Password"
        password
        placeholder="Repeat New Password"
        value={state.confirmNewPassword}
        isError={error.confirmNewPassword}
        onChangeText={(newText: string) =>
          onChangeText('confirmNewPassword', newText)
        }
        containerStyles={{marginTop: heightPercentage(15), width: '90%'}}
      />

      <Button
        label="Change Password"
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
