import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';
import {mvs} from 'react-native-size-matters';
import {KeywordProps} from '../../interface/search.interface';
import {useQuery} from 'react-query';
import {useSearchHook} from '../../hooks/use-search.hook';
import {heightPercentage, heightResponsive} from '../../utils';
import Color from '../../theme/Color';
import {EmptyState} from '../../components';

const ListResultFans: FC<KeywordProps> = ({keyword}: KeywordProps) => {
  const {getSearchFans} = useSearchHook();

  const {
    data: dataSearchFans,
    refetch,
    isRefetching,
    isFetched,
    isLoading,
  } = useQuery(['/search-fans'], () => getSearchFans({keyword: keyword}));

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <View style={styles.container}>
      {isFetched && !isRefetching && (
        <FlatList
          contentContainerStyle={styles.ListContainer}
          showsVerticalScrollIndicator={false}
          data={dataSearchFans?.data}
          renderItem={({item, index}) => (
            <MusicianSection
              musicianNum={(index + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              musicianName={item.fullname}
              imgUri={item.imageProfileUrl}
              containerStyles={{marginTop: mvs(20)}}
              musicianId={item.uuid}
              activeMore={false}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              text="Fans not found"
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

export default ListResultFans;

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
