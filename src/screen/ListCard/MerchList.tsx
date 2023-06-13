import React, {FC, useState} from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {FlashList} from '@shopify/flash-list';
import MerchListCard from '../../components/molecule/ListCard/MerchListCard';
import {useEventHook} from '../../hooks/use-event.hook';
import {DropDownFilter, EmptyState} from '../../components';
import {BoxStore, FriedEggIcon} from '../../assets/icon';
import Color from '../../theme/Color';
import {useQuery} from 'react-query';
import {MerchData} from '../../interface/event.interface';
import {useTranslation} from 'react-i18next';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {
  DataDropDownType,
  dataUpdatePost,
  dropDownActionCategory,
  dropDownActionSort,
} from '../../data/dropdown';
import DropdownMore from '../../components/molecule/V2/DropdownFilter/DropdownMore';

type MerchListType = {
  type?: string;
};

const MerchList: FC<MerchListType> = props => {
  const {t} = useTranslation();
  const {type = 'action'} = props;
  const {getListDataMerch} = useEventHook();

  const [selectedCategories, setSelectedCategories] =
    useState<DataDropDownType>();
  const [selectedSort, setSelectedSort] = useState<DataDropDownType>();

  const {
    data: dataMerchList,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery([`/merch/${type}`], () => getListDataMerch());

  const filterList: MerchData | undefined = dataMerchList?.data.find(merch => {
    return merch.name === 'product_latest';
  });

  return (
    <>
      {(isLoading || isRefetching) && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      )}

      <EmptyState
        icon={
          <FriedEggIcon
            fill={Color.Dark[500]}
            width={widthResponsive(150)}
            height={heightResponsive(150)}
            style={styles.iconEmpty}
          />
        }
        text={t('Event.ComingSoon') || ''}
        containerStyle={styles.containerEmpty}
      />

      {/* {!isLoading && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <DropDownFilter
            labelCaption={
              selectedCategories
                ? t(selectedCategories.label)
                : t('Event.Dropdown.Category.All')
            }
            dataFilter={dropDownActionCategory}
            selectedMenu={setSelectedCategories}
            leftPosition={widthResponsive(-90)}
          />

          <DropDownFilter
            labelCaption={
              selectedSort
                ? t(selectedSort.label)
                : t('Event.Dropdown.Sort.Placeholder')
            }
            dataFilter={dropDownActionSort}
            selectedMenu={setSelectedSort}
            leftPosition={widthResponsive(-100)}
          />
        </View>
      )} */}

      {/* <FlashList
        data={filterList?.data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ListContainer}
        keyExtractor={item => item?.id.toString()}
        ListEmptyComponent={
          !isLoading && !isRefetching ? (
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
            charge={item.charge}
          />
        )}
        estimatedItemSize={150}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetch} />
        }
      /> */}
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
    paddingTop: heightPercentage(20),
  },
});
