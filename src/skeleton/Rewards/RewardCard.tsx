import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {color} from '../../theme';
import {height, width} from '../../utils';

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
                  // flexDirection: 'row',
                  paddingHorizontal: mvs(15),
                }}>
                {/* IMAGE REWARD */}
                <SkeletonPlaceholder.Item
                  alignSelf="center"
                  width={'97%'}
                  height={mvs(100)}
                  borderRadius={mvs(4)}
                />
                {/* TITLE REWARD */}
                <View style={{marginTop: mvs(15)}}>
                  <SkeletonPlaceholder.Item width={mvs(90)} height={mvs(10)} />
                  <SkeletonPlaceholder.Item
                    width={mvs(50)}
                    height={mvs(10)}
                    marginVertical={mvs(10)}
                  />
                </View>
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
    width: width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBadge: {
    width: '42%',
    height: height * 0.23,
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
