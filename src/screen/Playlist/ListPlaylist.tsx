import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {useQuery} from 'react-query';
import {EmptyState, ListCard, TopNavigation} from '../../components';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {useSearchHook} from '../../hooks/use-search.hook';
import {RootStackParams} from '../../navigations';
import {color} from '../../theme';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';

type PlaylistProps = NativeStackScreenProps<RootStackParams, 'ListPlaylist'>;

const ListPlaylist: React.FC<PlaylistProps> = ({navigation}: PlaylistProps) => {
  const {t} = useTranslation();

  // TODO : change api to get playlist by mood
  const {getSearchPlaylists} = useSearchHook();

  const {
    data: dataSearchPlaylists,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery(['/search-playlist'], () => getSearchPlaylists({keyword: ''}));

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardOnPress = (id: number) => {
    navigation.navigate('Playlist', {id, name: '', from: 'other'});
  };
  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Home.Topbar.Search.Playlist')}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={color.Neutral[10]}
      />
      <View style={styles.container}>
        {(isRefetching || isLoading) && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ListContainer}
          data={dataSearchPlaylists?.data}
          renderItem={({item, index}) => (
            <ListCard.MusicList
              imgUri={item.thumbnailUrl}
              musicNum={(index + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              musicTitle={item.name}
              singerName={item.name}
              onPressMore={resultDataMore}
              containerStyles={{marginTop: mvs(20)}}
              onPressCard={() => cardOnPress(item.id)}
              hideDropdownMore
            />
          )}
          ListEmptyComponent={
            !isLoading && !isRefetching ? (
              <EmptyState
                text={t('EmptyState.Search.Playlist') || ''}
                containerStyle={styles.containerEmpty}
              />
            ) : null
          }
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        />
      </View>
    </View>
  );
};

export default ListPlaylist;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  container: {
    paddingHorizontal: widthResponsive(24),
  },
  ListContainer: {
    paddingBottom: heightPercentage(200),
  },
  loading: {
    color: color.Neutral[10],
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: heightPercentage(20),
  },
  containerEmpty: {
    flex: 0,
    height: heightResponsive(500),
  },
});
