import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, ModalCustom, TopNavigation} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import {useTranslation} from 'react-i18next';
import {
  heightPercentage,
  heightResponsive,
  width,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import {ClockIcon} from '../../assets/icon';
import {mvs} from 'react-native-size-matters';
import {dataPromo} from '../../data/Action/promo';
import Typography from '../../theme/Typography';

type ClaimRewardProps = NativeStackScreenProps<RootStackParams, 'ClaimReward'>;

export const ClaimReward: React.FC<ClaimRewardProps> = ({
  navigation,
  route,
}: ClaimRewardProps) => {
  const {t} = useTranslation();
  const promo = dataPromo.find(data => data.id === route?.params?.id);

  const [claimed, setClaimed] = useState<boolean>(false);
  const [modalClaimed, setModalClaimed] = useState<boolean>(false);

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('ClaimReward.Title')}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={Color.Neutral[10]}
      />
      <View>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{promo?.title}</Text>
        </View>
        <View style={styles.topContainer}>
          <View
            style={[styles.descContainer, {justifyContent: 'space-between'}]}>
            <View style={styles.descContainer}>
              <ClockIcon stroke="#FF69D2" />
              <Text style={styles.desc}>{t('ClaimReward.ValidUntil')}</Text>
            </View>
            <Text style={styles.detail}> {promo?.end}</Text>
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
          {promo?.tnc.map((item, index) => {
            return (
              <View style={styles.tncDesc}>
                <Text style={styles.tncText}>{index + 1}.</Text>
                <Gap width={widthPercentage(4)} />
                <Text style={styles.tncText}>{item}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: 'center',
          paddingBottom: heightResponsive(40),
          paddingTop: heightResponsive(20),
        }}>
        <Button
          label={claimed ? t('ClaimReward.Claimed') : t('ClaimReward.Claim')}
          onPress={() => {
            setClaimed(true);
            setModalClaimed(true);
          }}
          containerStyles={claimed ? styles.buttonDisabled : styles.button}
          disabled={claimed}
        />
      </View>

      <ModalCustom
        modalVisible={modalClaimed}
        children={
          <View style={styles.modalContainer}>
            <View style={styles.imageModalContainer}>
              <Image source={require('../../assets/image/claim-reward.png')} />
            </View>
            <Gap height={heightResponsive(16)} />
            <Text
              style={[
                Typography.Body2,
                {fontWeight: '700', color: '#FFF', textAlign: 'center'},
              ]}>
              {t('Modal.ClaimReward.Title')}
            </Text>
            <Text
              style={[
                Typography.Overline,
                {color: '#BDBDBD', textAlign: 'center'},
              ]}>
              {t('Modal.ClaimReward.Subtitle')}
            </Text>
            <Gap height={heightResponsive(20)} />
            <TouchableOpacity onPress={() => setModalClaimed(false)}>
              <Text
                style={[Typography.Body2, {fontWeight: '600', color: '#FFF'}]}>
                {t('Btn.Back')}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default ClaimReward;

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
  button: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 40),
    backgroundColor: '#FF68D6',
  },
  buttonDisabled: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 40),
    backgroundColor: '#8794AD',
  },
  modalContainer: {
    backgroundColor: Color.Dark[800],
    width: '100%',
    maxWidth: widthResponsive(260),
    alignItems: 'center',
    borderRadius: widthResponsive(10),
    paddingHorizontal: widthResponsive(16),
    paddingBottom: heightResponsive(16),
    paddingTop: heightResponsive(32),
  },
  imageModalContainer: {
    backgroundColor: '#20242C',
    padding: widthResponsive(20),
    borderRadius: 100,
    width: widthResponsive(120),
    height: heightResponsive(120),
    alignItems: 'center',
  },
});
