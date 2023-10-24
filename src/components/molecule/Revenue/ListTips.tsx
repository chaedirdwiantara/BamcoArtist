import {View, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useInfiniteQuery, useMutation} from 'react-query';
import {appreciateFans, getListRevenue} from '../../../api/credit.api';
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
import {EmptyState} from '../EmptyState/EmptyState';
import {Gap, SsuToast} from '../../atom';
import {TickCircleIcon} from '../../../assets/icon';
import Typography from '../../../theme/Typography';

interface ListTipsProps {
  touchEnd: boolean;
  isRefreshing: boolean;
}

const ListTips: React.FC<ListTipsProps> = ({touchEnd, isRefreshing}) => {
  const {t} = useTranslation();
  const [listTips, setListTips] = useState<TipsDataType[]>([]);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [textError, setTextError] = useState<string>('');

  const {
    data: dataTips,
    refetch,
    isRefetching,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [`/list-tips`],
    queryFn: ({pageParam = 1}) =>
      getListRevenue({
        page: pageParam,
        perPage: 10,
        filterValue: 2,
      }),
    getNextPageParam: lastPage => {
      if (lastPage?.meta?.TotalPage >= lastPage?.meta?.Page) {
        const nextPage = lastPage?.meta?.Page + 1;
        return nextPage;
      }
      return null;
    },
  });

  useEffect(() => {
    if (touchEnd) loadMore();
  }, [touchEnd]);

  useEffect(() => {
    if (isRefreshing) refetch();
  }, [isRefreshing]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
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

  const setAppreaciate = useMutation({
    mutationKey: ['appreaciate-beam'],
    mutationFn: appreciateFans,
    onSuccess(res, id: string) {
      if (res?.code === 200) {
        handleUpdateList(id, 1);
      } else {
        handleUpdateList(id, 0);
        setTextError(res?.message);
        setToastVisible(true);
      }
    },
    onError(e: any, id: string) {
      handleUpdateList(id, 0);
      setTextError(e?.response?.data?.message);
      setTimeout(() => {
        setToastVisible(true);
      }, 500);
    },
  });

  const handleAppreaciate = (id: string) => {
    handleUpdateList(id, 1);

    setAppreaciate.mutate(id);
  };

  const handleUpdateList = (id: string, appreciate: number) => {
    const newArray: TipsDataType[] = listTips.map(v => {
      if (v.id === id) {
        return {
          ...v,
          appreciate: appreciate,
        };
      }

      return v;
    });

    setListTips(newArray);
  };

  return (
    <>
      <View
        style={{
          marginBottom: heightResponsive(25),
          paddingHorizontal: widthPercentage(6),
        }}>
        {(isRefetching || isLoading) && !isFetchingNextPage && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}

        {isLoading ? null : listTips?.length > 0 ? (
          listTips?.map((val: TipsDataType, index: number) => (
            <RevenueCard
              key={index}
              id={val.id}
              username={val.fromUserName}
              name={val.fromFullName}
              avatarUri={val.fromUserImage}
              credit={val.credit}
              time={val.timeAgo}
              type="beam"
              isAppreciate={val.appreciate}
              onClickAppreciate={handleAppreaciate}
            />
          ))
        ) : (
          <EmptyState
            text={t('EmptyState.Revenue.Tips') || ''}
            hideIcon={true}
            containerStyle={styles.containerEmpty}
            textStyle={styles.emptyText}
          />
        )}

        {isFetchingNextPage && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}
      </View>

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.toastContainer]}>
            <TickCircleIcon
              width={widthPercentage(21)}
              height={heightPercentage(20)}
              stroke={Color.Neutral[10]}
            />
            <Gap width={widthPercentage(7)} />
            <Text style={[Typography.Button2, {color: Color.Neutral[10]}]}>
              {textError}
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthPercentage(24)}}
      />
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
  containerEmpty: {
    alignSelf: 'center',
    marginTop: mvs(80),
  },
  emptyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    textAlign: 'center',
    color: Color.Neutral[10],
    lineHeight: mvs(16),
  },
  toastContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: Color.Error[500],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
