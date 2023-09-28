import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EngagementCard from '../../../components/molecule/LineAreaChart/EngagementCard';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {PencilIcon} from '../../../assets/icon';
import {DropDownFilter, Gap} from '../../../components';
import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../hooks/use-analytics.hook';
import {mvs} from 'react-native-size-matters';
import {DataDropDownType, dropDownAlbumRange} from '../../../data/dropdown';
import {storage} from '../../../hooks/use-storage.hook';

const PostEngagement = () => {
  const {t} = useTranslation();
  const {getPostEngagement} = useAnalyticsHook();
  const lang = storage.getString('lang');
  const {
    data,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('analytic-postEngagement', () =>
    getPostEngagement({
      interval:
        t(selectedRange.label) === 'Monthly'
          ? 'monthly'
          : t(selectedRange.label) === 'Weekly'
          ? 'weekly'
          : t(selectedRange.label) === 'Daily'
          ? 'daily'
          : t(selectedRange.label) === 'All Time'
          ? 'all_time'
          : '',
    }),
  );

  const [selectedRange, setSelectedRange] = useState<DataDropDownType>({
    label: 'Home.Tab.Analytic.Album.Filter.Range.Alltime',
    value: '1',
  });

  useEffect(() => {
    if (selectedRange) {
      refetch();
    }
  }, [selectedRange]);

  const Data = data?.data;
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
      {/* DROPDOWN AREA */}
      <View style={{width: 90, zIndex: 100}}>
        <DropDownFilter
          labelCaption={t(selectedRange.label)}
          dataFilter={dropDownAlbumRange}
          selectedMenu={setSelectedRange}
          leftPosition={widthResponsive(31.5)}
          topPosition={widthResponsive(18)}
          bottomPosition={widthResponsive(-22)}
          containerStyle={styles.dropdownContainer}
          textCustomStyle={{color: color.Neutral[10], fontSize: mvs(11)}}
          iconColor={color.Neutral[10]}
          dropdownStyle={styles.dropdown}
        />
      </View>
      <Gap height={10} />
      <View style={styles.cardContainer}>
        <EngagementCard
          number={Data && Data?.avgView !== '' ? Data?.avgView : '0'}
          desc={t('Home.Tab.Analytic.Post.Engagement.AvgView')}
          numberDiffs={Data ? Data?.avgViewProgress : ''}
          progress={Data ? Data?.avgViewCompare : 'same'}
          noOfLines={1}
        />
        <EngagementCard
          number={Data && Data?.avgLiked !== '' ? Data?.avgLiked : '0'}
          desc={t('Home.Tab.Analytic.Post.Engagement.AvgLiked')}
          numberDiffs={Data ? Data?.avgLikedProgress : ''}
          progress={Data ? Data?.avgLikedCompare : 'same'}
          noOfLines={1}
        />
      </View>

      <Gap height={16} />

      <View style={styles.cardContainer}>
        <EngagementCard
          number={Data && Data.avgComment !== '' ? Data?.avgComment : '0'}
          desc={t('Home.Tab.Analytic.Post.Engagement.AvgReply')}
          numberDiffs={Data ? Data?.avgCommentProgress : ''}
          progress={Data ? Data?.avgCommentCompare : 'same'}
          noOfLines={1}
        />
        <EngagementCard
          number={Data && Data?.avgShared !== '' ? Data?.avgShared : '0'}
          desc={t('Home.Tab.Analytic.Post.Engagement.AvgShared')}
          numberDiffs={Data ? Data?.avgSharedProgress : ''}
          progress={Data ? Data.avgSharedCompare : 'same'}
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
