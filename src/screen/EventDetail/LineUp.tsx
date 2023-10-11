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
import {RootStackParams} from '../../navigations';

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

  useEffect(() => {
    if (dataLineUp !== undefined) {
      setListLineUp(dataLineUp);
    }
  }, [dataLineUp]);

  return listLineUp && listLineUp?.length > 0 ? (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{paddingBottom: heightResponsive(40)}}>
      {isLoading && (
        <View
          style={{
            alignItems: 'center',
            paddingVertical: mvs(20),
          }}>
          <LoadingSpinner />
        </View>
      )}

      {listLineUp?.map((item, index) => {
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
              navigation.push('LiveTipping', {
                id: item?.musician?.UUID,
                eventId: eventId,
                endDate: endDate,
              })
            }
            onPressImage={
              () =>
                navigation.push('MusicianProfile', {id: item?.musician?.UUID})
              // navigation.push('LiveTipping', {
              //   id: item?.musician?.UUID,
              //   eventId: eventId,
              // })
            }
            onPressMore={() => null}
          />
        );
      })}
    </ScrollView>
  ) : (
    <EmptyStateSongMusician
      text={t('Home.Musician.EmptyState', {title: 'Top Musician'})}
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
