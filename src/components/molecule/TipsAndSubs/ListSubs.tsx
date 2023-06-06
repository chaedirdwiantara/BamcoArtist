import {View, Text, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import {getListSubs, unsubsEC} from '../../../api/credit.api';
import {
  heightPercentage,
  heightResponsive,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import LoadingSpinner from '../../atom/Loading/LoadingSpinner';
import {EmptyState} from '../EmptyState/EmptyState';
import {useTranslation} from 'react-i18next';
import {DonateCardContent} from '../SettingContent/DonateCard';
import Color from '../../../theme/Color';
import {mvs} from 'react-native-size-matters';
import {font} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {DataDropDownType} from '../../../data/dropdown';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {Gap, SsuToast} from '../../atom';
import {CheckCircle2Icon} from '../../../assets/icon';
import {
  ListSubsDataType,
  SubsDataType,
  UnsubsResponseType,
} from '../../../interface/credit.interface';

interface ListSubsProps {
  status: 'current' | 'past';
  duration: '' | 'weekly' | 'monthly' | 'yearly' | string;
}

const ListSubs: React.FC<ListSubsProps> = props => {
  const {t} = useTranslation();
  const {status, duration} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [listSubs, setListSubs] = useState<SubsDataType[]>([]);
  const [showUnsubModal, setShowUnsubModal] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<SubsDataType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [isErrorUnsub, setIsErrorUnsub] = useState<boolean>(false);
  const {
    data: dataSubs,
    refetch,
    isRefetching,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['/list-subs'],
    ({pageParam = 1}) =>
      getListSubs({
        page: pageParam,
        perPage: 10,
        status: status,
        durationUnit: duration,
      }),
    {
      getNextPageParam: lastPage => {
        if (lastPage?.data?.length > 0) {
          const nextPage = lastPage?.meta?.page + 1;
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
    if (dataSubs !== undefined) {
      setListSubs(
        dataSubs?.pages?.map((page: ListSubsDataType) => page.data).flat() ??
          [],
      );
    }
  }, [dataSubs]);

  useEffect(() => {
    refetch();
  }, [status, duration]);

  const resultDataMore = (dataResult: DataDropDownType, val: SubsDataType) => {
    if (dataResult.value === '1') {
      navigation.navigate('MusicianProfile', {id: val.musician.uuid});
    } else {
      setCurrentData(val);
      setShowUnsubModal(true);
    }
  };

  const closeModal = () => {
    setShowUnsubModal(false);
  };

  const onPressConfirm = async () => {
    setIsErrorUnsub(false);
    setShowUnsubModal(false);
    setLoading(true);
    try {
      const response: UnsubsResponseType = await unsubsEC(currentData?.ID);
      if (response.code === 200) {
        refetch();
      } else setIsErrorUnsub(true);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setToastVisible(true);
        setLoading(false);
      }, 1000);
    }
  };

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

        {isLoading ? null : listSubs?.length > 0 ? (
          listSubs?.map((val: SubsDataType, index: number) => (
            <DonateCardContent
              key={index}
              avatarUri={val.musician.imageProfileUrls[0].image}
              name={val.musician.fullname}
              username={`@${val.musician.username}`}
              detail={[
                val.status,
                val.nextPaymentDate,
                val.price,
                val.duration,
              ]}
              onPressMore={data => resultDataMore(data, val)}
              type="subs"
              next={val.status === 'ongoing' ? true : false}
            />
          ))
        ) : (
          <EmptyState
            text={t('EmptyState.Subscribe') || ''}
            containerStyle={styles.emptyState}
          />
        )}

        {isFetchingNextPage && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}
      </ScrollView>
      <ModalConfirm
        modalVisible={showUnsubModal}
        title={t('Modal.Unsub.Title') || ''}
        subtitle={
          t('Modal.Unsub.Subtitle', {
            musician: currentData?.musician.fullname,
          }) || ''
        }
        onPressClose={closeModal}
        onPressOk={onPressConfirm}
        disabled={isLoading}
      />
      <ModalLoading visible={loading} />
      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View
            style={[
              styles.modalContainer,
              {
                backgroundColor: isErrorUnsub
                  ? Color.Error[500]
                  : Color.Success[400],
              },
            ]}>
            <CheckCircle2Icon />
            <Gap width={4} />
            <Text style={[styles.textStyle]} numberOfLines={2}>
              {isErrorUnsub
                ? `Unsubscribe failed. Try again`
                : `Your subscription have been updated!`}
            </Text>
          </View>
        }
        modalStyle={styles.toast}
      />
    </>
  );
};

export default ListSubs;

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
    paddingVertical: heightPercentage(8),
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: mvs(22),
    width: '100%',
    flexWrap: 'wrap',
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
  emptyState: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginTop: heightPercentage(100),
  },
});
