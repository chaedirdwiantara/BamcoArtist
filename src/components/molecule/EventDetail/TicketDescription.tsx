import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {t} from 'i18next';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import Typography from '../../../theme/Typography';
import {
  heightPercentage,
  normalize,
  heightResponsive,
  widthPercentage,
} from '../../../utils';
import {Gap} from '../../atom';
import {LocationIcon} from '../../../assets/icon';

interface TicketDescriptionType {
  duration?: boolean;
  location?: boolean;
}

const TicketDescription: React.FC<TicketDescriptionType> = props => {
  const {duration = true, location = true} = props;
  return (
    <>
      {/* Description */}
      <Text style={styles.subtitle}>{t('Event.Description')}</Text>
      <View style={styles.row}>
        <Text style={[styles.desc, styles.descLeft]}>
          {t('Event.Concert.Date')}
        </Text>
        <Text style={[styles.desc, styles.descRight]}>3 March 2023</Text>
      </View>
      <Gap height={heightPercentage(6)} />
      <View style={styles.row}>
        <Text style={[styles.desc, styles.descLeft]}>
          {t('Event.Concert.Time')}
        </Text>
        <Text style={[styles.desc, styles.descRight]}>02 PM - 03 PM</Text>
      </View>
      <Gap height={heightPercentage(6)} />
      <View style={styles.row}>
        <Text style={[styles.desc, styles.descLeft]}>
          {t('Event.Concert.Venue')}
        </Text>
        <Text style={[styles.desc, styles.descRight]}>Jakarta Velodrome</Text>
      </View>
      <Gap height={heightPercentage(6)} />
      <View style={styles.row}>
        <Text style={[styles.desc, styles.descLeft]}>
          {t('Event.Concert.OpenGate')}
        </Text>
        <Text style={[styles.desc, styles.descRight]}>11 AM</Text>
      </View>
      <Gap height={heightPercentage(22)} />
      {/* Duration */}
      {duration && (
        <>
          <Text style={styles.subtitle}>{t('Event.Concert.Duration')}</Text>
          <View style={styles.row}>
            <Text style={[styles.desc, styles.descRight]}>2 Hours</Text>
          </View>
          <Gap height={heightPercentage(22)} />
        </>
      )}

      {/* Location */}
      {location && (
        <>
          <Text style={styles.subtitle}>{t('Event.Concert.Location')}</Text>
          <View style={styles.row}>
            <LocationIcon
              width={widthPercentage(20)}
              height={widthPercentage(20)}
            />
            <Gap width={widthPercentage(8)} />
            <Text
              style={[
                styles.desc,
                styles.descRight,
                {color: Color.Success[400]},
              ]}>
              Jln Kenangan, Gang Rindu, Desa Ingin Bertem
            </Text>
          </View>
        </>
      )}
    </>
  );
};

export default TicketDescription;

const styles = StyleSheet.create({
  subtitle: {
    color: 'white',
    fontFamily: Font.InterMedium,
    fontSize: normalize(12),
    marginBottom: heightResponsive(12),
  },
  desc: {
    ...Typography.Subtitle3,
    color: Color.Neutral[50],
  },
  descContainer: {
    paddingHorizontal: widthPercentage(24),
    paddingVertical: heightPercentage(20),
  },
  row: {
    flexDirection: 'row',
  },
  descLeft: {
    width: '35%',
  },
  descRight: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
