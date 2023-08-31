import React, {FC, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {
  FollowMusicianPropsType,
  MusicianList,
} from '../../interface/musician.interface';
import {heightResponsive, widthResponsive} from '../../utils';
import {ParamsProps} from '../../interface/base.interface';
import {ListDataSearchMusician} from '../../interface/search.interface';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';
import {EmptyStateSongMusician} from '../../components/molecule/EmptyState/EmptyStateSongMusician';
import Color from '../../theme/Color';
import ModalTipped from '../../components/molecule/Modal/ModalTipped';
import MusiciansListCard from '../../components/molecule/ListCard/MusiciansListCard';

interface TopTiperProps {
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

const TopTiper: FC<TopTiperProps> = ({type, dataMusician, isLoading}) => {
  const {t} = useTranslation();
  const [listMusician, setListMusician] = useState(dataMusician);
  const [showTipped, setShowTipped] = useState<boolean>(false);

  useEffect(() => {
    if (dataMusician !== undefined) {
      setListMusician(dataMusician);
      console.log(dataMusician);
    }
  }, [dataMusician]);

  return (
    <>
      {listMusician && listMusician?.length > 0 ? (
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
                containerStyles={{marginTop: mvs(18)}}
                activeMore={false}
                showCredit={true}
                creditCount={1000}
                onPressImage={() => setShowTipped(true)}
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
      )}
      <ModalTipped
        modalVisible={showTipped}
        title={t('Event.Detail.TipDistribution')}
        secondTitle={t('Event.Detail.MusicianTipped')}
        onPressClose={() => setShowTipped(false)}
        tipper={listMusician?.[0]}
      />
    </>
  );
};

export default TopTiper;

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
