import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {BlitzIcon} from '../../../../assets/icon';
import {DropDownFilter, Gap} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {DataDropDownType, dropDownFansGrowth} from '../../../../data/dropdown';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useTranslation} from 'react-i18next';
import {storage} from '../../../../hooks/use-storage.hook';
import {LineChart} from 'react-native-gifted-charts';
import {color, font} from '../../../../theme';
import GrowthCard from './GrowthCard';
import {mvs} from 'react-native-size-matters';

const FansGrowth = () => {
  const {getListDataFansAnalytic} = useAnalyticsHook();
  const {t} = useTranslation();
  const lang = storage.getString('lang');

  const {
    data: fansAnalyticData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('fans-analytic', () =>
    getListDataFansAnalytic({
      page: 1,
      perPage: 3,
    }),
  );

  const [selectedRange, setSelectedRange] = useState<DataDropDownType>({
    label: 'Home.Tab.Analytic.Fans.Filter.Range.Monthly',
    value: '1',
  });
  interface DataChart {
    value: number;
    hideDataPoint: boolean;
    label: String;
  }
  interface Chart {
    maxValue: number;
    beFan: string;
    beFanCompare: string;
    beFanProgress: 'improve' | 'regression' | 'same';
    fansEarn: string;
    fansEarnCompare: string;
    fansEarnProgress: 'improve' | 'regression' | 'same';
    data: DataChart[] | undefined;
  }

  const fansData: Chart = {
    maxValue: 100,
    beFan: '75%',
    beFanCompare: '4%',
    beFanProgress: 'improve',
    fansEarn: '25%',
    fansEarnCompare: '2%',
    fansEarnProgress: 'regression',
    data: [
      {
        value: 10,
        hideDataPoint: true,
        label: 'Jan',
      },
      {
        value: 23,
        hideDataPoint: true,
        label: '',
      },
      {
        value: 75,
        hideDataPoint: true,
        label: '',
      },
      {
        value: 65,
        hideDataPoint: true,
        label: '',
      },
      {
        value: 40,
        hideDataPoint: true,
        label: 'Feb',
      },
      {
        value: 96,
        hideDataPoint: true,
        label: '',
      },
      {
        value: 75,
        hideDataPoint: true,
        label: '',
      },
      {
        value: 65,
        hideDataPoint: true,
        label: '',
      },
      {
        value: 40,
        hideDataPoint: true,
        label: 'Mar',
      },
      {
        value: 50,
        hideDataPoint: true,
        label: '',
      },
      {
        value: 55,
        hideDataPoint: true,
        label: '',
      },
      {
        value: 65,
        hideDataPoint: true,
        label: '',
      },
      {
        value: 75,
        hideDataPoint: true,
        label: 'Apr',
      },
    ],
  };
  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <BlitzIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Fans.Main.Title')}
        </Text>
      </View>

      {/* DROPDOWN AREA */}
      <Gap height={10} />
      <View style={{width: 90, zIndex: 100}}>
        <DropDownFilter
          labelCaption={t(selectedRange.label)}
          dataFilter={dropDownFansGrowth}
          selectedMenu={setSelectedRange}
          leftPosition={
            lang === 'en' ? widthResponsive(-85) : widthResponsive(-85)
          }
          topPosition={widthResponsive(20)}
          containerStyle={styles.dropdownContainer}
          textCustomStyle={{color: color.Neutral[10], fontSize: mvs(11)}}
          iconColor={color.Neutral[10]}
          dropdownStyle={styles.dropdown}
        />
      </View>

      {/* CHART AREA */}
      <View style={{marginLeft: -7}}>
        <LineChart
          thickness={3}
          color={color.Pink[400]}
          maxValue={100}
          noOfSections={5}
          areaChart
          yAxisTextStyle={{color: color.Dark[100]}}
          // @ts-ignore TODO: HANDLE IT LATER
          data={fansData.data}
          curved
          startFillColor={color.Pink[400]}
          endFillColor={color.Dark[800]}
          startOpacity={0.4}
          endOpacity={0.5}
          spacing={38}
          backgroundColor="transparent"
          rulesColor={color.Dark[300]}
          rulesType="dash"
          rulesLength={widthResponsive(265)}
          initialSpacing={10}
          yAxisColor="transparent"
          xAxisColor="transparent"
          xAxisLabelTextStyle={{color: color.Neutral[20], marginLeft: 6}}
          dataPointsHeight={20}
          dataPointsWidth={20}
        />
      </View>

      {/* CARD AREA */}
      <View style={styles.cardContainer}>
        <GrowthCard
          number={fansData.beFan}
          desc={t('Home.Tab.Analytic.Fans.Growth.BeFan')}
          numberDiffs={fansData.beFanCompare}
          progress={fansData.beFanProgress}
        />
        <GrowthCard
          number={fansData.fansEarn}
          desc={t('Home.Tab.Analytic.Fans.Growth.FansEarn')}
          numberDiffs={fansData.fansEarnCompare}
          progress={fansData.fansEarnProgress}
        />
      </View>
    </View>
  );
};

export default FansGrowth;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
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
  dropdownContainer: {
    borderWidth: 1,
    borderColor: color.Dark[400],
    paddingHorizontal: widthResponsive(12),
    paddingVertical: widthResponsive(8),
    borderRadius: 4,
  },
  dropdown: {
    backgroundColor: color.Dark[800],
    borderWidth: 1,
    borderColor: color.Dark[400],
  },
});
