import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Gap} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {MusicPink2Icon, PlayPinkIcon} from '../../../../assets/icon';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {storage} from '../../../../hooks/use-storage.hook';

const ListenerLikes = () => {
  const {getListenerLike} = useAnalyticsHook();
  const {t} = useTranslation();
  const lang = storage.getString('lang');

  const {
    data: listenerLikesData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('analytic-listenerLikes', () => getListenerLike({}));

  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <PlayPinkIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Album.ListenerLikes.Title')}
        </Text>
      </View>
      {/* BODY AREA */}
      <View></View>
    </View>
  );
};

export default ListenerLikes;

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
