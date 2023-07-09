import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {heightResponsive, widthResponsive} from '../../../utils';
import Color from '../../../theme/Color';
import {font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../../components';
import {ArrowDownIcon, ArrowUpGreenIcon} from '../../../assets/icon';
import {useTranslation} from 'react-i18next';

interface BottomCardProps {
  type: 'tip' | 'subscription';
  numberAvg: string;
  numberDiffsAvg: string;
  descAvg: string;
  progressAvg: 'improve' | 'regression' | 'same';
  numberEarned: string;
  numberDiffsEarned: string;
  descEarned: string;
  progressEarned: 'improve' | 'regression' | 'same';
}

interface PercentageProps {
  number: string;
  numberDiffs: string;
  desc: string;
  progress: 'improve' | 'regression' | 'same';
}

const Percentage = (props: PercentageProps) => {
  const {number, desc, numberDiffs, progress} = props;

  return (
    <View>
      <Text style={styles.subtitle}>{desc}</Text>
      <Gap height={heightResponsive(4)} />
      <View style={styles.percentage}>
        <Text style={styles.textNum}>{number ?? 0}</Text>
        <Gap width={widthResponsive(2)} />
        {progress === 'improve' ? (
          <ArrowUpGreenIcon />
        ) : progress === 'regression' ? (
          <ArrowDownIcon />
        ) : null}
        <Text
          style={[
            styles.numberDiffs,
            {
              color:
                progress === 'improve' ? Color.Green[200] : Color.Error[500],
            },
          ]}>
          {progress !== 'same' ? numberDiffs : ''}
        </Text>
      </View>
    </View>
  );
};

const BottomCard = (props: BottomCardProps) => {
  const {t} = useTranslation();
  const {
    type,
    numberAvg,
    descAvg,
    numberDiffsAvg,
    progressAvg,
    numberEarned,
    numberDiffsEarned,
    progressEarned,
    descEarned,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: type === 'tip' ? '#7EF6AB' : '#F67DEB'},
          ]}></View>
        <Gap width={widthResponsive(8)} />
        <Text style={styles.title}>{type}</Text>
      </View>
      <Gap height={heightResponsive(12)} />
      <View style={styles.titleContainer}>
        <Percentage
          desc={t('Home.Tab.Analytic.Income.BottomCard.Avg', {
            range: t(
              descAvg === '1'
                ? 'Home.Tab.Analytic.Income.Filter.Range.Monthly'
                : descAvg === '2'
                ? 'Home.Tab.Analytic.Income.Filter.Range.Weekly'
                : 'Home.Tab.Analytic.Income.Filter.Range.Daily',
            ),
          })}
          number={numberAvg}
          numberDiffs={numberDiffsAvg}
          progress={progressAvg}
        />
        <Gap width={widthResponsive(25)} />
        <Percentage
          desc={t('Home.Tab.Analytic.Income.BottomCard.Earned', {
            range: t(
              descEarned === '1'
                ? 'Home.Tab.Analytic.Income.Filter.Range.Month'
                : descEarned === '2'
                ? 'Home.Tab.Analytic.Income.Filter.Range.Week'
                : 'Home.Tab.Analytic.Income.Filter.Range.Today',
            ),
          })}
          number={numberEarned}
          numberDiffs={numberDiffsEarned}
          progress={progressEarned}
        />
      </View>
    </View>
  );
};

export default BottomCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: heightResponsive(16),
    borderTopWidth: 1,
    borderColor: Color.Dark[400],
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  iconContainer: {
    width: widthResponsive(16),
    height: heightResponsive(16),
    borderRadius: 2,
  },
  title: {
    fontFamily: font.InterSemiBold,
    fontWeight: '500',
    fontSize: mvs(11),
    color: Color.Neutral[10],
    textTransform: 'capitalize',
  },
  subtitle: {
    fontFamily: font.InterSemiBold,
    fontWeight: '500',
    fontSize: mvs(9),
    color: Color.Dark[100],
  },
  value: {
    fontFamily: font.InterSemiBold,
    fontWeight: '500',
    fontSize: mvs(13),
    color: Color.Neutral[10],
  },
  percentage: {flexDirection: 'row', alignItems: 'center'},
  textNum: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    fontWeight: '600',
    color: Color.Neutral[10],
  },
  numberDiffs: {
    fontFamily: font.InterMedium,
    fontSize: mvs(13),
  },
});
