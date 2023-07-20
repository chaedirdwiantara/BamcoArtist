import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Gap, ListenerLikes, TopNavigation} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';
import {color} from '../../../../theme';
import WhoListenSong from './WhoListenSong';
import {widthResponsive} from '../../../../utils';
import SongListenerCountry from './SongListenerCountry';
import SongDescription from './SongDesc';

type SongDetailProps = NativeStackScreenProps<
  RootStackParams,
  'SongDetailAnalytic'
>;

const SongDetailAnalytic = ({route}: SongDetailProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const songId = route.params.songId;

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
        <SongDescription songId={songId} />
        <Gap height={20} />
        <WhoListenSong songId={songId} />
        <Gap height={20} />
        <SongListenerCountry songId={songId} />
        <Gap height={20} />
        <ListenerLikes
          title={t('Home.Tab.Analytic.Album.DetailSong.ListenerAlsoLike.Title')}
        />
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
