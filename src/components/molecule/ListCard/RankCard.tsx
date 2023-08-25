import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {heightResponsive, widthResponsive, normalize} from '../../../utils';
import initialname from '../../../utils/initialname';
import {Gap} from '../../atom';
import {AvatarProfile} from '../AvatarProfile/AvatarProfile';

interface RankInterface {
  rank: number;
  username: string;
  credit: string | number;
  isYou: boolean;
}

const RankCard = (props: RankInterface) => {
  const {rank, username, credit, isYou} = props;

  const bgColor =
    rank === 1
      ? isYou
        ? '#917F34'
        : '#C4A43666'
      : rank === 2
      ? isYou
        ? '#9BA8BB'
        : '#E0EEFF66'
      : rank === 3
      ? isYou
        ? '#675246'
        : '#6C4D3F66'
      : '#3749EA';

  const borderColor =
    rank === 1
      ? '#C4A436'
      : rank === 2
      ? '#AAC5E5'
      : rank === 3
      ? '#AF7257'
      : '#748FB1';

  const dividerColor =
    rank === 1
      ? '#FFDE67'
      : rank === 2
      ? '#AAC5E5'
      : rank === 3
      ? '#AF7357'
      : '#748FB1';

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={[
          styles.inner,
          {
            backgroundColor: bgColor,
            borderColor: isYou ? 'transparent' : borderColor,
          },
        ]}>
        <Text numberOfLines={1} style={[styles.textInter, styles.title]}>
          {rank === 1 ? 'Top #' : rank === 2 || rank === 3 ? 'Rank #' : '#'}
          {rank}
        </Text>
        <Gap height={heightResponsive(4)} />
        <AvatarProfile
          initialName={initialname(username)}
          imgUri={'https://picsum.photos//201'}
          onPress={() => null}
          size={widthResponsive(30)}
        />
        <Gap height={heightResponsive(4)} />
        <Text numberOfLines={1} style={[styles.textInter, styles.subtitle]}>
          {username}
        </Text>
        <Gap height={heightResponsive(2)} />
        <View
          style={[
            styles.divider,
            {
              backgroundColor: dividerColor,
            },
          ]}></View>
        <Gap height={heightResponsive(4)} />
        <Text numberOfLines={1} style={[styles.textInter, styles.subtitle]}>
          {credit}
        </Text>
        <Text numberOfLines={1} style={[styles.textInter, styles.credit]}>
          Credits
        </Text>
      </TouchableOpacity>
      {isYou && (
        <>
          <View
            style={[
              styles.shadow,
              {width: '95%', backgroundColor: bgColor, opacity: 0.85},
            ]}></View>
          <View
            style={[
              styles.shadow,
              {width: '90%', backgroundColor: bgColor, opacity: 0.65},
            ]}></View>
        </>
      )}
    </View>
  );
};

export default RankCard;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
  },
  inner: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: heightResponsive(10),
    paddingHorizontal: widthResponsive(4),
  },
  textInter: {
    fontFamily: Font.InterRegular,
  },
  title: {
    color: Color.Neutral[10],
    fontWeight: '600',
    fontSize: normalize(10),
  },
  subtitle: {
    color: Color.Neutral[10],
    fontWeight: '600',
    fontSize: normalize(8),
  },
  divider: {height: heightResponsive(1), width: widthResponsive(14)},
  credit: {
    color: Color.Neutral[10],
    fontWeight: '400',
    fontSize: normalize(6),
  },
  shadow: {
    alignSelf: 'center',
    height: heightResponsive(4),
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});
