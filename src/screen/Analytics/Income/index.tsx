import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {
  DollarSign,
  NormalCreditCard,
  PosCreditCard,
} from '../../../assets/icon';
import {heightResponsive, widthResponsive} from '../../../utils';
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

interface DataChart {
  value: number;
  label?: String;
}

const Income = () => {
  const {t} = useTranslation();
  const lang = storage.getString('lang');

  const [selectedType, setSelectedType] = useState<DataDropDownType>({
    label: 'Home.Tab.Analytic.Income.Filter.Type.All',
    value: '1',
  });
  const [selectedRange, setSelectedRange] = useState<DataDropDownType>({
    label: 'Home.Tab.Analytic.Income.Filter.Range.Monthly',
    value: '1',
  });

  const barData = [
    {
      value: 40,
      label: 'Jan',
    },
    {value: 20},

    {
      value: 50,
      label: 'Feb',
    },
    {value: 40},
    {
      value: 75,
      label: 'Mar',
    },
    {value: 25},
    {
      value: 30,
      label: 'Apr',
    },
    {value: 20},
    {
      value: 60,
      label: 'May',
    },
    {value: 40},
    {
      value: 65,
      label: 'Jun',
    },
    {value: 30},
  ];

  const filterBarData = (data: DataChart[]) => {
    return data.map((v: DataChart, i: number) => {
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
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <TopCard
          icon={<DollarSign />}
          bgIcon={Color.Success[400]}
          value="27.5K"
          text={t('Home.Tab.Analytic.Income.TopCard.Tip')}
        />
        <Gap width={widthResponsive(10)} />
        <TopCard
          icon={<PosCreditCard />}
          bgIcon={Color.Pink.new}
          value="5000"
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
            leftPosition={
              lang === 'en' ? widthResponsive(-103) : widthResponsive(-103)
            }
            topPosition={heightResponsive(20)}
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
            leftPosition={
              lang === 'en' ? widthResponsive(-91) : widthResponsive(-91)
            }
            topPosition={heightResponsive(20)}
            containerStyle={styles.dropdownContainer}
            textCustomStyle={{color: Color.Neutral[10], fontSize: mvs(11)}}
            iconColor={Color.Neutral[10]}
            dropdownStyle={styles.dropdown}
          />
        </View>

        <Gap height={8} />
        <Text style={styles.desc}>
          {selectedRange.value === '1'
            ? 'Last 6 months'
            : selectedRange.value === '2'
            ? 'Last 4 weeks'
            : 'Last 7 days'}
        </Text>
        <Gap height={4} />

        <View
          style={{
            marginBottom: heightResponsive(36),
            marginLeft: widthResponsive(-8),
          }}>
          <BarChart
            data={filterBarData(barData)}
            barWidth={8}
            spacing={widthResponsive(30)}
            roundedTop
            roundedBottom
            yAxisThickness={0}
            yAxisTextStyle={{color: Color.Dark[100]}}
            xAxisLabelTextStyle={{
              color: Color.Neutral[20],
              marginLeft: 3,
              top: heightResponsive(16),
            }}
            xAxisColor={Color.Dark[300]}
            xAxisType={'dash'}
            xAxisLength={widthResponsive(265)}
            noOfSections={3}
            maxValue={80}
            rulesColor={Color.Dark[300]}
            rulesType="dash"
            rulesLength={widthResponsive(265)}
            labelWidth={30}
          />
        </View>

        <Gap height={heightResponsive(20)} />

        <View>
          <BottomCard
            type="tip"
            numberAvg={'8,500'}
            descAvg={selectedRange.value}
            numberDiffsAvg={'5%'}
            progressAvg={'improve'}
            numberEarned={'8,300'}
            numberDiffsEarned={'2%'}
            progressEarned={'regression'}
            descEarned={selectedRange.value}
          />
          <BottomCard
            type="subscription"
            numberAvg={'8,500'}
            descAvg={selectedRange.value}
            numberDiffsAvg={'5%'}
            progressAvg={'improve'}
            numberEarned={'8,300'}
            numberDiffsEarned={'2%'}
            progressEarned={'regression'}
            descEarned={selectedRange.value}
          />
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
