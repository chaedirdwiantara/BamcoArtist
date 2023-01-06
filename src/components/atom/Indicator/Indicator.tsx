import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {mvs} from 'react-native-size-matters';

interface IndicatorProps {
  activeIndex: number;
  totalIndex: number;
  activeColor?: string;
  inActiveColor?: string;
}

export const Indicator: React.FC<IndicatorProps> = ({
  activeIndex,
  totalIndex,
  activeColor,
  inActiveColor,
}) => {
  return (
    <SafeAreaView style={styles.root}>
      {Array.from(Array(totalIndex).keys()).map((item, index) => {
        return (
          <View
            key={index}
            style={[
              styles.indicator,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                width: item === activeIndex ? '8.5%' : '1.6%',
                aspectRatio: item === activeIndex ? 32 / 6 : 1 / 1,
                backgroundColor:
                  item === activeIndex ? activeColor : inActiveColor,
              },
            ]}
          />
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '4%',
  },
  indicator: {
    height: undefined,
    borderRadius: 10,
    marginRight: mvs(4),
  },
});
