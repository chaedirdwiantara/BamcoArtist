import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Gap} from '../../atom';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {color, font, typography} from '../../../theme';
import {DataDetailSong} from '../../../interface/song.interface';
import {dataShowCredit, ShowCreditType} from '../../../data/showCredit';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';

interface ShowCreditProps {
  dataDetail: DataDetailSong | null;
  onPressGoBack: () => void;
}

const Content: React.FC<ShowCreditType> = ({title, content}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Gap height={heightPercentage(15)} />
      {content.map((val, i) => {
        const lastIndex = i === content.length - 1;
        const newGapHeight = lastIndex ? 30 : 10;
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
      })}
    </View>
  );
};

export const ShowCreditContent: React.FC<ShowCreditProps> = ({
  dataDetail,
  onPressGoBack,
}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Thunder"
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
