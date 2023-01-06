import React from 'react';
import {TopNavigation} from '../../components';
import {ArrowLeftIcon, AudioMusic} from '../../assets/icon';
import {color} from '../../theme';
import {widthResponsive} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {NativeModules, Platform} from 'react-native';

const {StatusBarManager} = NativeModules;
const barHeight = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const TopNav = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <TopNavigation.Type4
      title="Now Playing"
      leftIcon={
        <ArrowLeftIcon
          stroke={color.Neutral[10]}
          style={{marginLeft: widthResponsive(-6)}}
        />
      }
      leftIconAction={navigation.goBack}
      rightIcon={<AudioMusic />}
      rightIconAction={() => navigation.navigate('SongDetails')}
      itemStrokeColor={'white'}
      containerStyles={{
        borderBottomWidth: 0,
        paddingBottom: 0,
      }}
    />
  );
};

export default TopNav;
