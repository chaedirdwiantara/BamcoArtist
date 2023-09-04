import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentage,
  heightResponsive,
  widthResponsive,
} from '../../../utils';
import {FlashList} from '@shopify/flash-list';
import {EmptyState, Gap} from '../../../components';
import {CrackEggIcon} from '../../../assets/icon';
import {useTranslation} from 'react-i18next';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import EventCard from '../ListCard/EventCard';
import LoadingSpinner from '../../atom/Loading/LoadingSpinner';
import {profileStorage} from '../../../hooks/use-storage.hook';
import {EventListData} from '../../../interface/event.interface';
import {useEventHook} from '../../../hooks/use-event.hook';

type EventMusicianProps = {
  musicianId?: string;
};

const EventMusician: FC<EventMusicianProps> = props => {
  const {t} = useTranslation();
  const {useEventMusician} = useEventHook();

  const MyUuid = profileStorage()?.uuid;
  const isOwner = props?.musicianId === MyUuid;

  const {
    data: dataEvent,
    isLoading: isLoadingEvent,
    refetch: refetchEvent,
    isRefetching: isRefetchingEvent,
  } = useEventMusician(props?.musicianId ?? '');

  useEffect(() => {
    refetchEvent();
  }, []);

  return (
    <>
      <FlashList
        data={dataEvent?.data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ListContainer}
        keyExtractor={item => item?.month ?? ''}
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
            text={t('Event.EmptyState.Title') || ''}
            subtitle={
              (isOwner
                ? t('Event.EmptyState.Profile')
                : t('Event.EmptyState.Other')) || ''
            }
            containerStyle={styles.containerEmpty}
          />
        }
        renderItem={({item, _index}: any) => (
          <View>
            <Text style={[Typography.Heading6, {color: Color.Neutral[10]}]}>
              {item?.month}
            </Text>
            <Gap height={heightResponsive(12)} />
            <View>
              {item?.events.map((v: EventListData, i: number) => {
                return (
                  <React.Fragment key={i}>
                    <EventCard {...v} isLive={item?.month === 'Live'} />
                    <Gap height={heightResponsive(12)} />
                  </React.Fragment>
                );
              })}
            </View>
          </View>
        )}
        estimatedItemSize={150}
      />

      {(isLoadingEvent || isRefetchingEvent) && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      )}
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
