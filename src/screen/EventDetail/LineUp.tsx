import React, {FC, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {heightResponsive, widthResponsive} from '../../utils';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {EmptyStateSongMusician} from '../../components/molecule/EmptyState/EmptyStateSongMusician';
import Color from '../../theme/Color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MusiciansListCard from '../../components/molecule/ListCard/MusiciansListCard';
import {EventLineUp} from '../../interface/event.interface';
import {MainTabParams, RootStackParams} from '../../navigations';
import {profileStorage} from '../../hooks/use-storage.hook';

interface EventLineUpInterface {
  dataLineUp?: EventLineUp[];
  isLoading?: boolean;
  eventId: string;
  endDate: string;
}

const LineUp: FC<EventLineUpInterface> = ({
  dataLineUp,
  isLoading,
  eventId,
  endDate,
}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [listLineUp, setListLineUp] = useState(dataLineUp);
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();

  useEffect(() => {
    if (dataLineUp !== undefined) {
      setListLineUp(dataLineUp);
    }
  }, [dataLineUp]);

  return listLineUp && listLineUp?.length > 0 ? (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{paddingBottom: heightResponsive(40)}}>
      {listLineUp?.map((item, index) => {
        const self = item?.musician?.UUID === profileStorage()?.uuid;
        return (
          <MusiciansListCard
            key={item?.musician?.UUID}
            musicianNum={(index + 1).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            musicianName={item?.musician?.fullname}
            imgUri={item?.musician?.image?.[1]?.image || ''}
            containerStyles={
              item?.statusLineupEvent === 'live'
                ? styles.musicianLive
                : {marginTop: mvs(18)}
            }
            followerMode
            followersCount={item?.musician?.followers}
            activeMore={false}
            isLive={item?.statusLineupEvent === 'live'}
            onClickTip={() =>
              self
                ? navigation2.navigate('Profile', {})
                : navigation.push('LiveTipping', {
                    id: item?.musician?.UUID,
                    eventId: eventId,
                    endDate: endDate,
                  })
            }
            onPressImage={() =>
              self
                ? navigation2.navigate('Profile', {})
                : navigation.push('MusicianProfile', {
                    id: item?.musician?.UUID,
                  })
            }
            onPressMore={() => null}
            self={self}
            isLineUp={true}
            liveTime={item?.startTime}
          />
        );
      })}

      {isLoading && (
        <View
          style={{
            alignItems: 'center',
            paddingVertical: mvs(20),
          }}>
          <LoadingSpinner />
        </View>
      )}
    </ScrollView>
  ) : (
    <EmptyStateSongMusician
      title={t('Event.EmptyState.LineUp.Title') || ''}
      text={t('Event.EmptyState.LineUp.Subtitle')}
    />
  );
};

export default LineUp;

const styles = StyleSheet.create({
  musicianLive: {
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
