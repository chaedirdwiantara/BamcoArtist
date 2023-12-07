import React from 'react';
import {mvs} from 'react-native-size-matters';
import {View, StyleSheet, ImageBackground} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {color} from '../../theme';
import {widthResponsive} from '../../utils';

interface RewardsProps {}

export const RewardsSkeleton: React.FC<RewardsProps> = ({}) => {
  return (
    <View style={styles.root}>
      {/* RANK BADGE */}
      <ImageBackground
        style={styles.containerContent}
        source={require('../../assets/image/Bg6.png')}>
        <SkeletonPlaceholder
          highlightColor={color.Dark[800]}
          backgroundColor="#2B3240"
          borderRadius={mvs(10)}>
          {/* BADGE */}
          <View style={styles.containerRank}>
            {/* RANK */}
            <SkeletonPlaceholder.Item
              alignSelf="center"
              width={mvs(70)}
              height={mvs(10)}
              marginBottom={mvs(5)}
            />
            <SkeletonPlaceholder.Item
              alignSelf="center"
              width={mvs(100)}
              height={mvs(20)}
            />
            {/* IMAGE */}
            <SkeletonPlaceholder.Item
              alignSelf="center"
              width={mvs(110)}
              height={mvs(110)}
              marginVertical={mvs(25)}
            />
            {/* CREDIT BONUS */}
            <SkeletonPlaceholder.Item
              alignSelf="center"
              width={mvs(80)}
              height={mvs(20)}
            />
            <SkeletonPlaceholder.Item
              alignSelf="center"
              width={mvs(100)}
              height={mvs(10)}
              marginTop={mvs(5)}
            />
          </View>
        </SkeletonPlaceholder>
      </ImageBackground>
      {/* LOYALTY POINT */}
      <SkeletonPlaceholder
        highlightColor={color.Dark[800]}
        backgroundColor="#2B3240"
        borderRadius={mvs(10)}>
        <View style={styles.containerLoyalty}>
          <SkeletonPlaceholder.Item width={mvs(110)} height={mvs(10)} />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={mvs(10)}
            marginVertical={mvs(6)}
          />
          <View style={styles.containerPoint}>
            <SkeletonPlaceholder.Item width={mvs(110)} height={mvs(10)} />
            <SkeletonPlaceholder.Item width={mvs(110)} height={mvs(10)} />
          </View>
        </View>
      </SkeletonPlaceholder>
      {/* NEXT RANK / BADGE */}
      <View style={styles.containerBadge}>
        <SkeletonPlaceholder
          highlightColor={color.Dark[800]}
          backgroundColor="#2B3240"
          borderRadius={mvs(10)}>
          <View style={{flexDirection: 'row', paddingHorizontal: mvs(15)}}>
            <SkeletonPlaceholder.Item
              alignSelf="center"
              width={mvs(40)}
              height={mvs(40)}
            />
            <View style={{marginLeft: mvs(15)}}>
              <SkeletonPlaceholder.Item width={mvs(180)} height={mvs(10)} />
              <SkeletonPlaceholder.Item
                width={mvs(220)}
                height={mvs(10)}
                marginVertical={mvs(5)}
              />
              <SkeletonPlaceholder.Item width={mvs(150)} height={mvs(10)} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  containerContent: {
    width: '100%',
    height: widthResponsive(400),
  },
  containerRank: {
    width: '100%',
    height: widthResponsive(400),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLoyalty: {
    paddingHorizontal: widthResponsive(24),
    marginVertical: mvs(20),
  },
  containerPoint: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerBadge: {
    paddingVertical: mvs(12),
    marginHorizontal: widthResponsive(24),
    backgroundColor: '#1A2435',
    borderRadius: mvs(8),
  },
});
