import {View, ScrollView, RefreshControl, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import {getListRevenue} from '../../../api/credit.api';
import {
  heightPercentage,
  heightResponsive,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import LoadingSpinner from '../../atom/Loading/LoadingSpinner';
import {useTranslation} from 'react-i18next';
import Color from '../../../theme/Color';
import {mvs} from 'react-native-size-matters';
import {font} from '../../../theme';
import {
  ListTipsDataType,
  TipsDataType,
} from '../../../interface/credit.interface';
import {RevenueCard} from '../SettingContent/RevenueCard';

const ListTips: React.FC = () => {
  const {t} = useTranslation();
  const [listTips, setListTips] = useState<TipsDataType[]>([]);
  const {
    data: dataTips,
    refetch,
    isRefetching,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [`/list-tips=`],
    ({pageParam = 1}) =>
      getListRevenue({
        page: pageParam,
        perPage: 10,
        filterValue: 2,
      }),
    {
      getNextPageParam: lastPage => {
        if (lastPage?.meta?.TotalPage >= lastPage?.meta?.Page) {
          const nextPage = lastPage?.meta?.Page + 1;
          return nextPage;
        }
        return null;
      },
    },
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (dataTips !== undefined) {
      setListTips(
        dataTips?.pages?.map((page: ListTipsDataType) => page.data).flat() ??
          [],
      );
    }
  }, [dataTips]);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: heightResponsive(25),
          paddingHorizontal: widthPercentage(6),
        }}
        onTouchEnd={loadMore}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={refetch}
            onLayout={e => console.log(e.nativeEvent)}
            tintColor="transparent"
            colors={['transparent']}
            style={{backgroundColor: 'transparent'}}
          />
        }>
        {(isRefetching || isLoading) && !isFetchingNextPage && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}

        {isLoading ? null : listTips?.length > 0 ? (
          listTips?.map((val: TipsDataType, index: number) => (
            <RevenueCard
              key={index}
              username={val.fromUserName}
              name={val.fromFullName}
              avatarUri={val.fromUserImage}
              credit={val.credit}
              time={val.timeAgo}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>{t('EmptyState.Revenue.Tips')}</Text>
        )}

        {isFetchingNextPage && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default ListTips;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  textVersion: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
    paddingTop: heightPercentage(15),
  },
  textSignOut: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
  },
  containerSignout: {
    flexDirection: 'row',
    paddingLeft: widthPercentage(15),
    position: 'absolute',
    bottom: heightPercentage(20),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  musicianName: {
    fontFamily: font.InterRegular,
    fontSize: mvs(14),
    fontWeight: '500',
    color: Color.Neutral[10],
  },
  followerCount: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: Color.Dark[50],
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: widthPercentage(20),
    flexDirection: 'row',
    marginBottom: heightPercentage(15),
  },
  modalContainer: {
    flexDirection: 'row',
    backgroundColor: Color.Success[400],
    paddingVertical: heightPercentage(8),
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: mvs(22),
    flexWrap: 'wrap',
    width: '100%',
  },
  textStyle: {
    color: Color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(13),
  },
  toast: {
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    textAlign: 'center',
    color: Color.Neutral[10],
    lineHeight: mvs(14),
    marginTop: heightResponsive(200),
  },
});
