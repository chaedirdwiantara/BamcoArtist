import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {PlayPinkIcon} from '../../../assets/icon';
import {Gap} from '../../atom';
import {useTranslation} from 'react-i18next';
import {TopFansAnalyticData} from '../../../interface/analythic.interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import MusiciansListCard from '../ListCard/MusiciansListCard';
import {widthResponsive} from '../../../utils';
import EmptyStateAnalytic from '../EmptyState/EmptyStateAnalytic';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';

interface TopFansProps {
  title: string;
  topFansData: TopFansAnalyticData[] | undefined;
  activeLink?: boolean;
  emptyState: string;
}

const TopFans: FC<TopFansProps> = (props: TopFansProps) => {
  const {title, topFansData, activeLink, emptyState} = props;
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <PlayPinkIcon />
          <Gap width={12} />
          <Text style={styles.value}>{title}</Text>
        </View>
        {topFansData && topFansData.length > 5 && activeLink ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('YourTopFansScreen')}>
            <Text style={styles.link}>
              {t('Home.Tab.Analytic.Fans.TopFans.Link')}
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      <Gap height={23} />
      {topFansData && topFansData.length > 0 ? (
        topFansData.map((item, index) => (
          <MusiciansListCard
            key={index}
            musicianNum={(index + 1).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            onPressMore={() => {}}
            activeMore={false}
            onPressImage={() =>
              navigation.navigate('OtherUserProfile', {id: item.uuid})
            }
            musicianName={item.fullname}
            imgUri={item.image[0]?.image}
            point={item.totalPoint.toString()}
            containerStyles={{marginBottom: widthResponsive(12)}}
          />
        ))
      ) : (
        <EmptyStateAnalytic caption={emptyState} />
      )}
    </View>
  );
};

export default TopFans;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontFamily: font.InterRegular,
    fontSize: mvs(18),
    fontWeight: '600',
    color: color.Neutral[20],
    lineHeight: mvs(28),
  },
  link: {
    fontFamily: font.InterRegular,
    fontSize: mvs(11),
    fontWeight: '500',
    color: color.Success[400],
    lineHeight: mvs(28),
  },
});
