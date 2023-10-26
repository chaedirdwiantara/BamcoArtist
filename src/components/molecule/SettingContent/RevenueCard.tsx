import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Avatar, Button, Gap, SsuDivider} from '../../atom';
import {typography} from '../../../theme';
import {
  heightPercentage,
  heightResponsive,
  toCurrency,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import Color from '../../../theme/Color';
import {useTranslation} from 'react-i18next';
import {CoinDIcon} from '../../../assets/icon';
import {mvs} from 'react-native-size-matters';

interface RevenueProps {
  id: string;
  avatarUri: string;
  name: string;
  username: string;
  credit: number;
  time: string;
  type?: 'beam' | 'subs';
  isAppreciate: number;
  onClickAppreciate: (id: string) => void;
}

export const RevenueCard: React.FC<RevenueProps> = ({
  id,
  name,
  avatarUri = 'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
  credit,
  time,
  type,
  isAppreciate,
  onClickAppreciate,
}) => {
  const {t} = useTranslation();
  return (
    <>
      <View style={{marginTop: heightResponsive(15)}}>
        <View style={styles.root}>
          <View style={styles.header}>
            <Avatar size={widthResponsive(32)} imgUri={avatarUri} />
            <View style={{marginLeft: widthResponsive(10)}}>
              <Text style={[typography.Subtitle1, {color: Color.Neutral[10]}]}>
                {name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[typography.Caption, {color: Color.Neutral[10]}]}>
                  {type === 'beam'
                    ? t('General.BeamedYou')
                    : t('General.StartSub')}
                </Text>
                <Gap width={widthResponsive(2)} />
                <View style={{flexDirection: 'row'}}>
                  <CoinDIcon width={widthResponsive(14)} />
                  <Gap width={widthResponsive(4)} />
                  <Text
                    style={[
                      typography.Caption,
                      {color: Color.Pink[2], fontWeight: '600'},
                    ]}>
                    {toCurrency(credit, {withFraction: false})} Credit
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Gap width={widthResponsive(10)} />
          <Button
            onPress={() => (isAppreciate === 1 ? null : onClickAppreciate(id))}
            label={
              isAppreciate === 1
                ? t('General.Appreciated')
                : t('General.Appreciate')
            }
            containerStyles={
              isAppreciate === 1 ? styles.buttonDisabled : styles.button
            }
            textStyles={styles.buttonText}
          />
        </View>
        <Text
          style={[
            typography.Caption,
            {
              marginLeft: widthResponsive(40),
              marginTop: heightResponsive(6),
              color: Color.Dark[50],
            },
          ]}>
          {time}
        </Text>
      </View>
      <Gap height={heightResponsive(12)} />
      <SsuDivider />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.9,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    width: '70%',
  },
  dropdown: {
    width: widthPercentage(123),
    marginLeft: widthPercentage(-113),
    marginTop: heightPercentage(-8),
  },
  containerDetail: {
    marginLeft: widthPercentage(42),
    marginTop: heightPercentage(10),
  },
  credit: {
    color: Color.Pink.linear,
  },
  button: {
    width: width * 0.21,
    aspectRatio: heightPercentage(80 / 30),
    backgroundColor: Color.Pink.linear,
  },
  buttonDisabled: {
    width: width * 0.21,
    aspectRatio: heightPercentage(80 / 30),
    backgroundColor: '#35435B',
  },
  buttonText: {
    fontSize: mvs(10),
  },
});
