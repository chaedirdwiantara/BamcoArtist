import {View, StyleSheet} from 'react-native';
import React from 'react';
import {TopNavigation} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import {useTranslation} from 'react-i18next';
import {heightPercentage, widthPercentage} from '../../utils';
import TrackStatus from '../../components/atom/Tracking/TrackStatus';
import DetailStatusTrack from '../../components/atom/Tracking/DetailStatus';

type TrackProps = NativeStackScreenProps<RootStackParams, 'Track'>;

export const Track: React.FC<TrackProps> = ({navigation}: TrackProps) => {
  const {t} = useTranslation();

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Tracking.Title')}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={Color.Neutral[10]}
      />
      <View>
        <TrackStatus />
      </View>
      <DetailStatusTrack />
    </View>
  );
};

export default Track;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    paddingVertical: heightPercentage(16),
    paddingHorizontal: widthPercentage(24),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  tabSpacer: {
    borderWidth: 1,
    borderColor: Color.Neutral[10],
    marginHorizontal: widthPercentage(10),
  },
});
