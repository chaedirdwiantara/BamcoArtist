import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TicketIcon} from '../../assets/icon';
import Color from '../../theme/Color';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {EmptyState} from '../../components';
import {FlashList} from '@shopify/flash-list';
import MerchListCard from '../../components/molecule/ListCard/MerchListCard';
import {useEventHook} from '../../hooks/use-event.hook';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {MerchData} from '../../interface/event.interface';
import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';

const ConcertList: FC = () => {
  const {t} = useTranslation();
  const {getListDataConcert} = useEventHook();

  const {data: dataConcertList, isLoading} = useQuery(['/concert'], () =>
    getListDataConcert(),
  );

  const filterList: MerchData | undefined = dataConcertList?.data.find(
    concert => {
      return concert.name === 'event_latest';
    },
  );

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      ) : (
        <FlashList
          data={filterList?.data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ListContainer}
          // keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <EmptyState
              icon={
                <TicketIcon
                  fill={Color.Dark[500]}
                  width={widthResponsive(150)}
                  height={heightResponsive(150)}
                  style={styles.iconEmpty}
                />
              }
              text={t('Event.Concert.NoConcert') || ''}
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
              type={'concert'}
            />
          )}
          estimatedItemSize={150}
          numColumns={2}
        />
      )}
    </>
  );
};

export default ConcertList;

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
    flex: 1,
    alignItems: 'center',
    paddingTop: heightPercentage(50),
  },
});
