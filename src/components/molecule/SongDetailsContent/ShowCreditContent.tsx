import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Gap} from '../../atom';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {
  ArrowLeftIcon,
  CopyrightFansIcon,
  CopyrightProducerIcon,
  CopyrightVisualIcon,
} from '../../../assets/icon';
import {color, font, typography} from '../../../theme';
import {dateLongMonth} from '../../../utils/date-format';
import {DataDetailSong} from '../../../interface/song.interface';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';

interface ShowCreditProps {
  dataDetail: DataDetailSong;
  onPressGoBack: () => void;
}

const ItemContent = ({title, content}: {title: string; content: string[]}) => {
  const {t} = useTranslation();
  const copyrightIcon = [
    <CopyrightVisualIcon />,
    <CopyrightProducerIcon />,
    <CopyrightFansIcon />,
  ];

  if (content.length > 0) {
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <Gap height={heightPercentage(15)} />
        {content.map((val, i) => {
          const lastIndex = i === content.length - 1;
          const newGapHeight = lastIndex ? 30 : 10;
          const copyrightSection = title === t('Music.Credit.Copyright');
          if (val === null) {
            return <Text>-</Text>;
          } else if (copyrightSection) {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                key={i}>
                {copyrightIcon[i]}
                <Text
                  style={[
                    typography.Subtitle2,
                    {color: color.Neutral[10], fontFamily: font.InterRegular},
                  ]}>
                  {val}
                </Text>
                <Gap height={heightPercentage(30)} />
              </View>
            );
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
  const genre = dataDetail.album.genre ? [dataDetail.album.genre.name] : [];
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
      title: t('Music.Credit.Writer'),
      content: dataDetail.songWriter,
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
      content: [dateLongMonth(dataDetail.album.publishedDate)],
    },
    {
      title: t('Music.Credit.Copyright'),
      content: [
        `${dataDetail.album.copyrightVisual.join(', ')}`,
        `${dataDetail.album.copyrightProducer.join(', ')}`,
        `${dataDetail.album.copyrightFans.join(', ')}`,
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
        <View style={{marginVertical: heightPercentage(30)}}>
          {dataShowCredit.map((val, i) => (
            <View key={i}>
              {ItemContent({
                title: val.title,
                content: val.content,
              })}
            </View>
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
