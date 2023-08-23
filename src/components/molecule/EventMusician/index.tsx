import React, {FC, useEffect, useState} from 'react';
import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentage,
  heightResponsive,
  widthResponsive,
} from '../../../utils';
import {FlashList} from '@shopify/flash-list';
import MerchListCard from '../../components/molecule/ListCard/MerchListCard';
import {useEventHook} from '../../hooks/use-event.hook';
import {EmptyState, Gap} from '../../../components';
import {CrackEggIcon} from '../../../assets/icon';
import {useInfiniteQuery} from 'react-query';
import {MerchData} from '../../interface/event.interface';
import {useTranslation} from 'react-i18next';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {dataEventMusician} from '../../../data/event';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import EventCard from '../ListCard/EventCard';
type EventMusicianProps = {
  musicianId?: string;
};

const EventMusician: FC<EventMusicianProps> = props => {
  const {t} = useTranslation();

  return (
    <>
      <FlashList
        data={dataEventMusician}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ListContainer}
        keyExtractor={item => item?.id.toString()}
        onTouchEnd={() => null}
        ListEmptyComponent={
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
        }
        renderItem={({item, index}: any) => (
          <View>
            <Text style={[Typography.Heading6, {color: Color.Neutral[10]}]}>
              {item?.date}
            </Text>
            <Gap height={heightResponsive(12)} />
            <View>
              {item?.item.map((v, i) => {
                return (
                  <React.Fragment key={i}>
                    <EventCard {...v} />
                    <Gap height={heightResponsive(12)} />
                  </React.Fragment>
                );
              })}
            </View>
          </View>
        )}
        estimatedItemSize={150}
      />
    </>
  );
};

export default EventMusician;

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
