import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EngagementCard from '../../../components/molecule/LineAreaChart/EngagementCard';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {PencilIcon} from '../../../assets/icon';
import {Gap} from '../../../components';
import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../hooks/use-analytics.hook';
import {mvs} from 'react-native-size-matters';

const PostEngagement = () => {
  const {t} = useTranslation();
  // TODO: ENABLE LATER
  //   const {getPostEngagement} = useAnalyticsHook();
  //   const {
  //     data: engagementRate,
  //     isLoading: queryDataLoading,
  //     isError,
  //     refetch,
  //   } = useQuery('analytic-postEngagement', () =>
  //     getPostEngagement({
  //       page: 1,
  //       perPage: 5,
  //     }),
  //   );
  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <PencilIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Post.Engagement.Title')}
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <EngagementCard
          number={'2000'}
          desc={'Avg view per post'}
          numberDiffs={'5%'}
          progress={'improve'}
          noOfLines={1}
        />
        <EngagementCard
          number={'160'}
          desc={'Avg liked per post'}
          numberDiffs={'4%'}
          progress={'regression'}
          noOfLines={1}
        />
      </View>

      <View style={styles.cardContainer}>
        <EngagementCard
          number={'2000'}
          desc={'Avg view per post'}
          numberDiffs={'5%'}
          progress={'improve'}
          noOfLines={1}
        />
        <EngagementCard
          number={'160'}
          desc={'Avg liked per post'}
          numberDiffs={'4%'}
          progress={'regression'}
          noOfLines={1}
        />
      </View>
    </View>
  );
};

export default PostEngagement;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(18),
    color: color.Neutral[10],
  },
});
