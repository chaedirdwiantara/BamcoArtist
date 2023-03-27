import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {widthResponsive} from '../../../../utils';
import PopularPost from './PopularPost';
import MostPlayed from './MostPlayed';
import Merch from './Merch';
import Released from './Released';

const MainTab = () => {
  return (
    <View style={styles.container}>
      <PopularPost />
      <MostPlayed />
      <Merch />
      <Released />
    </View>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: widthResponsive(14),
  },
});
