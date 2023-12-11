import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {color} from '../../theme';
import {width} from '../../utils';
import DottedLineIos from '../../components/atom/DottedLine/dottedLineiOs';
import DottedLineAndroid from '../../components/atom/DottedLine/dottedLineAndroid';

interface RewardCardProps {}

export const RewardCardSkeleton: React.FC<RewardCardProps> = ({}) => {
  return (
    <View style={styles.containerCard}>
      {Array.from(Array(4).keys()).map((val, index) => {
        return (
          <View style={styles.containerBadge} key={index}>
            <SkeletonPlaceholder
              highlightColor={color.Dark[800]}
              backgroundColor="#2B3240"
              borderRadius={mvs(10)}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: mvs(15),
                }}>
                {/* IMAGE REWARD */}
                <SkeletonPlaceholder.Item
                  alignSelf="center"
                  width={mvs(40)}
                  height={mvs(40)}
                  borderRadius={mvs(4)}
                />
                {/* TITLE REWARD */}
                <View
                  style={{
                    marginLeft: mvs(15),
                    marginTop: mvs(8),
                  }}>
                  <SkeletonPlaceholder.Item width={mvs(220)} height={mvs(10)} />
                  <SkeletonPlaceholder.Item
                    width={mvs(220)}
                    height={mvs(10)}
                    marginVertical={mvs(10)}
                  />
                </View>
              </View>
            </SkeletonPlaceholder>
            {/* DASHED LINE */}
            <View style={styles.dottedContainer}>
              {Platform.OS === 'ios' ? (
                <DottedLineIos color={color.Dark[10]} length="450%" />
              ) : (
                <DottedLineAndroid color={color.Dark[10]} />
              )}
            </View>
            {/* POINTS & BUTTON */}
            <SkeletonPlaceholder
              highlightColor={color.Dark[800]}
              backgroundColor="#2B3240"
              borderRadius={mvs(10)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: mvs(15),
                }}>
                <SkeletonPlaceholder.Item width={mvs(70)} height={mvs(10)} />
                <SkeletonPlaceholder.Item width={mvs(70)} height={mvs(10)} />
              </View>
            </SkeletonPlaceholder>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    width,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBadge: {
    width: '90%',
    paddingVertical: mvs(12),
    backgroundColor: '#1A2435',
    borderRadius: mvs(8),
    marginHorizontal: mvs(8),
    marginVertical: mvs(8),
  },
  dottedContainer: {
    width: '100%',
    paddingHorizontal: ms(5),
    marginVertical: mvs(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
