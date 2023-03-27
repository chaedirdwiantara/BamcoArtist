import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {useInfiniteQuery} from 'react-query';
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
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['/list-playlist'],
    ({pageParam = 1}) => getSearchPlaylists({keyword: '', page: pageParam}),
    {
      getNextPageParam: lastPage => {
        if (lastPage?.meta) {
          const nextPage = lastPage?.meta?.page + 1;
          return nextPage;
        }
        return null;
      },
    },
  );

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
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
        {(isRefetching || isLoading) && !isFetchingNextPage && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingBottom: isFetchingNextPage
              ? heightPercentage(0)
              : heightPercentage(200),
          }}
          data={
            dataSearchPlaylists?.pages?.map((page: any) => page.data).flat() ??
            []
          }
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
            <RefreshControl
              refreshing={isRefetching && !isFetchingNextPage}
              onRefresh={refetch}
            />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 1}
        />
        {isFetchingNextPage && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}
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
