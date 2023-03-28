import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {
  heightPercentage,
  heightResponsive,
  width,
  widthPercentage,
} from '../../../../utils';
import {SearchBar} from '../../../atom';
import {ListCard} from '../../ListCard';
import Color from '../../../../theme/Color';
import {
  FollowMusicianPropsType,
  MusicianList,
} from '../../../../interface/musician.interface';
import {TopNavigation} from '../../TopNavigation';
import {ArrowLeftIcon} from '../../../../assets/icon';
import {useTranslation} from 'react-i18next';

interface FollowingListProps {
  onPressGoBack: () => void;
  setFollowMusician: (props?: FollowMusicianPropsType) => void;
  setUnfollowMusician: (props?: FollowMusicianPropsType) => void;
  dataList?: MusicianList[];
  search: string;
  setSearch: (value: string) => void;
  goToMusician: (value: string) => void;
}

export const FollowingList: React.FC<FollowingListProps> = ({
  dataList,
  setFollowMusician,
  setUnfollowMusician,
  onPressGoBack,
  search,
  setSearch,
  goToMusician,
}) => {
  const {t} = useTranslation();
  const [listFollowing, setListFollowing] = useState(dataList);

  useEffect(() => {
    if (dataList !== undefined) {
      setListFollowing(dataList);
    }
  }, [dataList]);

  const followOnPress = (index: string, isFollowed: boolean) => {
    if (listFollowing !== undefined) {
      const newList = listFollowing.map(val => ({
        ...val,
        isFollowed: val.uuid === index ? !val.isFollowed : val.isFollowed,
      }));

      setListFollowing(newList);
    }

    isFollowed
      ? setUnfollowMusician({musicianID: index})
      : setFollowMusician({musicianID: index});
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Preference.Following')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />
      <SearchBar
        value={search}
        onChangeText={(text: string) => setSearch(text)}
        containerStyle={{
          paddingHorizontal: widthPercentage(20),
          paddingVertical: heightPercentage(20),
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: heightResponsive(25)}}>
        {listFollowing?.map((val, i) => (
          <View key={i} style={{width, paddingHorizontal: widthPercentage(20)}}>
            <ListCard.FollowMusician
              musicianName={val.fullname}
              imgUri={val.imageProfileUrls}
              containerStyles={{marginTop: heightPercentage(15)}}
              followerCount={val.followers}
              followOnPress={() => followOnPress(val.uuid, val.isFollowed)}
              stateButton={val.isFollowed}
              toDetailOnPress={() => goToMusician(val.uuid)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  textVersion: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
    paddingTop: heightPercentage(15),
  },
  textSignOut: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
  },
  containerSignout: {
    flexDirection: 'row',
    paddingLeft: widthPercentage(15),
    position: 'absolute',
    bottom: heightPercentage(20),
  },
});
