import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {EmptyState, ListCard} from '../../components';
import {KeywordProps} from '../../interface/search.interface';
import {mvs} from 'react-native-size-matters';
import {heightPercentage, heightResponsive} from '../../utils';
import Color from '../../theme/Color';
import {useSearchHook} from '../../hooks/use-search.hook';
import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';

const ListResultPlaylists: FC<KeywordProps> = ({keyword}: KeywordProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {t} = useTranslation();
  const {getSearchPlaylists} = useSearchHook();

  const {
    data: dataSearchPlaylists,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery(['/search-playlist'], () =>
    getSearchPlaylists({keyword: keyword}),
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

  const cardOnPress = (id: number) => {
    navigation.navigate('Playlist', {id, name: '', from: 'other'});
  };

  return (
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
  );
};

export default ListResultPlaylists;

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentage(8),
    width: '100%',
    height: '100%',
  },
  ListContainer: {
    paddingBottom: heightPercentage(400),
  },
  loading: {
    color: Color.Neutral[10],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: heightPercentage(20),
  },
  containerEmpty: {
    flex: 0,
    height: heightResponsive(500),
  },
});
