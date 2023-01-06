import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  ReferAFriend,
  TabFilter,
  TopNavigation,
  UseReferralContent,
} from '../../components';
import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {ArrowLeftIcon} from '../../assets/icon';
import {heightPercentage, width, widthPercentage} from '../../utils';

export const ReferralCodeSetting: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'REFER A FRIEND'},
    {filterName: 'USE REFERRAL'},
  ]);
  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Referral Code"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          marginBottom: heightPercentage(15),
          paddingHorizontal: widthPercentage(10),
        }}
      />

      <TabFilter.Type1
        filterData={filter}
        onPress={filterData}
        selectedIndex={selectedIndex}
        TouchableStyle={{width: width * 0.45}}
      />

      {filter[selectedIndex].filterName === 'REFER A FRIEND' ? (
        <ReferAFriend />
      ) : (
        <UseReferralContent />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
});
