import {View, StyleSheet, ScrollView, Text} from 'react-native';
import React from 'react';
import {Gap, TopNavigation} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import {useTranslation} from 'react-i18next';
import {heightPercentage, widthPercentage} from '../../utils';
import {ClockIcon, WalletIcon} from '../../assets/icon';
import {mvs} from 'react-native-size-matters';

type PromoDetailProps = NativeStackScreenProps<RootStackParams, 'PromoDetail'>;

export const PromoDetail: React.FC<PromoDetailProps> = ({
  navigation,
}: PromoDetailProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Promo.Detail.Title')}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={Color.Neutral[10]}
      />
      <View>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Cashback 400 Credits</Text>
        </View>
        <View style={styles.topContainer}>
          <View
            style={[styles.descContainer, {justifyContent: 'space-between'}]}>
            <View style={styles.descContainer}>
              <ClockIcon stroke="#FF69D2" />
              <Text style={styles.desc}>{t('Promo.Detail.Time')}</Text>
            </View>
            <Text style={styles.detail}> 24 march 2023</Text>
          </View>
          <Gap height={heightPercentage(10)} />
          <View
            style={[styles.descContainer, {justifyContent: 'space-between'}]}>
            <View style={styles.descContainer}>
              <WalletIcon />
              <Text style={styles.desc}>{t('Promo.Detail.Minimum')}</Text>
            </View>
            <Text style={styles.detail}> 2000 Credits</Text>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          paddingHorizontal: widthPercentage(24),
          paddingVertical: heightPercentage(16),
        }}>
        <Text style={styles.tncTitle}>{t('Promo.Detail.TnC')}</Text>
        <View>
          <View style={styles.tncDesc}>
            <Text style={styles.tncText}>1.</Text>
            <Gap width={widthPercentage(4)} />
            <Text style={styles.tncText}>
              This promo is only applicable for purchases made on 24 March 2023
              at our online store.
            </Text>
          </View>
          <View style={styles.tncDesc}>
            <Text style={styles.tncText}>2.</Text>
            <Gap width={widthPercentage(4)} />
            <Text style={styles.tncText}>
              The promo is valid for minimum purchase of 2,000 SSU Credits.
            </Text>
          </View>
          <View style={styles.tncDesc}>
            <Text style={styles.tncText}>3.</Text>
            <Gap width={widthPercentage(4)} />
            <Text style={styles.tncText}>
              The promo is valid for maximum discount of 500 SSU Credits.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PromoDetail;

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
    paddingVertical: heightPercentage(16),
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentage(24),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  title: {
    fontSize: mvs(18),
    fontFamily: 'Inter-Medium',
    color: Color.Neutral[10],
  },
  descContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  desc: {
    fontFamily: 'Inter-Medium',
    fontSize: mvs(13),
    color: Color.Neutral[10],
    marginHorizontal: widthPercentage(6),
  },
  detail: {
    color: Color.Success[400],
  },
  tncTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: mvs(13),
    color: Color.Neutral[10],
    marginBottom: heightPercentage(16),
  },
  tncDesc: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: heightPercentage(16),
  },
  tncText: {
    fontFamily: 'Inter-Regular',
    fontSize: mvs(13),
    color: '#E2E2E2',
  },
});
