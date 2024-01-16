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
            {/* IMAGE */}
            <SkeletonPlaceholder.Item
              alignSelf="center"
              width={mvs(85)}
              height={mvs(85)}
              borderRadius={mvs(40)}
              marginTop={mvs(20)}
            />
            {/* RANK */}
            <SkeletonPlaceholder.Item
              alignSelf="center"
              width={mvs(70)}
              height={mvs(15)}
              marginTop={mvs(20)}
            />
          </View>
        </SkeletonPlaceholder>
      </ImageBackground>
      {/* CURRENT PROGRESS LEVEL */}
      <SkeletonPlaceholder
        highlightColor={color.Dark[800]}
        backgroundColor="#2B3240"
        borderRadius={mvs(10)}>
        <View style={styles.containerLoyalty}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={mvs(12)}
            marginVertical={mvs(6)}
          />
        </View>
      </SkeletonPlaceholder>
      {/* BENEFIT */}
      <View style={styles.containerBenefit}>
        <SkeletonPlaceholder
          highlightColor={color.Dark[800]}
          backgroundColor="#2B3240"
          borderRadius={mvs(10)}>
          <View>
            <SkeletonPlaceholder.Item
              width={mvs(55)}
              height={mvs(10)}
              marginLeft={mvs(12)}
              marginTop={mvs(2)}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: mvs(12),
              }}>
              {Array.from(Array(3).keys()).map((val, index) => {
                return (
                  <View
                    style={{marginLeft: mvs(12), flexDirection: 'row'}}
                    key={index}>
                    <SkeletonPlaceholder.Item
                      alignSelf="center"
                      width={mvs(28)}
                      height={mvs(28)}
                      borderRadius={mvs(28)}
                    />
                    <View style={{alignSelf: 'center', marginLeft: mvs(5)}}>
                      <SkeletonPlaceholder.Item
                        width={mvs(38)}
                        height={mvs(9)}
                      />
                      <SkeletonPlaceholder.Item
                        width={mvs(53)}
                        height={mvs(9)}
                        marginTop={mvs(5)}
                      />
                    </View>
                  </View>
                );
              })}
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
    height: widthResponsive(250),
  },
  containerRank: {
    width: '100%',
    height: widthResponsive(250),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLoyalty: {
    paddingHorizontal: widthResponsive(24),
    marginTop: mvs(20),
    marginBottom: mvs(10),
  },
  containerPoint: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerBenefit: {
    paddingVertical: mvs(12),
    marginHorizontal: widthResponsive(24),
    backgroundColor: '#1A2435',
    borderRadius: mvs(8),
  },
});
