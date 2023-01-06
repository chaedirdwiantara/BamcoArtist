import React, {FC} from 'react';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {
  FollowMusicianPropsType,
  MusicianList,
} from '../../interface/musician.interface';
import {ParamsProps} from '../../interface/base.interface';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';
import {heightResponsive} from '../../utils';

interface TopMusicianProps {
  type?: string;
  scrollable?: boolean;
  dataMusician?: MusicianList[];
  setFollowMusician: (
    props?: FollowMusicianPropsType,
    params?: ParamsProps,
  ) => void;
  setUnfollowMusician: (
    props?: FollowMusicianPropsType,
    params?: ParamsProps,
  ) => void;
  emptyState?: Element;
}

const TopMusician: FC<TopMusicianProps> = ({
  type,
  scrollable = true,
  dataMusician,
  setFollowMusician,
  setUnfollowMusician,
  emptyState,
}) => {
  const followOnPress = (index: string, isFollowed: boolean) => {
    isFollowed
      ? setUnfollowMusician({musicianID: index}, {filterBy: 'top'})
      : setFollowMusician({musicianID: index}, {filterBy: 'top'});
  };

  return (
    <FlashList
      data={dataMusician}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollable}
      keyExtractor={item => item.uuid}
      ListEmptyComponent={emptyState ?? null}
      renderItem={({item, index}) => (
        <MusicianSection
          musicianId={item.uuid}
          musicianNum={(index + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          musicianName={item.fullname}
          imgUri={item.imageProfileUrl || ''}
          containerStyles={{marginTop: mvs(20)}}
          point={type === 'profile' ? item.point || 0 : null}
          isFollowed={item.isFollowed}
          followOnPress={() => followOnPress(item.uuid, item.isFollowed)}
        />
      )}
      estimatedItemSize={heightResponsive(500)}
    />
  );
};

export default TopMusician;
