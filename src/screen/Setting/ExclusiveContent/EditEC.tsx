import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {mvs} from 'react-native-size-matters';

import {
  heightPercentage,
  widthPercentage,
  width,
  kFormatter,
} from '../../../utils';
import {Button} from '../../../components';
import {color, font, typography} from '../../../theme';
import {DataExclusiveResponse} from '../../../interface/setting.interface';
import {PhotoPlaylist} from '../../../components/molecule/PlaylistContent/PhotoPlaylist';
import {useTranslation} from 'react-i18next';

interface ItemProps {
  title: string;
  description: string;
}

interface CreateProps {
  data: DataExclusiveResponse;
  onPress: () => void;
}

const ListItem: React.FC<ItemProps> = ({title, description}) => {
  return (
    <View style={{marginTop: heightPercentage(15)}}>
      <Text style={[typography.Overline, styles.label]}>{title}</Text>
      <Text style={[typography.Body3, styles.content]}>{description}</Text>
    </View>
  );
};

export const EditEC: React.FC<CreateProps> = ({data, onPress}) => {
  const {t} = useTranslation();
  const priceWeekly = data.pricingPlans.filter(
    val => val.durationUnit === 'weekly',
  );
  const priceMonthly = data.pricingPlans.filter(
    val => val.durationUnit === 'monthly',
  );
  const priceYearly = data.pricingPlans.filter(
    val => val.durationUnit === 'yearly',
  );
  const weekly =
    priceWeekly.length > 0
      ? kFormatter(priceWeekly[0].price) +
        ' Credit/' +
        t('ExclusiveContent.Week')
      : '-';
  const monthly =
    priceMonthly.length > 0
      ? kFormatter(priceMonthly[0].price) +
        ' Credit/' +
        t('ExclusiveContent.Month')
      : '-';
  const yearly =
    priceYearly.length > 0
      ? kFormatter(priceYearly[0].price) +
        ' Credit/' +
        t('ExclusiveContent.Year')
      : '-';

  return (
    <View>
      <Text
        style={[
          typography.Button2,
          {color: color.Neutral[50], marginVertical: heightPercentage(8)},
        ]}>
        {t('Setting.Exclusive.Label.Basic')}
      </Text>
      <View style={{marginBottom: heightPercentage(5)}}>
        <Text
          style={[
            typography.Caption,
            {color: color.Neutral[50], marginVertical: heightPercentage(7)},
          ]}>
          {t('Setting.Exclusive.Label.Cover')}
        </Text>
        <PhotoPlaylist
          uri={data.coverImage}
          showIcon={false}
          containerStyles={styles.cover}
          iconStyles={{width: widthPercentage(22), height: widthPercentage(22)}}
        />

        <ListItem
          title={t('Setting.Exclusive.Label.Title')}
          description={data.title}
        />
        <ListItem
          title={t('Setting.Exclusive.Label.Description')}
          description={data.description}
        />

        <Text
          style={[
            typography.Button2,
            {color: color.Neutral[50], marginTop: heightPercentage(20)},
          ]}>
          {t('Setting.Exclusive.Label.Pricing')}
        </Text>

        <ListItem
          title={t('Setting.Exclusive.Label.Price')}
          description={
            data.pricingPlans[0].durationUnit === 'weekly'
              ? weekly
              : data.pricingPlans[0].durationUnit === 'monthly'
              ? monthly
              : yearly
          }
        />
      </View>

      <Button
        label={t('Btn.Edit')}
        onPress={onPress}
        containerStyles={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    width: widthPercentage(88),
    marginTop: 0,
    marginBottom: 0,
  },
  label: {
    color: color.Neutral[50],
    maxWidth: width * 0.9,
  },
  content: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    paddingTop: heightPercentage(5),
    maxWidth: width * 0.9,
  },
  title: {
    fontSize: mvs(13),
    color: color.Success[500],
    fontFamily: font.InterSemiBold,
    marginTop: heightPercentage(20),
  },
  length: {
    fontSize: mvs(12),
    marginTop: heightPercentage(5),
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 36),
    marginVertical: heightPercentage(25),
    alignSelf: 'center',
  },
});
