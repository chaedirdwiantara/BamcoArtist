import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {color} from '../../theme';
import {width} from '../../utils';

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
              <View style={{paddingHorizontal: mvs(15)}}>
                <SkeletonPlaceholder.Item
                  width={mvs(40)}
                  height={mvs(40)}
                  marginVertical={mvs(5)}
                />
                <SkeletonPlaceholder.Item width={'80%'} height={mvs(10)} />
                <SkeletonPlaceholder.Item
                  width={'80%'}
                  height={mvs(14)}
                  marginVertical={mvs(5)}
                />
                <SkeletonPlaceholder.Item width={'60%'} height={mvs(15)} />
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={mvs(20)}
                  marginTop={mvs(15)}
                  borderRadius={mvs(5)}
                />
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBadge: {
    width: '43%',
    paddingVertical: mvs(12),
    backgroundColor: '#1A2435',
    borderRadius: mvs(8),
    marginHorizontal: mvs(8),
    marginVertical: mvs(8),
  },
});
