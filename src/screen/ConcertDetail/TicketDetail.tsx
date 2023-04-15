import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {ArrowLeftIcon} from '../../assets/icon';
import {Gap, SsuDivider, TopNavigation} from '../../components';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import Font from '../../theme/Font';
import {
  heightPercentage,
  heightResponsive,
  normalize,
  widthPercentage,
} from '../../utils';
import Typography from '../../theme/Typography';
import TicketDescription from '../../components/molecule/EventDetail/TicketDescription';

type MerchDetailProps = NativeStackScreenProps<RootStackParams, 'TicketDetail'>;

export const TicketDetail: React.FC<MerchDetailProps> = ({
  route,
}: MerchDetailProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={t('Event.Concert.Details')}
          maxLengthTitle={20}
          itemStrokeColor={'white'}
          leftIcon={<ArrowLeftIcon />}
          leftIconAction={() => navigation.goBack()}
          containerStyles={{paddingHorizontal: widthPercentage(20)}}
        />
        <ScrollView>
          <View style={styles.descContainer}>
            <Text style={styles.title}>Tribune Silver (Seated Row 3)</Text>
            <Gap height={heightPercentage(4)} />
            <Text style={styles.price}>3,000 Credits</Text>
          </View>

          <SsuDivider />
          <View style={styles.descContainer}>
            <Text style={[styles.desc, {color: Color.Dark[50]}]}>
              Price already included tax and admin fee (20%)
            </Text>
            <Gap height={heightPercentage(16)} />
            <Text style={styles.desc}>Valid on selected dates</Text>
            <Gap height={heightPercentage(8)} />
            <Text style={styles.desc}>No reservation needed</Text>
          </View>
          <SsuDivider />
          <View style={styles.descContainer}>
            <Text style={[styles.title2, {color: Color.Neutral[10]}]}>
              Tickets are included
            </Text>
            <Text style={styles.desc}>Entrance ticket</Text>
          </View>
          <SsuDivider />
          <View style={styles.descContainer}>
            <TicketDescription duration={false} location={false} />
          </View>
          <SsuDivider />
          <View style={styles.descContainer}>
            <Text style={[styles.title2, {color: Color.Neutral[10]}]}>
              Exchange Ticket
            </Text>
            <Text style={styles.desc}>
              Show this ticket in your Transaction menu to the ticket booth in
              the main entrance venue
            </Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    position: 'relative',
  },
  swiperContainer: {
    position: 'relative',
  },
  title: {
    ...Typography.Subtitle2,
    color: Color.Neutral[10],
  },
  title2: {
    ...Typography.Subtitle2,
    color: Color.Dark[50],
    marginBottom: heightPercentage(12),
  },
  subtitle: {
    color: 'white',
    fontFamily: Font.InterMedium,
    fontSize: normalize(12),
    marginBottom: heightResponsive(12),
  },
  descContainer: {
    paddingHorizontal: widthPercentage(24),
    paddingVertical: heightPercentage(20),
  },
  desc: {
    ...Typography.Subtitle3,
    color: Color.Neutral[10],
  },
  price: {
    color: Color.Pink[2],
    ...Typography.Subtitle1,
  },
});
