import React, {FC, useEffect, useState} from 'react';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {
  FollowMusicianPropsType,
  MusicianList,
} from '../../interface/musician.interface';
import {heightResponsive} from '../../utils';
import {ParamsProps} from '../../interface/base.interface';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';

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
  emptyState?: React.ComponentType;
}

const TopMusician: FC<TopMusicianProps> = ({
  type,
  scrollable = true,
  dataMusician,
  setFollowMusician,
  setUnfollowMusician,
  emptyState,
}) => {
  const [listMusician, setListMusician] = useState(dataMusician);

  const followOnPress = (index: string, isFollowed?: boolean) => {
    if (listMusician !== undefined) {
      const newList = listMusician.map(val => ({
        ...val,
        isFollowed: val.uuid === index ? !val.isFollowed : val.isFollowed,
      }));

      setListMusician(newList);
    }

    isFollowed
      ? setUnfollowMusician({musicianID: index}, {filterBy: 'top'})
      : setFollowMusician({musicianID: index}, {filterBy: 'top'});
  };

  useEffect(() => {
    if (dataMusician !== undefined) {
      setListMusician(dataMusician);
    }
  }, [dataMusician]);

  return (
    <FlashList<MusicianList>
      data={listMusician}
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
          imgUri={item.imageProfileUrls[1]?.image || ''}
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
