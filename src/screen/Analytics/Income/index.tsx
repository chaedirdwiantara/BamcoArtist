import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {
  DollarSign,
  NormalCreditCard,
  PosCreditCard,
} from '../../../assets/icon';
import {heightResponsive, kFormatter, widthResponsive} from '../../../utils';
import {DropDownFilter, Gap} from '../../../components';
import Color from '../../../theme/Color';
import TopCard from './TopCard';
import {useTranslation} from 'react-i18next';
import {
  DataDropDownType,
  dropDownIncomeRange,
  dropDownIncomeType,
} from '../../../data/dropdown';
import {storage} from '../../../hooks/use-storage.hook';
import BottomCard from './BottomCard';
import {BarChart} from 'react-native-gifted-charts';
import {useAnalyticsHook} from '../../../hooks/use-analytics.hook';
import {useQuery} from 'react-query';
import {
  IncomeDataChart,
  IncomeDataJoin,
} from '../../../interface/analythic.interface';

const Income = () => {
  const {t} = useTranslation();
  const lang = storage.getString('lang');

  const {getIncome} = useAnalyticsHook();

  const [selectedType, setSelectedType] = useState<DataDropDownType>({
    label: 'Home.Tab.Analytic.Income.Filter.Type.All',
    value: '1',
  });
  const [selectedRange, setSelectedRange] = useState<DataDropDownType>({
    label: 'Home.Tab.Analytic.Income.Filter.Range.Monthly',
    value: '1',
  });
  const [dataChart, setDataChart] = useState<IncomeDataJoin>();

  const {data: incomeData} = useQuery(
    `income-analytic/${selectedRange.label}`,
    () =>
      getIncome(
        selectedRange.value === '1'
          ? 'monthly'
          : selectedRange.value === '2'
          ? 'weekly'
          : 'daily',
      ),
  );

  useEffect(() => {
    if (selectedType.value === '1') setDataChart(incomeData?.all);
    else if (selectedType.value === '2') setDataChart(incomeData?.tips);
    else setDataChart(incomeData?.subs);
  }, [incomeData, selectedType]);

  const filterBarData = (data: IncomeDataChart[] | undefined) => {
    if (data && data?.length > 0) {
      return data.map((v: IncomeDataChart, i: number) => {
        if (selectedType.value === '1') {
          if (i === 0 || i % 2 === 0) {
            return {
              ...v,
              spacing: 4,
              frontColor: '#7EF6AB',
            };
          } else {
            return {
              ...v,
              frontColor: '#F67DEB',
            };
          }
        } else if (selectedType.value === '2') {
          return {
            ...v,
            frontColor: '#7EF6AB',
          };
        } else {
          return {
            ...v,
            frontColor: '#F67DEB',
          };
        }
      });
    }
    return [];
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <TopCard
          icon={<DollarSign />}
          bgIcon={Color.Success[400]}
          value={
            incomeData?.totalTips
              ? incomeData?.totalTips?.toString().length > 4
                ? kFormatter(incomeData?.totalTips, 1)
                : incomeData?.totalTips
              : 0
          }
          text={t('Home.Tab.Analytic.Income.TopCard.Tip')}
        />
        <Gap width={widthResponsive(10)} />
        <TopCard
          icon={<PosCreditCard />}
          bgIcon={Color.Pink.new}
          value={
            incomeData?.totalSubs
              ? incomeData?.totalSubs?.toString().length > 4
                ? kFormatter(incomeData?.totalSubs, 1)
                : incomeData?.totalSubs
              : 0
          }
          text={t('Home.Tab.Analytic.Income.TopCard.Subs')}
        />
      </View>

      <Gap height={heightResponsive(20)} />

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <NormalCreditCard />
          </View>
          <Gap width={widthResponsive(10)} />
          <Text style={styles.title}>
            {t('Home.Tab.Analytic.Income.Main.Title')}
          </Text>
        </View>
        <View style={{flexDirection: 'row', zIndex: 100}}>
          <DropDownFilter
            labelCaption={t(selectedType.label)}
            dataFilter={dropDownIncomeType}
            selectedMenu={setSelectedType}
            leftPosition={widthResponsive(13.5)}
            topPosition={widthResponsive(18)}
            bottomPosition={widthResponsive(-22)}
            containerStyle={styles.dropdownContainer}
            textCustomStyle={{color: Color.Neutral[10], fontSize: mvs(11)}}
            iconColor={Color.Neutral[10]}
            dropdownStyle={styles.dropdown}
          />
          <Gap width={widthResponsive(12)} />
          <DropDownFilter
            labelCaption={t(selectedRange.label)}
            dataFilter={dropDownIncomeRange}
            selectedMenu={setSelectedRange}
            leftPosition={widthResponsive(26)}
            topPosition={widthResponsive(18)}
            bottomPosition={widthResponsive(-22)}
            containerStyle={styles.dropdownContainer}
            textCustomStyle={{color: Color.Neutral[10], fontSize: mvs(11)}}
            iconColor={Color.Neutral[10]}
            dropdownStyle={styles.dropdown}
          />
        </View>

        <Gap height={8} />
        <Text style={styles.desc}>{dataChart?.description}</Text>
        <Gap height={4} />

        <View
          style={{
            marginBottom: heightResponsive(36),
            marginLeft: widthResponsive(-8),
          }}>
          <BarChart
            data={filterBarData(dataChart?.data)}
            barWidth={8}
            spacing={widthResponsive(35)}
            roundedTop
            roundedBottom
            yAxisThickness={0}
            yAxisTextStyle={{color: Color.Dark[100]}}
            xAxisLabelTextStyle={{
              color: Color.Neutral[20],
              marginLeft:
                selectedType.value === '1' && selectedRange.value !== '2'
                  ? 3
                  : selectedType.value !== '1' && selectedRange.value === '2'
                  ? -3
                  : 0,
              top: heightResponsive(10),
              fontSize: mvs(9),
              fontWeight: '600',
            }}
            xAxisColor={Color.Dark[300]}
            xAxisType={'dash'}
            xAxisLength={widthResponsive(265)}
            noOfSections={3}
            maxValue={dataChart?.maxValue}
            rulesColor={Color.Dark[300]}
            rulesType="dash"
            rulesLength={widthResponsive(265)}
            labelWidth={50}
          />
        </View>

        <Gap height={heightResponsive(20)} />

        <View>
          {(selectedType.value === '1' || selectedType.value === '2') && (
            <BottomCard
              type="tip"
              descAvg={selectedRange.value}
              numberAvg={dataChart?.tipAvg || ''}
              numberDiffsAvg={dataChart?.tipAvgCompare || ''}
              progressAvg={dataChart?.tipAvgProgress || 'same'}
              numberEarned={dataChart?.tipEarned || ''}
              numberDiffsEarned={dataChart?.tipEarnedCompare || ''}
              progressEarned={dataChart?.tipEarnedProgress || 'same'}
              descEarned={selectedRange.value}
            />
          )}

          {(selectedType.value === '1' || selectedType.value === '3') && (
            <BottomCard
              type="subscription"
              descAvg={selectedRange.value}
              numberAvg={dataChart?.subsAvg || ''}
              numberDiffsAvg={dataChart?.subsAvgCompare || ''}
              progressAvg={dataChart?.subsAvgProgress || 'same'}
              numberEarned={dataChart?.subsEarned || ''}
              numberDiffsEarned={dataChart?.subsEarnedCompare || ''}
              progressEarned={dataChart?.subsEarnedProgress || 'same'}
              descEarned={selectedRange.value}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default Income;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  iconContainer: {
    width: widthResponsive(32),
    height: heightResponsive(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: Color.Pink.new,
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(18),
    color: color.Neutral[10],
  },
  subtitle: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(11),
    color: color.Neutral[10],
    marginLeft: widthResponsive(40),
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: color.Dark[400],
    paddingHorizontal: widthResponsive(12),
    paddingVertical: heightResponsive(8),
    borderRadius: 4,
  },
  dropdown: {
    backgroundColor: Color.Dark[800],
    borderWidth: 1,
    borderColor: color.Dark[400],
  },
  desc: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(9),
    color: color.Neutral[10],
  },
});
