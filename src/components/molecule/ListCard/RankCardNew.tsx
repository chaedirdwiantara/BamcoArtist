import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {heightResponsive, widthResponsive, normalize} from '../../../utils';
import initialname from '../../../utils/initialname';
import {Gap} from '../../atom';
import {AvatarProfile} from '../AvatarProfile/AvatarProfile';
import {CoinDIcon, DefaultAvatar, RankStarIcon} from '../../../assets/icon';

interface RankInterface {
  rank: number;
  username: string;
  credit: string | number;
  isYou: boolean;
  avatar?: string;
}

const RankCardNew = (props: RankInterface) => {
  const {rank, username, credit, isYou, avatar} = props;

  const borderColor =
    rank === 1
      ? '#C4A436'
      : rank === 2
      ? '#AAC5E5'
      : rank === 3
      ? '#AF7257'
      : rank === 4
      ? '#423C2E'
      : 'transparent';

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={[
          styles.inner,
          {
            borderColor: isYou ? 'transparent' : borderColor,
          },
        ]}>
        <View
          style={{
            padding: widthResponsive(4),
            borderRadius: widthResponsive(100),
            shadowColor: isYou ? 'rgba(185, 44, 142, 0.4)' : 'transparent',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 1,
            shadowRadius: 5,
            elevation: 4,
          }}>
          <View
            style={{
              borderColor: borderColor,
              borderWidth: 1.5,
              borderRadius: widthResponsive(100),
            }}>
            <View
              style={{
                position: 'absolute',
                top: heightResponsive(-12),
                zIndex: 2,
                left: widthResponsive(7),
              }}>
              <RankStarIcon fill={borderColor} rank={rank} />
            </View>

            {avatar !== '' ? (
              <AvatarProfile
                initialName={initialname(username)}
                imgUri={avatar ?? ''}
                onPress={() => null}
                size={widthResponsive(30)}
              />
            ) : (
              <DefaultAvatar.MusicianIcon
                width={widthResponsive(30)}
                height={heightResponsive(30)}
              />
            )}
          </View>
        </View>

        <Gap height={heightResponsive(4)} />
        <Text numberOfLines={1} style={[styles.textInter, styles.title]}>
          {username}
        </Text>
        <Gap height={heightResponsive(2)} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.DarkBlue[100],
            paddingHorizontal: widthResponsive(5),
            borderRadius: widthResponsive(4),
          }}>
          <CoinDIcon width={widthResponsive(10)} />
          <Gap width={widthResponsive(3)} />
          <Text numberOfLines={1} style={[styles.textInter, styles.subtitle]}>
            {credit}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RankCardNew;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
    width: widthResponsive(100),
    paddingHorizontal: widthResponsive(8),
  },
  inner: {
    alignItems: 'center',
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
});
