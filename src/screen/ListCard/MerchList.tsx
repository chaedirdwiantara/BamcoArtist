import React, {FC, useState} from 'react';
import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {FlashList} from '@shopify/flash-list';
import MerchListCard from '../../components/molecule/ListCard/MerchListCard';
import {useEventHook} from '../../hooks/use-event.hook';
import {EmptyState} from '../../components';
import {BoxStore} from '../../assets/icon';
import Color from '../../theme/Color';
import {useQuery} from 'react-query';
import {MerchData} from '../../interface/event.interface';
import {useTranslation} from 'react-i18next';

const MerchList: FC = () => {
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {getListDataMerch} = useEventHook();

  const {
    data: dataMerchList,
    isLoading,
    refetch,
  } = useQuery(['/merch'], () => getListDataMerch());

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const filterList: MerchData | undefined = dataMerchList?.data.find(merch => {
    return merch.name === 'product_latest';
  });

  return (
    <>
      {(isLoading || refreshing) && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      )}
      <FlashList
        data={filterList?.data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ListContainer}
        keyExtractor={item => item?.id.toString()}
        ListEmptyComponent={
          !isLoading && !refreshing ? (
            <EmptyState
              icon={
                <BoxStore
                  stroke={Color.Dark[500]}
                  width={widthResponsive(150)}
                  height={heightResponsive(150)}
                  style={styles.iconEmpty}
                />
              }
              text={t('Event.Merch.NoMerch') || ''}
              containerStyle={styles.containerEmpty}
            />
          ) : null
        }
        renderItem={({item, index}: any) => (
          <MerchListCard
            id={item.id}
            containerStyles={
              index % 2 == 0 ? {marginRight: 10} : {marginLeft: 10}
            }
            image={item.pic}
            title={item.name}
            owner={item.organizer?.name}
            ownerImage={item.organizer?.pic}
            price={item.price}
            desc={item.content}
            currency={item.currencyCode}
            type={'merch'}
          />
        )}
        estimatedItemSize={150}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
};

export default MerchList;

const styles = StyleSheet.create({
  ListContainer: {
    paddingVertical: heightPercentage(25),
    paddingBottom: heightPercentage(200),
  },
  containerEmpty: {
    flex: 0,
    height: heightResponsive(500),
  },
  iconEmpty: {
    marginBottom: 12,
  },
  loading: {
    color: Color.Neutral[10],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingTop: heightPercentage(50),
  },
});
