import React, {FC, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {heightResponsive, widthResponsive} from '../../utils';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {EmptyStateSongMusician} from '../../components/molecule/EmptyState/EmptyStateSongMusician';
import MusiciansListCard from '../../components/molecule/ListCard/MusiciansListCard';
import Color from '../../theme/Color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {EventHomeResponse} from '../../interface/event.interface';
import dayjs from 'dayjs';
import {useEventHook} from '../../hooks/use-event.hook';

interface EventListProps {
  type?: string;
  scrollable?: boolean;
  emptyState?: React.ComponentType;
  isLoading?: boolean;
}

const EventList: FC<EventListProps> = ({type, isLoading}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {useEventHome} = useEventHook();

  const {
    data: dataEvent,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isRefetching,
  } = useEventHome();

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    handleNextPage();
  }, []);

  let number = 0;

  return dataEvent && dataEvent?.pages?.length > 0 ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      onTouchEnd={handleNextPage}
      contentContainerStyle={{
        paddingRight:
          dataEvent?.pages[0]?.meta?.total > 3 ? widthResponsive(24) : 0,
        width: dataEvent?.pages[0]?.meta?.total > 3 ? 'auto' : '100%',
        paddingLeft: widthResponsive(24),
      }}>
      {dataEvent?.pages?.map((page: EventHomeResponse) => {
        if (page?.data?.length > 0) {
          return (
            <View
              style={{
                marginRight: ms(18),
                flex: 1,
                width:
                  dataEvent?.pages[0]?.meta?.total > 3
                    ? widthResponsive(255)
                    : '100%',
              }}>
              {page?.data?.map(item => {
                number += 1;
                return (
                  <TouchableOpacity
                    key={number}
                    onPress={() => {
                      navigation.navigate('EventDetail', {id: item.id});
                    }}>
                    <MusiciansListCard
                      key={item.id}
                      musicianNum={number.toLocaleString('en-US', {
                        minimumIntegerDigits: 2,
                        useGrouping: false,
                      })}
                      musicianName={item.name}
                      imgUri={item.imageCover?.[0]?.image || ''}
                      containerStyles={
                        item.status === 'live'
                          ? styles.eventLive
                          : {marginVertical: mvs(12)}
                      }
                      point={type === 'profile' ? '' : ''}
                      isEvent={true}
                      activeMore={false}
                      onPressImage={() =>
                        navigation.navigate('EventDetail', {id: item.id})
                      }
                      onPressMore={() => null}
                      eventDate={`${item.locationCountry}, ${dayjs(
                        item.startDate,
                      ).format('D MMM YYYY')}`}
                      isLive={item.status === 'live'}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }
      })}
      {isFetchingNextPage && (
        <View
          style={{
            marginRight: ms(20),
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: widthResponsive(255),
          }}>
          <LoadingSpinner />
        </View>
      )}
    </ScrollView>
  ) : isLoading || isRefetching ? (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: mvs(20),
      }}>
      <LoadingSpinner />
    </View>
  ) : (
    <EmptyStateSongMusician text={t('Event.EmptyState.Home')} />
  );
};

export default EventList;

const styles = StyleSheet.create({
  eventLive: {
    marginVertical: mvs(3),
    borderColor: Color.Pink.linear,
    borderWidth: 1,
    paddingHorizontal: widthResponsive(6),
    paddingVertical: heightResponsive(8),
    borderRadius: widthResponsive(4),
    overflow: 'hidden',
    position: 'relative',
  },
});
