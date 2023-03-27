import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Gap} from '../../atom';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {color, font, typography} from '../../../theme';
import {ShowCreditType} from '../../../data/showCredit';
import {dateLongMonth} from '../../../utils/date-format';
import {DataDetailSong} from '../../../interface/song.interface';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';

interface ShowCreditProps {
  dataDetail: DataDetailSong;
  onPressGoBack: () => void;
}

const Content: React.FC<ShowCreditType> = ({title, content}) => {
  if (content.length > 0) {
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <Gap height={heightPercentage(15)} />
        {content.map((val, i) => {
          const lastIndex = i === content.length - 1;
          const newGapHeight = lastIndex ? 30 : 10;
          if (val === null) {
            return <Text>-</Text>;
          } else {
            return (
              <View key={i}>
                <Text
                  style={[
                    typography.Subtitle2,
                    {color: color.Neutral[10], fontFamily: font.InterRegular},
                  ]}>
                  {val}
                </Text>
                <Gap height={heightPercentage(newGapHeight)} />
              </View>
            );
          }
        })}
      </View>
    );
  }
};

export const ShowCreditContent: React.FC<ShowCreditProps> = ({
  dataDetail,
  onPressGoBack,
}) => {
  const {t} = useTranslation();
  const genre = dataDetail.album.genre ? [dataDetail.album.genre] : [];
  const dataShowCredit = [
    {
      title: t('Music.Credit.SingBy'),
      content: [dataDetail.musicianName],
    },
    {
      title: t('Music.Credit.Featuring'),
      content: dataDetail.album.featuringArtist.map(v => v.fullname),
    },
    {
      title: t('Music.Credit.Format'),
      content: ['Album'],
    },
    {
      title: t('Music.Credit.Label'),
      content: dataDetail.album.label,
    },
    {
      title: t('Music.Credit.Genre'),
      content: genre,
    },
    {
      title: t('Music.Credit.Release'),
      content: [dateLongMonth(dataDetail.album.releaseDate)],
    },
    {
      title: t('Music.Credit.Copyright'),
      content: [
        `© ${dataDetail.album.copyrightVisual.join(', ')}`,
        `℗ ${dataDetail.album.copyrightProducer.join(', ')}`,
        `® ${dataDetail.album.copyrightFans.join(', ')}`,
      ],
    },
  ];

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={dataDetail.title}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: heightPercentage(30)}}>
          {dataShowCredit.map((val, i) => (
            <Content key={i} title={t(val.title)} content={val.content} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    marginHorizontal: widthPercentage(20),
  },
  title: {
    fontSize: normalize(16),
    fontFamily: font.InterSemiBold,
    lineHeight: heightPercentage(20),
    letterSpacing: 0.15,
    color: color.Neutral[10],
  },
});
