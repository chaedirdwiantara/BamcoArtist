import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {color, font} from '../../../theme';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import {normalize, widthPercentage, widthResponsive} from '../../../utils';
import {Avatar, Gap} from '../../atom';

const {width} = Dimensions.get('screen');

interface AvatarItem {
  uri?: string;
  name?: string;
}

interface ListAvatarProps {
  data?: AvatarItem[];
  size?: number;
  desc?: string;
}

export const ListAvatar: React.FC<ListAvatarProps> = (
  props: ListAvatarProps,
) => {
  const {data = [], size = width * 0.08, desc} = props;
  const moreThanThree = `+${data.length - 3}`;
  return (
    <>
      {data.length !== 0 && (
        <>
          <View style={styles.root}>
            {data?.map((val, i) => {
              if (i < 3) {
                return (
                  <View style={styles.root} key={i}>
                    <Avatar key={i} size={size} imgUri={val.uri || ''} />
                  </View>
                );
              }
            })}
            {data?.length > 3 && (
              <Text style={styles.text}>{moreThanThree}</Text>
            )}
          </View>
          <Gap height={8} />
        </>
      )}

      <View style={{width: '100%', maxWidth: '90%'}}>
        <Text style={styles.fullname} numberOfLines={2}>
          {desc}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingRight: widthResponsive(3),
    alignItems: 'center',
  },
  text: {
    color: color.Neutral[10],
    fontSize: normalize(15),
    fontFamily: font.InterMedium,
  },
  fullname: {
    fontSize: normalize(13),
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
  },
});
