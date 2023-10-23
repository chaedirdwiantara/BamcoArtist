import {StyleSheet, View} from 'react-native';
import React from 'react';
import {color} from '../../theme';
import ListToFollowMusician from '../ListCard/ListToFollowMusician';
import {TopNavigation} from '../../components';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {widthResponsive} from '../../utils';

const DiscoverArtist = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleBackAction = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <TopNavigation.Type1
        title={t('DiscoverArtist.Title')}
        leftIconAction={handleBackAction}
        maxLengthTitle={40}
        itemStrokeColor={color.Neutral[10]}
      />
      {/* Body Section */}
      <View style={styles.bodyContainer}>
        <ListToFollowMusician hideCaption />
      </View>
    </View>
  );
};

export default DiscoverArtist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  bodyContainer: {
    paddingHorizontal: widthResponsive(24),
  },
});
