import {View, StyleSheet} from 'react-native';
import React from 'react';
import StarCount from '../../components/atom/Review/StarCount';
import {heightPercentage, widthPercentage} from '../../utils';
import {SsuDivider} from '../../components';
import ReviewCard from '../../components/atom/Review/ReviewCard';

const Reviews = () => {
  return (
    <View style={{marginBottom: heightPercentage(50)}}>
      <View style={styles.container}>
        <StarCount />
      </View>
      <View>
        <ReviewCard />
        <SsuDivider />
      </View>
      <View>
        <ReviewCard />
        <SsuDivider />
      </View>
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
