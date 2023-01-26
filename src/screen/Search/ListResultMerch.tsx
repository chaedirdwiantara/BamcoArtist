import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {FlashList} from '@shopify/flash-list';
import MerchListCard from '../../components/molecule/ListCard/MerchListCard';
import {EmptyState} from '../../components';
import {BoxStore} from '../../assets/icon';
import Color from '../../theme/Color';
import {useQuery} from 'react-query';
import {useSearchHook} from '../../hooks/use-search.hook';

interface Props {
  keyword: string;
}

const ListResultMerch: FC<Props> = ({keyword}: Props) => {
  const {getSearchMerchs} = useSearchHook();

  const {
    data: dataMerchList,
    refetch,
    isRefetching,
    isFetched,
    isLoading,
  } = useQuery(['/search-merch'], () => getSearchMerchs({keyword: keyword}));

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <View style={styles.container}>
      {isFetched && !isRefetching && (
        <FlashList
          data={dataMerchList?.data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ListContainer}
          keyExtractor={item => item?.id.toString()}
          ListEmptyComponent={
            <EmptyState
              icon={
                <BoxStore
                  stroke={Color.Dark[500]}
                  width={widthResponsive(150)}
                  height={heightResponsive(150)}
                  style={styles.iconEmpty}
                />
              }
              text="No Merch Available"
              containerStyle={styles.containerEmpty}
            />
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
          estimatedItemSize={200}
          numColumns={2}
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

export default ListResultMerch;

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentage(8),
    width: '100%',
    height: '100%',
  },
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
    flex: 1,
    alignItems: 'center',
    paddingTop: heightPercentage(50),
  },
});
