import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Gap, TopNavigation} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';
import {color} from '../../../../theme';
import WhoListenSong from './WhoListenSong';
import {widthResponsive} from '../../../../utils';
import SongListenerCountry from './SongListenerCountry';
import SongListenerLike from './SongListenerLikes';
import SongDescription from './SongDesc';

const SongDetailAnalytic = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <TopNavigation.Type1
        title={`${t('Home.Tab.Analytic.Album.DetailSong.Title')}`}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={color.Neutral[10]}
        containerStyles={{
          borderBottomWidth: 1,
          borderBottomColor: color.Dark[400],
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SongDescription />
        <Gap height={20} />
        <WhoListenSong />
        <Gap height={20} />
        <SongListenerCountry />
        <Gap height={20} />
        <SongListenerLike />
      </ScrollView>
    </View>
  );
};

export default SongDetailAnalytic;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.Dark[800],
  },
  scrollContainer: {
    padding: widthResponsive(20),
    paddingBottom: widthResponsive(125),
  },
});
