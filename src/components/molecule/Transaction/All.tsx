import {View, StyleSheet, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import Color from '../../../theme/Color';
import {useTranslation} from 'react-i18next';
import TransactionBox from '../../atom/Cart/TransactionBox';
import TransactionItem from '../../atom/Cart/TransactionItem';
import dayjs from 'dayjs';
import LoadingSpinner from '../../atom/Loading/LoadingSpinner';
import {FlashList} from '@shopify/flash-list';
import {EmptyStateSongMusician} from '../EmptyState/EmptyStateSongMusician';
import {useEventHook} from '../../../hooks/use-event.hook';

interface TransactionProps {
  token: string;
}

const AllTransaction: React.FC<TransactionProps> = (
  props: TransactionProps,
) => {
  const {token} = props;
  const {t} = useTranslation();
  const {useOrderListBookYay} = useEventHook();

  const [dataOrder, setDataOrder] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  const {
    data: dataOrderList,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useOrderListBookYay(token, totalPage);

  useEffect(() => {
    if (dataOrderList?.pages?.[0] !== undefined) {
      setDataOrder(
        dataOrderList?.pages?.flatMap((page: any) => page?.data ?? []) ?? [],
      );
      const total = Math.ceil(dataOrderList?.pages?.[0]?.total ?? 1);
      setTotalPage(total);
    } else {
      setDataOrder([]);
      setTotalPage(1);
    }
  }, [dataOrderList]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const getOrderStatus = (item: any) => {
    if (item.orderState === 'processing') {
      return 'Processing';
    } else if (item.orderState === 'expired') {
      return 'Expired';
    } else if (item.orderState === 'actived') {
      return 'Pending Payment';
    } else if (item.orderState === 'deleted') {
      return 'Deleted';
    } else if (item.orderState === 'revoked') {
      return 'Revoked';
    } else if (
      item.orderState === 'completed' &&
      item.shipmentRefState === 'confirmed'
    ) {
      return 'In Transit';
    } else if (
      item.orderState === 'completed' &&
      (!item.shipmentRefState || item.shipmentRefState === 'canceled')
    ) {
      return 'Paid';
    } else if (
      item.orderState === 'completed' &&
      item.shipmentRefState === 'completed'
    ) {
      return 'Completed';
    }
  };

  return (
    <View style={styles.root}>
      <FlashList
        data={dataOrder}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item?.id?.toString()}
        onTouchEnd={loadMore}
        ListEmptyComponent={
          !isLoading ? (
            <View style={{height: widthResponsive(500)}}>
              <EmptyStateSongMusician
                text={t('Transaction.EmptyState') || ''}
              />
            </View>
          ) : (
            <View style={styles.loadingContainer}>
              <LoadingSpinner />
            </View>
          )
        }
        renderItem={({item}: any) => (
          <TransactionBox
            orderNo={item?.oid}
            transaction={getOrderStatus(item)}
            date={dayjs(item?.createdAt).format('D MMM YYYY')}
            totalItem={item?.totalAmount}
            totalPrice={item?.finalAmount}
            handlingFee={item?.totalFee}
            currencyCode={item?.currencyCode}
            deliveryFee={item?.deliveryAmount}
            discount={item?.promotionAmount}
            onPressDetail={() => null}>
            {item?.orderItems?.map((child: any) => (
              <TransactionItem
                currencyCode={item?.currencyCode}
                name={child?.itemName}
                image={child?.itemPic}
                price={child?.itemPrice}
                qty={child?.itemQuantity}
                type={child?.itemType === 'productSku' ? 'merch' : 'ticket'}
                total={child?.itemPrice * child?.itemQuantity}
              />
            ))}
          </TransactionBox>
        )}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetch} />
        }
      />
      {(isLoading || isRefetching || isFetchingNextPage) && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      )}
    </View>
  );
};

export default AllTransaction;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tab: {
    flexDirection: 'row',
    paddingTop: heightPercentage(10),
    paddingHorizontal: widthPercentage(24),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  tabItem: {
    marginRight: widthPercentage(12),
    borderBottomColor: Color.Pink.linear,
    paddingBottom: heightPercentage(10),
  },
  tabTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: normalize(11.5),
  },
  loadingContainer: {
    alignItems: 'center',
    paddingTop: heightPercentage(20),
  },
});
