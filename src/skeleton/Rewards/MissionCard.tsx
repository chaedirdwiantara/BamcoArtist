import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {color} from '../../theme';
import {width} from '../../utils';

interface MissionProps {}

export const MissionCardSkeleton: React.FC<MissionProps> = ({}) => {
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
                <View
                  style={{
                    marginRight: mvs(15),
                    marginTop: mvs(8),
                  }}>
                  {/* TITLE MISSION */}
                  <View style={{flexDirection: 'row'}}>
                    <SkeletonPlaceholder.Item
                      width={mvs(120)}
                      height={mvs(10)}
                    />
                    <SkeletonPlaceholder.Item
                      width={mvs(40)}
                      height={mvs(10)}
                      marginLeft={ms(60)}
                    />
                  </View>
                  {/* PROGRESS BAR */}
                  <SkeletonPlaceholder.Item
                    width={mvs(220)}
                    height={mvs(10)}
                    marginVertical={mvs(10)}
                  />
                </View>
                {/* BUTTON GO/CLAIM */}
                <SkeletonPlaceholder.Item
                  alignSelf="center"
                  width={mvs(40)}
                  height={mvs(40)}
                  borderRadius={mvs(4)}
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
    alignSelf: 'center',
    paddingHorizontal: ms(24),
  },
  containerBadge: {
    width: '100%',
    backgroundColor: '#191F29',
    borderRadius: mvs(8),
    paddingVertical: mvs(8),
    marginVertical: mvs(8),
  },
});
