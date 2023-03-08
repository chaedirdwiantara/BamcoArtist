import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {EmptyState, ListCard} from '../../components';
import {KeywordProps} from '../../interface/search.interface';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {useQuery} from 'react-query';
import {useSearchHook} from '../../hooks/use-search.hook';
import Color from '../../theme/Color';
import {heightPercentage, heightResponsive} from '../../utils';
import {useTranslation} from 'react-i18next';

const ListResultSong: FC<KeywordProps> = ({keyword}: KeywordProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleOnPress = (id: number) => {
    navigation.navigate('SongDetails', {
      id,
    });
  };

  const {getSearchSongs} = useSearchHook();

  const {
    data: dataSearchSongs,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery(['/search-song'], () => getSearchSongs({keyword: keyword}));

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <View style={styles.container}>
      {(isRefetching || isLoading) && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      )}
      <FlatList
        contentContainerStyle={styles.ListContainer}
        showsVerticalScrollIndicator={false}
        data={dataSearchSongs?.data ?? []}
        renderItem={({item, index}) => (
          <ListCard.MusicList
            imgUri={item.imageUrl[0]?.image ?? null}
            musicNum={(index + 1).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            musicTitle={item.title}
            singerName={item.musicianName}
            containerStyles={{marginTop: mvs(20)}}
            onPressCard={() => handleOnPress(item.id)}
            hideDropdownMore
          />
        )}
        ListEmptyComponent={
          !isLoading && !isRefetching ? (
            <EmptyState
              text={t('EmptyState.Search.Song') || ''}
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

export default ListResultSong;

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
    paddingVertical: heightPercentage(50),
  },
  containerEmpty: {
    flex: 0,
    height: heightResponsive(500),
  },
});
