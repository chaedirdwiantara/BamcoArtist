import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {Dropdown, TopNavigation} from '../../components';
import {ArrowLeftIcon} from '../../assets/icon';
import {heightPercentage, widthPercentage} from '../../utils';
import {MenuText} from '../../components/atom/MenuText/MenuText';
import {countryData} from '../../data/dropdown';

export const PhoneNumberScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [phoneNo, setPhoneNo] = useState('');

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToChangeEmail = () => {
    navigation.navigate('ChangeEmail');
  };

  const resultData = (dataResult: string) => {
    console.log(dataResult, 'dataResult Select Country');
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Phone Number"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(12)}}
      />
      <Dropdown.Country
        value={phoneNo}
        countryData={countryData}
        numberTyped={resultData}
        onChangeText={(text: string) => setPhoneNo(text)}
      />
      <MenuText.RightIcon
        text={'Add Phone Number'}
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
});
