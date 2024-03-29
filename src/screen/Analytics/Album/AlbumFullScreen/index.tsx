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
import {widthResponsive} from '../../../../utils';
import Album from './Album';
import WhoListen from './WhoListen';
import AlbumListenerCountry from './AlbumListenerCountry';

type SongDetailProps = NativeStackScreenProps<
  RootStackParams,
  'AlbumAnalyticScreen'
>;

const AlbumAnalyticScreen = ({route}: SongDetailProps) => {
  const albumId = route.params.albumId;
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <TopNavigation.Type1
        title={`${t('Home.Tab.Analytic.Album.Title')}`}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={color.Neutral[10]}
        containerStyles={{
          borderBottomWidth: 1,
          borderBottomColor: color.Dark[400],
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Album albumId={albumId} />
        <Gap height={20} />
        <WhoListen albumId={albumId} />
        <Gap height={20} />
        <AlbumListenerCountry albumId={albumId} />
        <Gap height={20} />
        <ListenerLikes
          title={t('Home.Tab.Analytic.Album.MySong.ListenerAlsoLike.Title')}
        />
      </ScrollView>
    </View>
  );
};

export default AlbumAnalyticScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.Dark[800],
  },
  scrollContainer: {
    padding: widthResponsive(20),
    paddingBottom: widthResponsive(125),
  },
});
