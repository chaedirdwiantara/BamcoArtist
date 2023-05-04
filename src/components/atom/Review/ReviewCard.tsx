import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {Avatar} from '../Avatar/Avatar';
import {
  heightPercentage,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {StarIcon} from '../../../assets/icon';
import FileView from './FileView';
import Font from '../../../theme/Font';
import {mvs} from 'react-native-size-matters';
import Color from '../../../theme/Color';
import Gap from '../Gap/Gap';

const ReviewCard = () => {
  return (
    <View style={styles.container}>
      <View style={{width: widthResponsive(33)}}>
        <Avatar
          imgUri={'https://picsum.photos/200'}
          size={widthResponsive(33)}
        />
      </View>
      <Gap width={widthPercentage(8)} />
      <View style={{flex: 1}}>
        <View style={styles.userContainer}>
          <Text style={styles.username}>Sam</Text>
          <Gap width={widthPercentage(4)} />
          <Text style={styles.time}>Yesterday</Text>
        </View>
        <Gap height={heightPercentage(4)} />
        <View style={styles.row}>
          <StarIcon width={widthPercentage(12)} height={heightPercentage(12)} />
          <Gap width={widthPercentage(4)} />
          <StarIcon width={widthPercentage(12)} height={heightPercentage(12)} />
          <Gap width={widthPercentage(4)} />
          <StarIcon width={widthPercentage(12)} height={heightPercentage(12)} />
          <Gap width={widthPercentage(4)} />
          <StarIcon width={widthPercentage(12)} height={heightPercentage(12)} />
          <Gap width={widthPercentage(4)} />
          <StarIcon width={widthPercentage(12)} height={heightPercentage(12)} />
        </View>
        <Gap height={heightPercentage(8)} />
        <View>
          <Text style={styles.variant}>Variant : M</Text>
        </View>
        <Gap height={heightPercentage(8)} />
        <View>
          <Text style={styles.desc}>
            Impressive details, fabulous wear for party and watching concert
            offline, let’s go guys buy this shirt
          </Text>
        </View>
        <Gap height={heightPercentage(8)} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FileView imageUri="https://picsum.photos/200" />
          <FileView imageUri="https://picsum.photos/200" />
          <FileView imageUri="https://picsum.photos/200" video />
        </ScrollView>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    paddingHorizontal: widthPercentage(24),
    paddingVertical: heightPercentage(16),
  },
  row: {
    flexDirection: 'row',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontFamily: Font.InterExtraBold,
    fontSize: mvs(13),
    color: Color.Neutral[10],
  },
  time: {
    fontFamily: Font.InterRegular,
    fontSize: mvs(11),
    color: Color.Dark[50],
  },
  variant: {
    fontFamily: Font.InterBold,
    fontSize: mvs(13),
    color: Color.Neutral[10],
  },
  desc: {
    fontFamily: Font.InterRegular,
    fontSize: mvs(13),
    color: Color.Neutral[10],
  },
});
