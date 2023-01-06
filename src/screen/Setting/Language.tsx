import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {ArrowLeftIcon} from '../../assets/icon';
import {Dropdown, TopNavigation} from '../../components';
import {dataLanguage} from '../../data/Settings/language';
import {heightPercentage, widthPercentage} from '../../utils';

export const LanguageScreen: React.FC = () => {
  const [, setLanguage] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Language"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{marginBottom: heightPercentage(15)}}
      />
      <Dropdown.Input
        data={dataLanguage}
        placeHolder={'Search Language'}
        dropdownLabel={'Language'}
        textTyped={(newText: string) => setLanguage(newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
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
});
