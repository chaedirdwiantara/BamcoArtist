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
      {Array.from(Array(6).keys()).map((val, index) => {
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
                {/* CUP ICON */}
                <View style={styles.containerCup}>
                  <SkeletonPlaceholder.Item
                    alignSelf="center"
                    width={mvs(25)}
                    height={mvs(25)}
                    borderRadius={mvs(4)}
                  />
                  <SkeletonPlaceholder.Item
                    width={mvs(20)}
                    height={mvs(8)}
                    marginTop={mvs(5)}
                  />
                </View>
                <View
                  style={{
                    marginLeft: mvs(15),
                    marginTop: mvs(10),
                  }}>
                  {/* TITLE MISSION */}
                  <SkeletonPlaceholder.Item width={mvs(120)} height={mvs(10)} />
                  {/* PROGRESS BAR */}
                  <SkeletonPlaceholder.Item
                    width={mvs(220)}
                    height={mvs(10)}
                    marginTop={mvs(5)}
                    marginBottom={mvs(10)}
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
    width,
    alignSelf: 'center',
    paddingHorizontal: ms(24),
  },
  containerBadge: {
    width: '100%',
    backgroundColor: '#191F29',
    borderRadius: mvs(8),
    paddingVertical: mvs(6),
    marginVertical: mvs(6),
  },
  containerCup: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
