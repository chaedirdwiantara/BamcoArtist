import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Gap} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {PlayPinkIcon} from '../../../../assets/icon';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import MusiciansListCard from '../../../../components/molecule/ListCard/MusiciansListCard';
import {MusicianListData} from '../../../../data/topMusician';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';

const AlbumListenerLike = () => {
  const {getAlbumListenerLike} = useAnalyticsHook();
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {
    data: AlbumListenerLikeData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('analytic-AlbumListenerLike', () => getAlbumListenerLike({}));

  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <PlayPinkIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Album.MySong.ListenerAlsoLike.Title')}
        </Text>
      </View>
      {/* BODY AREA */}
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={MusicianListData}
          renderItem={({item, index}) => (
            <View
              style={{
                marginTop:
                  index !== 0 ? widthResponsive(12) : widthResponsive(20),
              }}>
              <MusiciansListCard
                musicianNum={item.musicNum}
                onPressMore={() => {}}
                activeMore={false}
                onPressImage={() =>
                  navigation.navigate('OtherUserProfile', {id: item.uuid})
                }
                musicianName={item.fullname}
                imgUri={item.imageProfileUrl}
                containerStyles={{marginBottom: widthResponsive(12)}}
                imageSize={36}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default AlbumListenerLike;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(18),
    color: color.Neutral[10],
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: color.Dark[400],
    paddingHorizontal: widthResponsive(12),
    paddingVertical: widthResponsive(8),
    borderRadius: 4,
  },
  dropdown: {
    backgroundColor: color.Dark[800],
    borderWidth: 1,
    borderColor: color.Dark[400],
  },
});
