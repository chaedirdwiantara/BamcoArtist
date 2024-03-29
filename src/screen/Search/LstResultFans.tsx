import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';
import {mvs} from 'react-native-size-matters';
import {useQuery} from 'react-query';
import {useSearchHook} from '../../hooks/use-search.hook';
import {widthResponsive} from '../../utils';
import Color from '../../theme/Color';
import {EmptyState} from '../../components';
import {useTranslation} from 'react-i18next';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {font} from '../../theme';

interface Props {
  keyword: string;
  listType?: 'suggest';
}

const ListResultFans: FC<Props> = (props: Props) => {
  const {keyword, listType} = props;
  const {t} = useTranslation();
  const {getSearchFans} = useSearchHook();

  const {
    data: dataSearchFans,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery(['/search-fans'], () =>
    getSearchFans({
      keyword: keyword,
      perPage: listType === 'suggest' ? 3 : undefined,
    }),
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <View style={styles(listType).container}>
      {(isRefetching || isLoading) && (
        <View style={styles().loadingContainer}>
          <LoadingSpinner />
        </View>
      )}

      {listType === 'suggest' &&
      dataSearchFans?.data &&
      dataSearchFans?.data.length > 0 ? (
        <Text style={styles().titleTab}>Fans</Text>
      ) : null}

      <FlatList
        contentContainerStyle={styles(listType).ListContainer}
        showsVerticalScrollIndicator={false}
        data={dataSearchFans?.data}
        scrollEnabled={listType === 'suggest' ? false : true}
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
            isHideNum
          />
        )}
        ListEmptyComponent={
          !isLoading && !isRefetching && listType !== 'suggest' ? (
            <EmptyState
              text={t('EmptyState.Search.Fans') || ''}
              containerStyle={styles().containerEmpty}
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

const styles = (listType?: 'suggest') =>
  StyleSheet.create({
    container: {
      marginTop: widthResponsive(16),
      width: '100%',
      marginBottom: widthResponsive(16),
    },
    ListContainer: {
      paddingBottom: listType !== 'suggest' ? widthResponsive(400) : undefined,
    },
    loading: {
      color: Color.Neutral[10],
    },
    loadingContainer: {
      alignItems: 'center',
      paddingVertical: widthResponsive(20),
    },
    containerEmpty: {
      flex: 0,
      height: widthResponsive(500),
    },
    titleTab: {
      fontSize: mvs(14),
      color: Color.Neutral[10],
      fontFamily: font.InterRegular,
      fontWeight: '500',
    },
  });
