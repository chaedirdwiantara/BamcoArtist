import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {widthResponsive} from '../../../../utils';
import {color, font} from '../../../../theme';
import {ChatIcon} from '../../../../assets/icon';
import * as Progress from 'react-native-progress';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';

const FansActiveInteract = () => {
  const {getDataFansActiveInteract} = useAnalyticsHook();
  const {t} = useTranslation();
  const {
    data: interactData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('fans-interact-analytic', () => getDataFansActiveInteract());
  interface activeInteractProps {
    value: string;
  }

  return (
    <View style={styles.container}>
      <ChatIcon />
      <Gap width={12} />
      <View style={{flex: 1}}>
        <Text style={styles.value}>
          {interactData?.data ? interactData.data.percentage : 0}%
        </Text>

        <Text style={styles.desc}>
          {t('Home.Tab.Analytic.Fans.FansInteract')}
        </Text>
        <Gap height={4} />
        {interactData?.data && (
          <Progress.Bar
            progress={interactData?.data.percentage / 100}
            width={null}
            height={widthResponsive(12)}
            animated={true}
            borderWidth={0}
            color={color.Pink.linear}
            unfilledColor={color.Dark[300]}
            borderRadius={10}
          />
        )}
      </View>
    </View>
  );
};

export default FansActiveInteract;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
    flexDirection: 'row',
  },
  value: {
    fontFamily: font.InterRegular,
    fontSize: mvs(28),
    fontWeight: '600',
    color: color.Neutral[20],
    lineHeight: mvs(28),
  },
  desc: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    fontWeight: '500',
    color: color.Neutral[20],
    lineHeight: mvs(28),
  },
});
