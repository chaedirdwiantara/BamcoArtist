import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';

import {Gap} from '../../atom';
import {color, typography} from '../../../theme';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface ContentCardProps {
  title: string;
  subtitle: string;
  imgUri?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  subtitle,
  imgUri,
}) => {
  return (
    <View style={styles.root}>
      <Image
        source={
          imgUri
            ? {uri: imgUri}
            : require('../../../assets/image/exclusive.png')
        }
        style={styles.image}
      />
      <View style={styles.containerText}>
        <Text style={[typography.Body3, {color: color.Neutral[10]}]}>
          {title}
        </Text>
        <Gap height={heightPercentage(8)} />
        <Text style={[typography.Body4, {color: color.Neutral[10]}]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: width * 0.9,
    borderRadius: 5,
    borderColor: color.Dark[300],
    borderWidth: heightPercentage(1),
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: widthPercentage(12),
    paddingVertical: heightPercentage(12),
  },
  image: {
    height: widthPercentage(80),
    width: widthPercentage(80),
    resizeMode: 'cover',
    borderRadius: 4,
  },
  containerText: {
    width: '70%',
    paddingLeft: widthPercentage(10),
  },
});
