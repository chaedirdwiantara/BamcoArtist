import {View, StyleSheet} from 'react-native';
import React from 'react';
import StarCount from '../../components/atom/Review/StarCount';
import {heightPercentage, widthPercentage} from '../../utils';

const Reviews = () => {
  return (
    <View style={styles.container}>
      <StarCount />
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPercentage(24),
    paddingVertical: heightPercentage(16),
  },
});
