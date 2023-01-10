import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Dropdown} from '../DropDown';
import Color from '../../../theme/Color';
import {Button, SsuInput} from '../../atom';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {ProfileProps} from '../../../hooks/use-storage.hook';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {dataGender, dataLocation} from '../../../data/Settings/account';

interface AccountProps {
  profile: ProfileProps | null;
  onPressGoBack: () => void;
}

export const AccountContent: React.FC<AccountProps> = ({
  profile,
  onPressGoBack,
}) => {
  const [state, setState] = useState({
    username: profile?.username || '',
    fullname: profile?.fullname || '',
    gender: '',
    location: '',
  });

  const [error, setError] = useState({
    fullname: false,
    gender: false,
    location: false,
  });

  const onChangeText = (key: string, value: string) => {
    if (key === 'fullname') {
      setError({...error, fullname: value === ''});
    }
    setState({
      ...state,
      [key]: value,
    });
  };

  const onPressSave = () => {};

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Account"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{marginBottom: heightPercentage(15)}}
      />

      <SsuInput.InputLabel
        label="Username"
        value={state.username}
        editable={false}
        containerInputStyles={{borderBottomWidth: 0}}
      />

      <SsuInput.InputLabel
        label="Full Name"
        placeholder="Add Full Name"
        value={state.fullname}
        isError={error.fullname}
        errorMsg={'Full Name can not be blank, please input your Full Name'}
        onChangeText={(newText: string) => onChangeText('fullname', newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
      />

      <Dropdown.Input
        data={dataGender}
        placeHolder={'Select Gender'}
        dropdownLabel={'Gender'}
        textTyped={(newText: string) => onChangeText('gender', newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
      />

      <Dropdown.Input
        data={dataLocation}
        placeHolder={'Search Country'}
        dropdownLabel={'Location'}
        textTyped={(newText: string) => onChangeText('location', newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
      />

      <Button
        label="SAVE"
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
