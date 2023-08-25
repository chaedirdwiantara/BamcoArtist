import React, {FC, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {
  FollowMusicianPropsType,
  MusicianList,
} from '../../interface/musician.interface';
import {heightResponsive, widthResponsive} from '../../utils';
import {ParamsProps} from '../../interface/base.interface';
import {ListDataSearchMusician} from '../../interface/search.interface';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {EmptyStateSongMusician} from '../../components/molecule/EmptyState/EmptyStateSongMusician';
import Color from '../../theme/Color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import MusiciansListCard from '../../components/molecule/ListCard/MusiciansListCard';

interface LineUpProps {
  type?: string;
  scrollable?: boolean;
  dataMusician?: MusicianList[] | ListDataSearchMusician[];
  setFollowMusician: (
    props?: FollowMusicianPropsType,
    params?: ParamsProps,
  ) => void;
  setUnfollowMusician: (
    props?: FollowMusicianPropsType,
    params?: ParamsProps,
  ) => void;
  emptyState?: React.ComponentType;
  isLoading?: boolean;
}

const LineUp: FC<LineUpProps> = ({dataMusician, isLoading}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [listMusician, setListMusician] = useState(dataMusician);

  useEffect(() => {
    if (dataMusician !== undefined) {
      setListMusician(dataMusician);
      console.log(dataMusician);
    }
  }, [dataMusician]);

  return listMusician && listMusician?.length > 0 ? (
    <ScrollView showsHorizontalScrollIndicator={false}>
      {listMusician?.map((item, index) => {
        return (
          <MusiciansListCard
            key={item.uuid}
            musicianNum={(index + 1).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            musicianName={item.fullname}
            imgUri={item.imageProfileUrls[1]?.image || ''}
            containerStyles={
              // TODO: get response from api isLive
              index === 0 ? styles.musicianLive : {marginTop: mvs(18)}
            }
            followerMode
            followersCount={item.followers}
            activeMore={false}
            isLive={index === 0}
            onClickTip={() => navigation.navigate('LiveTipping', {id: '1'})}
            onPressImage={() => navigation.navigate('EventDetail', {id: '1'})}
            onPressMore={() => null}
          />
        );
      })}
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
