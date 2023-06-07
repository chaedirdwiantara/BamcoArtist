import React, {FC, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {
  FollowMusicianPropsType,
  MusicianList,
} from '../../interface/musician.interface';
import {widthResponsive} from '../../utils';
import {ParamsProps} from '../../interface/base.interface';
import {ListDataSearchMusician} from '../../interface/search.interface';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';
import {EmptyStateSongMusician} from '../../components/molecule/EmptyState/EmptyStateSongMusician';

interface TopMusicianProps {
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

const TopMusician: FC<TopMusicianProps> = ({
  type,
  dataMusician,
  setFollowMusician,
  setUnfollowMusician,
  isLoading,
}) => {
  const {t} = useTranslation();
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

  return listMusician && listMusician?.length > 0 ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingRight: listMusician?.length > 5 ? widthResponsive(24) : 0,
        paddingLeft: widthResponsive(24),
        width: listMusician?.length > 5 ? 'auto' : '100%',
      }}>
      <View
        style={{
          marginRight: ms(20),
          flex: 1,
          width: listMusician?.length > 5 ? widthResponsive(255) : '100%',
        }}>
        {listMusician?.map((item, index) => {
          if (index <= 4) {
            return (
              <MusicianSection
                key={item.uuid}
                userId={item.uuid}
                musicianNum={(index + 1).toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
                musicianName={item.fullname}
                imgUri={item.imageProfileUrls[1]?.image || ''}
                containerStyles={{
                  marginTop: mvs(12),
                }}
                point={type === 'profile' ? item.point || 0 : null}
                isFollowed={item.isFollowed}
                followOnPress={() => followOnPress(item.uuid, item.isFollowed)}
              />
            );
          }
        })}
      </View>
      {listMusician?.length > 5 && (
        <View style={{width: widthResponsive(255)}}>
          {listMusician?.map((item, index) => {
            if (index > 4 && index < 10) {
              return (
                <MusicianSection
                  key={item.uuid}
                  userId={item.uuid}
                  musicianNum={(index + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                  musicianName={item.fullname}
                  imgUri={item.imageProfileUrls[1]?.image || ''}
                  containerStyles={{
                    marginTop: mvs(12),
                  }}
                  point={type === 'profile' ? item.point || 0 : null}
                  isFollowed={item.isFollowed}
                  followOnPress={() =>
                    followOnPress(item.uuid, item.isFollowed)
                  }
                />
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
    <EmptyStateSongMusician
      text={t('Home.Musician.EmptyState', {title: 'Top Musician'})}
    />
  );
};

export default TopMusician;
