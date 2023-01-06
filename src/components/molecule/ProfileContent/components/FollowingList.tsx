import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ArrowLeftIcon} from '../../../../assets/icon';

import {SearchBar} from '../../../atom';
import {ListCard} from '../../ListCard';
import Color from '../../../../theme/Color';
import {TopNavigation} from '../../TopNavigation';
import {dataRecommendedArtist} from '../../../../data/following';
import {heightPercentage, width, widthPercentage} from '../../../../utils';

interface FollowingListProps {
  onPressGoBack: () => void;
}

export const FollowingList: React.FC<FollowingListProps> = ({
  onPressGoBack,
}) => {
  const [search, setSearch] = useState('');

  const followOnPress = () => {};

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Following"
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
      {dataRecommendedArtist.map((val, i) => (
        <View key={i} style={{width, paddingHorizontal: widthPercentage(20)}}>
          <ListCard.FollowMusician
            musicianName={val.fullname}
            imgUri={val.imageProfileUrl || ''}
            containerStyles={{marginTop: heightPercentage(10)}}
            followerCount={val.followers}
            followOnPress={() => followOnPress()}
            stateButton={val.isFollowed}
          />
        </View>
      ))}
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
