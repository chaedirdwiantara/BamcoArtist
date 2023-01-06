import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, SsuInput} from '../../atom';
import {Dropdown} from '../DropDown';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {dataGender, dataLocation} from '../../../data/Settings/account';

interface ShippingInformationProps {
  onPressGoBack: () => void;
}

export const ShippingInformationContent: React.FC<ShippingInformationProps> = ({
  onPressGoBack,
}) => {
  const [state, setState] = useState({
    email: '',
    phoneNo: '',
    fullname: '',
    province: '',
    country: '',
    city: '',
    postalCode: '',
    address: '',
  });

  const [error, setError] = useState({
    email: false,
    phoneNo: false,
    fullname: false,
    province: false,
    country: false,
    city: false,
    postalCode: false,
    address: false,
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
        title="Shipping Information"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{marginBottom: heightPercentage(15)}}
      />

      <SsuInput.InputLabel
        label="Email"
        placeholder="Add Email"
        value={state.email}
        isError={error.email}
        onChangeText={(newText: string) => onChangeText('email', newText)}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Dropdown.Input
          data={dataLocation}
          dropdownLabel={''}
          placeHolder={''}
          textTyped={(newText: string) => onChangeText('city', newText)}
          containerStyles={{marginTop: heightPercentage(15), width: '20%'}}
        />
        <SsuInput.InputLabel
          label="New Phone Number"
          placeholder="New Phone Number"
          value={state.phoneNo}
          isError={error.phoneNo}
          keyboardType={'number-pad'}
          onChangeText={(newText: string) => onChangeText('phoneNo', newText)}
          containerStyles={{marginTop: heightPercentage(15), width: '80%'}}
        />
      </View>

      <SsuInput.InputLabel
        label="Full Name"
        placeholder="Add Full Name"
        value={state.fullname}
        isError={error.fullname}
        errorMsg={'Full Name can not be blank, please input your Full Name'}
        onChangeText={(newText: string) => onChangeText('fullname', newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Dropdown.Input
          data={dataGender}
          placeHolder={'Select State/Province'}
          dropdownLabel={'State/Province'}
          textTyped={(newText: string) => onChangeText('province', newText)}
          containerStyles={{marginTop: heightPercentage(15), width: '45%'}}
        />

        <Dropdown.Input
          data={dataLocation}
          placeHolder={'Select Country'}
          dropdownLabel={'Country'}
          textTyped={(newText: string) => onChangeText('country', newText)}
          containerStyles={{marginTop: heightPercentage(15), width: '45%'}}
        />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <SsuInput.InputLabel
          label="Postal Code"
          placeholder="Add Postal Code"
          value={state.postalCode}
          isError={error.postalCode}
          keyboardType={'number-pad'}
          onChangeText={(newText: string) =>
            onChangeText('postalCode', newText)
          }
          containerStyles={{marginTop: heightPercentage(15), width: '45%'}}
        />

        <Dropdown.Input
          data={dataLocation}
          placeHolder={'Select City'}
          dropdownLabel={'City'}
          textTyped={(newText: string) => onChangeText('city', newText)}
          containerStyles={{marginTop: heightPercentage(15), width: '45%'}}
        />
      </View>

      <SsuInput.InputLabel
        label="Address"
        placeholder="Add Address"
        value={state.address}
        isError={error.address}
        onChangeText={(newText: string) => onChangeText('address', newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
      />

      <Button
        label="Save"
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
