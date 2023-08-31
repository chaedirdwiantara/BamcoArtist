import React, {FC, useEffect, useState} from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {FlashList} from '@shopify/flash-list';
import MerchListCard from '../../components/molecule/ListCard/MerchListCard';
import {useEventHook} from '../../hooks/use-event.hook';
import {EmptyState} from '../../components';
import {CrackEggIcon} from '../../assets/icon';
import Color from '../../theme/Color';
import {useInfiniteQuery} from 'react-query';
import {MerchData} from '../../interface/event.interface';
import {useTranslation} from 'react-i18next';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
type MerchListType = {
  type?: string;
  musicianId?: string;
};

const MerchList: FC<MerchListType> = props => {
  const {t} = useTranslation();
  const {type = 'action', musicianId = ''} = props;
  const {searchListDataMerch} = useEventHook();

  const [dataMerch, setDataMerch] = useState<MerchData[] | undefined>([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  const {
    data: dataMerchList,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [`/merch/${type}/${musicianId}`],
    ({pageParam = 1}) =>
      searchListDataMerch({
        pageNo: pageParam,
        pageSize: 10,
        referer: 'beamco',
        referId: musicianId,
      }),
    {
      getNextPageParam: lastPage => {
        if ((lastPage?.data?.length as number) < totalPage) {
          const nextPage = (lastPage?.data?.length as number) + 1;
          return nextPage;
        }
        return null;
      },
    },
  );

  useEffect(() => {
    if (dataMerchList?.pages?.[0] !== undefined) {
      setDataMerch(
        dataMerchList?.pages?.map((page: any) => page?.data).flat() ?? [],
      );
      const total = Math.ceil(dataMerchList?.pages?.[0]?.total ?? 1);
      setTotalPage(total);
    } else {
      setDataMerch([]);
      setTotalPage(1);
    }
  }, [dataMerchList]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <FlashList
        data={dataMerch}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ListContainer}
        keyExtractor={item => item?.id.toString()}
        onTouchEnd={loadMore}
        ListEmptyComponent={
          !isLoading && !isRefetching ? (
            <EmptyState
              icon={
                <CrackEggIcon
                  fill={Color.Dark[500]}
                  width={widthResponsive(150)}
                  height={heightResponsive(150)}
                  style={styles.iconEmpty}
                />
              }
              text={t('Event.Merch.ComingSoon.Title') || ''}
              subtitle={t('Event.Merch.ComingSoon.Subtitle') || ''}
              containerStyle={styles.containerEmpty}
            />
          ) : null
        }
        renderItem={({item, index}: any) => (
          <MerchListCard
            id={item.id}
            containerStyles={
              index % 2 === 0 ? {marginRight: 10} : {marginLeft: 10}
            }
            image={item.pic}
            title={item.title}
            owner={item.organizer?.name}
            ownerImage={item.organizer?.pic}
            price={item.price / 100}
            priceBeforeDisc={item.originalPrice / 100}
            desc={item.content}
            currency={item.currencyCode}
            type={'merch'}
            charge={item.charge}
            currencyCode={item.currencyCode}
          />
        )}
        estimatedItemSize={150}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetch} />
        }
      />
      {(isLoading || isRefetching || isFetchingNextPage) && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      )}
    </>
  );
};

export default MerchList;

const styles = StyleSheet.create({
  ListContainer: {
    paddingTop: heightPercentage(15),
    paddingBottom: heightPercentage(200),
  },
  containerEmpty: {
    flex: 0,
    height: heightResponsive(300),
  },
  iconEmpty: {
    marginBottom: 12,
  },
  loading: {
    color: Color.Neutral[10],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingTop: heightPercentage(20),
  },
});
