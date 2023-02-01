import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {
  heightPercentage,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {Dropdown} from '../DropDown';
import Color from '../../../theme/Color';
import {typography} from '../../../theme';
import {TopNavigation} from '../TopNavigation';
import {updateProfile} from '../../../api/profile.api';
import {Button, Gap, SsuInput, SsuToast} from '../../atom';
import {ArrowLeftIcon, TickCircleIcon} from '../../../assets/icon';
import {dataGender, dataLocation} from '../../../data/Settings/account';
import {ProfileResponseType} from '../../../interface/profile.interface';

interface AccountProps {
  profile: ProfileResponseType;
  onPressGoBack: () => void;
}

export const AccountContent: React.FC<AccountProps> = ({
  profile,
  onPressGoBack,
}) => {
  const [state, setState] = useState({
    username: profile?.data.username || '',
    fullname: profile?.data.fullname || '',
    gender: profile?.data.gender || '',
    locationCountry: profile?.data.locationCountry || '',
  });
  const [errorState, setErrorState] = useState({
    username: false,
    fullname: false,
    gender: false,
    locationCountry: false,
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  const onChangeText = (key: string, value: string) => {
    if (key === 'fullname') {
      setErrorState({...errorState, fullname: value === ''});
    }
    setState({
      ...state,
      [key]: value,
    });
  };

  const onPressSave = async () => {
    try {
      await updateProfile(state);
      setToastVisible(true);
      setErrorMsg('');
    } catch (error) {
      setErrorState({
        ...errorState,
        username: true,
      });
      console.log(error);
    }
  };

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
        isError={errorState.username}
        placeholder="Add Username"
        errorMsg={errorMsg}
        onChangeText={(newText: string) => onChangeText('username', newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
      />

      <SsuInput.InputLabel
        label="Full Name"
        placeholder="Add Full Name"
        value={state.fullname}
        isError={errorState.fullname}
        errorMsg={'Full Name can not be blank, please input your Full Name'}
        onChangeText={(newText: string) => onChangeText('fullname', newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
      />

      <Dropdown.Input
        initialValue={state.gender}
        data={dataGender}
        placeHolder={'Select Gender'}
        dropdownLabel={'Gender'}
        textTyped={(newText: {label: string; value: string}) =>
          onChangeText('gender', newText.value)
        }
        containerStyles={{marginTop: heightPercentage(15)}}
      />

      <Dropdown.Input
        initialValue={state.locationCountry}
        data={dataLocation}
        placeHolder={'Search Country'}
        dropdownLabel={'Location'}
        textTyped={(newText: {label: string; value: string}) =>
          onChangeText('locationCountry', newText.value)
        }
        containerStyles={{marginTop: heightPercentage(15)}}
      />

      <Button
        label="SAVE"
        onPress={onPressSave}
        containerStyles={styles.button}
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={widthResponsive(21)}
              height={heightPercentage(20)}
              stroke={Color.Neutral[10]}
            />
            <Gap width={widthResponsive(7)} />
            <Text
              style={[
                typography.Button2,
                {
                  color: Color.Neutral[10],
                },
              ]}>
              Your account have been updated!
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthResponsive(24)}}
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
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: Color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
});
