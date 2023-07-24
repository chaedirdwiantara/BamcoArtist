import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {DropDownFilter} from '../V2';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';
import {LineChart} from 'react-native-gifted-charts';
import GrowthCard from './GrowthCard';
import {DataDropDownType} from '../../../data/dropdown';
import {DataChart} from '../../../interface/analythic.interface';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {storage} from '../../../hooks/use-storage.hook';

interface LineAreaChartProps {
  labelCaption: string;
  dataFilter: DataDropDownType[];
  selectedMenu: React.Dispatch<React.SetStateAction<DataDropDownType>>;
  description: string;
  maxValue: number;
  chartData: DataChart[];
  cardOneValue: number | string;
  cardOneDesc: string;
  cardOneAvgStreamCompare: string;
  cardOneAvgProgress: 'improve' | 'regression' | 'same';
  cardTwoValue: number | string;
  cardTwoDesc: string;
  cardTwoAvgStreamCompare: string;
  cardTwoAvgProgress: 'improve' | 'regression' | 'same';
  type: 'Monthly' | 'Weekly' | 'Daily';
  noOfLines?: number;
}

const LineAreaChart: FC<LineAreaChartProps> = (props: LineAreaChartProps) => {
  const {
    labelCaption,
    dataFilter,
    selectedMenu,
    description,
    maxValue,
    chartData,
    cardOneValue,
    cardOneDesc,
    cardOneAvgStreamCompare,
    cardOneAvgProgress,
    cardTwoValue,
    cardTwoDesc,
    cardTwoAvgStreamCompare,
    cardTwoAvgProgress,
    type,
    noOfLines,
  } = props;
  const lang = storage.getString('lang');

  return (
    <View>
      {/* DROPDOWN AREA */}
      <View style={{width: 90, zIndex: 100}}>
        <DropDownFilter
          labelCaption={labelCaption}
          dataFilter={dataFilter}
          selectedMenu={selectedMenu}
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

      <Gap height={8} />
      <Text style={styles.desc}>{description}</Text>
      <Gap height={4} />

      {/* CHART AREA */}
      <View style={{marginLeft: -7}}>
        <LineChart
          thickness={3}
          color={color.Pink[400]}
          maxValue={maxValue}
          noOfSections={5}
          areaChart
          yAxisTextStyle={{color: color.Dark[100]}}
          // @ts-ignore TODO: HANDLE IT LATER
          data={chartData}
          startFillColor={color.Pink[400]}
          endFillColor={color.Dark[800]}
          startOpacity={0.4}
          endOpacity={0.5}
          spacing={type === 'Weekly' ? 80 : 55}
          backgroundColor="transparent"
          rulesColor={color.Dark[300]}
          rulesType="dash"
          rulesLength={widthResponsive(265)}
          initialSpacing={type === 'Weekly' ? 25 : 12}
          yAxisColor="transparent"
          xAxisColor={color.Dark[300]}
          xAxisLength={widthPercentageToDP('70%')}
          xAxisType={'dash'}
          xAxisLabelTextStyle={{color: color.Neutral[20], marginLeft: 15}}
          dataPointsHeight={20}
          dataPointsWidth={20}
        />
      </View>

      {/* CARD AREA */}
      <View style={styles.cardContainer}>
        <GrowthCard
          number={cardOneValue}
          desc={cardOneDesc}
          numberDiffs={cardOneAvgStreamCompare}
          progress={cardOneAvgProgress}
          noOfLines={noOfLines}
        />
        <GrowthCard
          number={cardTwoValue}
          desc={cardTwoDesc}
          numberDiffs={cardTwoAvgStreamCompare}
          progress={cardTwoAvgProgress}
          noOfLines={noOfLines}
        />
      </View>
    </View>
  );
};

export default LineAreaChart;

const styles = StyleSheet.create({
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
  desc: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(9),
    color: color.Neutral[10],
  },
});
