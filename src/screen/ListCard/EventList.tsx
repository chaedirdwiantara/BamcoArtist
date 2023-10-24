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
import {EventListData} from '../../interface/event.interface';
import dayjs from 'dayjs';

interface EventListProps {
  type?: string;
  scrollable?: boolean;
  dataEvent?: EventListData[];
  emptyState?: React.ComponentType;
  isLoading?: boolean;
}

const EventList: FC<EventListProps> = ({type, dataEvent, isLoading}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [listEvent, setlistEvent] = useState(dataEvent);

  useEffect(() => {
    if (dataEvent !== undefined) {
      setlistEvent(dataEvent);
    }
  }, [dataEvent]);

  return listEvent && listEvent?.length > 0 ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingRight: listEvent?.length > 5 ? widthResponsive(24) : 0,
        width: listEvent?.length > 5 ? 'auto' : '100%',
        paddingLeft: widthResponsive(24),
      }}>
      <View
        style={{
          marginRight: ms(20),
          flex: 1,
          width: listEvent?.length > 5 ? widthResponsive(255) : '100%',
        }}>
        {listEvent?.map((item, index) => {
          if (index <= 4) {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EventDetail', {id: item.id});
                }}>
                <MusiciansListCard
                  key={item.id}
                  musicianNum={(index + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                  musicianName={item.name}
                  imgUri={item.imageCover?.[0]?.image || ''}
                  containerStyles={
                    item.status === 'live'
                      ? styles.eventLive
                      : {marginTop: mvs(18)}
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
          }
        })}
      </View>
      {listEvent?.length > 5 && (
        <View style={{width: widthResponsive(255)}}>
          {listEvent?.map((item, index) => {
            if (index > 4 && index < 10) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EventDetail', {id: item.id});
                  }}>
                  <MusiciansListCard
                    key={item.id}
                    musicianNum={(index + 1).toLocaleString('en-US', {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                    musicianName={item.name}
                    imgUri={item.imageCover?.[0]?.image || ''}
                    containerStyles={
                      item.status === 'live'
                        ? styles.eventLive
                        : {marginTop: mvs(18)}
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
            }
          })}
        </View>
      )}
    </ScrollView>
  ) : isLoading ? (
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
    marginTop: mvs(18),
    borderColor: Color.Pink.linear,
    borderWidth: 1,
    paddingHorizontal: widthResponsive(6),
    paddingVertical: heightResponsive(8),
    borderRadius: widthResponsive(4),
    overflow: 'hidden',
    position: 'relative',
  },
});
