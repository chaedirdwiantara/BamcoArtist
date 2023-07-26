import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';
import {DataDropDownType, dropDownFansGrowth} from '../../../../data/dropdown';
import {MusicPinkIcon} from '../../../../assets/icon';
import {Gap, LineAreaChart} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';

interface WhoListenProps {
  songId: string;
}

const WhoListenSong: FC<WhoListenProps> = (props: WhoListenProps) => {
  const {getWhoListenSong} = useAnalyticsHook();
  const {t} = useTranslation();

  const {songId} = props;

  const {
    data,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('analytic-whoListenSong', () =>
    getWhoListenSong({
      interval:
        t(selectedRange.label) === 'Monthly'
          ? 'monthly'
          : t(selectedRange.label) === 'Weekly'
          ? 'weekly'
          : t(selectedRange.label) === 'Daily'
          ? 'daily'
          : '',
      songID: songId,
    }),
  );

  const [selectedRange, setSelectedRange] = useState<DataDropDownType>({
    label: 'Home.Tab.Analytic.Fans.Filter.Range.Monthly',
    value: '1',
  });

  useEffect(() => {
    if (selectedRange) {
      refetch();
    }
  }, [selectedRange]);

  const whoListenData = data?.data;

  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <MusicPinkIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Album.DetailSong.WhoListen.Title')}
        </Text>
      </View>
      {/* BODY AREA */}
      {whoListenData ? (
        <LineAreaChart
          labelCaption={t(selectedRange.label)}
          dataFilter={dropDownFansGrowth}
          selectedMenu={setSelectedRange}
          description={whoListenData.description}
          maxValue={whoListenData.maxValue}
          chartData={whoListenData.diagramData}
          cardOneValue={whoListenData.fansAvgStream}
          cardOneDesc={`${t(
            'Home.Tab.Analytic.Album.Listeners.Growth.FanStream',
          )} ${t(selectedRange.label)}`}
          cardOneAvgStreamCompare={whoListenData.fansAvgStreamCompared}
          cardOneAvgProgress={whoListenData.fansAvgStreamPogress}
          cardTwoValue={whoListenData.fansStream}
          cardTwoDesc={`${t(
            'Home.Tab.Analytic.Album.Listeners.Growth.AvgListener',
          )} ${t(selectedRange.label)}`}
          cardTwoAvgStreamCompare={whoListenData.fansStreamCompared}
          cardTwoAvgProgress={whoListenData.fansStreamProgress}
          type={t(selectedRange.label)}
          noOfLines={2}
        />
      ) : null}
    </View>
  );
};

export default WhoListenSong;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(18),
    color: color.Neutral[10],
  },
});
