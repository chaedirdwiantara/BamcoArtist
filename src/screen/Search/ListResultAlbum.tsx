import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {EmptyState, ListCard} from '../../components';
import {KeywordProps} from '../../interface/search.interface';
import {mvs} from 'react-native-size-matters';
import {useSearchHook} from '../../hooks/use-search.hook';
import {heightPercentage, heightResponsive} from '../../utils';
import Color from '../../theme/Color';
import {useQuery} from 'react-query';

const ListResultAlbum: FC<KeywordProps> = ({keyword}: KeywordProps) => {
  const {getSearchAlbums} = useSearchHook();
  const {
    data: dataSearchAlbums,
    refetch,
    isRefetching,
    isFetched,
    isLoading,
  } = useQuery(['/search-albums'], () => getSearchAlbums({keyword: keyword}));

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

  return (
    <View style={styles.container}>
      {isFetched && !isRefetching && (
        <FlatList
          contentContainerStyle={styles.ListContainer}
          showsVerticalScrollIndicator={false}
          data={dataSearchAlbums?.data}
          renderItem={({item, index}) => (
            <ListCard.MusicList
              imgUri={item.imageUrl[0]?.image ?? null}
              musicNum={(index + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              musicTitle={item.title}
              singerName={item.title}
              onPressMore={resultDataMore}
              containerStyles={{marginTop: mvs(20)}}
              onPressCard={() => {}}
              hideDropdownMore
            />
          )}
          ListEmptyComponent={
            <EmptyState
              text="Album not found"
              containerStyle={styles.containerEmpty}
            />
          }
        />
      )}

      {(isRefetching || isLoading) && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default ListResultAlbum;

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
    flex: 1,
    alignItems: 'center',
    paddingTop: heightPercentage(50),
  },
  containerEmpty: {
    flex: 0,
    height: heightResponsive(500),
  },
});
