import React, {FC, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {FlashList} from '@shopify/flash-list';
import MerchListCard from '../../components/molecule/ListCard/MerchListCard';
import {useEventHook} from '../../hooks/use-event.hook';
import {useFocusEffect} from '@react-navigation/native';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {EmptyState} from '../../components';
import {BoxStore} from '../../assets/icon';
import Color from '../../theme/Color';

const MerchList: FC = () => {
  const {dataMerchList, getListDataMerch, merchIsLoading} = useEventHook();

  useFocusEffect(
    useCallback(() => {
      getListDataMerch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const filterList = dataMerchList.find(merch => {
    return merch.name === 'product_latest';
  });

  return (
    <>
      <FlashList
        data={filterList?.data}
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
        estimatedItemSize={150}
        numColumns={2}
      />
      <ModalLoading visible={merchIsLoading} />
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
});
