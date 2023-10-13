import React from 'react';
import {mvs} from 'react-native-size-matters';
import {StyleSheet, View, Text, Image} from 'react-native';

import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';

interface BadgeLevelProps {
  imageUri: string;
  text: string;
  backgroundColor: string;
}

export const BadgeLevel: React.FC<BadgeLevelProps> = (
  props: BadgeLevelProps,
) => {
  const {imageUri, text, backgroundColor} = props;

  return (
    <View style={styles.root}>
      <Image source={{uri: imageUri}} style={styles.lvlImage} />
      <View style={[styles.viewStyles, {backgroundColor}]}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mvs(10),
    marginLeft: widthResponsive(10),
  },
  viewStyles: {
    paddingVertical: mvs(6),
    paddingRight: widthResponsive(15),
    paddingLeft: widthResponsive(25),
    backgroundColor: color.Pink.linear,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: mvs(11),
    fontFamily: font.InterSemiBold,
    color: color.Neutral[10],
  },
  lvlImage: {
    width: mvs(28),
    height: mvs(30),
    position: 'absolute',
    zIndex: 1,
    left: widthResponsive(-14),
  },
});
