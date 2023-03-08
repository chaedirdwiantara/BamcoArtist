import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';
import {mvs} from 'react-native-size-matters';
import {KeywordProps} from '../../interface/search.interface';
import {useQuery} from 'react-query';
import {useSearchHook} from '../../hooks/use-search.hook';
import {heightPercentage, heightResponsive} from '../../utils';
import Color from '../../theme/Color';
import {EmptyState} from '../../components';
import {useTranslation} from 'react-i18next';

const ListResultFans: FC<KeywordProps> = ({keyword}: KeywordProps) => {
  const {t} = useTranslation();
  const {getSearchFans} = useSearchHook();

  const {
    data: dataSearchFans,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery(['/search-fans'], () => getSearchFans({keyword: keyword}));

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
        data={dataSearchFans?.data}
        renderItem={({item, index}) => (
          <MusicianSection
            musicianNum={(index + 1).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            musicianName={item.fullname}
            imgUri={
              item.imageProfileUrls.length > 0
                ? item.imageProfileUrls[0].image
                : ''
            }
            containerStyles={{marginTop: mvs(20)}}
            userId={item.uuid}
            activeMore={false}
            type="fans"
          />
        )}
        ListEmptyComponent={
          !isLoading && !isRefetching ? (
            <EmptyState
              text={t('EmptyState.Search.Fans') || ''}
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
    alignItems: 'center',
    paddingVertical: heightPercentage(50),
  },
  containerEmpty: {
    flex: 0,
    height: heightResponsive(500),
  },
});
