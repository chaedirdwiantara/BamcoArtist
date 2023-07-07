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
import {Chart} from '../../../interface/analythic.interface';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {storage} from '../../../hooks/use-storage.hook';

interface LineAreaChartProps {
  labelCaption: string;
  dataFilter: DataDropDownType[];
  selectedMenu: React.Dispatch<React.SetStateAction<DataDropDownType>>;
  fansData: Chart;
  growthDescOne: string;
  growthDescTwo: string;
  noOfLines?: number;
}

const LineAreaChart: FC<LineAreaChartProps> = (props: LineAreaChartProps) => {
  const {
    labelCaption,
    dataFilter,
    selectedMenu,
    fansData,
    growthDescOne,
    growthDescTwo,
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
      <Text style={styles.desc}>{fansData?.description}</Text>
      <Gap height={4} />

      {/* CHART AREA */}
      <View style={{marginLeft: -7}}>
        <LineChart
          thickness={3}
          color={color.Pink[400]}
          maxValue={fansData.maxValue}
          noOfSections={5}
          areaChart
          yAxisTextStyle={{color: color.Dark[100]}}
          // @ts-ignore TODO: HANDLE IT LATER
          data={fansData?.data}
          startFillColor={color.Pink[400]}
          endFillColor={color.Dark[800]}
          startOpacity={0.4}
          endOpacity={0.5}
          spacing={55}
          backgroundColor="transparent"
          rulesColor={color.Dark[300]}
          rulesType="dash"
          rulesLength={widthResponsive(265)}
          initialSpacing={10}
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
          number={fansData?.fansEarn}
          desc={growthDescOne ?? ''}
          numberDiffs={fansData?.fansEarnCompare}
          progress={fansData?.fansEarnProgress}
          noOfLines={noOfLines}
        />
        <GrowthCard
          number={fansData?.beFan}
          desc={growthDescTwo ?? ''}
          numberDiffs={fansData?.beFanCompare}
          progress={fansData?.beFanProgress}
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
