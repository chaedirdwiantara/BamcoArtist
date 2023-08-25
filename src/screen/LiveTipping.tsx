import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Color from '../theme/Color';
import {AvatarProfile, Gap, ModalCustom, TopNavigation} from '../components';
import {ArrowLeftIcon, LiveIcon} from '../assets/icon';
import {useTranslation} from 'react-i18next';
import {heightResponsive, kFormatter, widthResponsive} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import Typography from '../theme/Typography';
import {mvs} from 'react-native-size-matters';
import initialname from '../utils/initialname';
import Font from '../theme/Font';
import RankCard from '../components/molecule/ListCard/RankCard';

export const LiveTipping = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [showModalEmpty, setShowModalEmpty] = useState<boolean>(false);
  const [showModalSession, setShowModalSession] = useState<boolean>(true);

  const handleBackAction = () => {
    navigation.goBack();
  };

  const infoProfileArtist = [
    {
      point: 4100,
      title: t('Musician.Label.Fans'),
    },
    {
      point: 18300,
      title: t('Musician.Label.Followers'),
    },
    {
      point: 91200,
      title: t('Musician.Label.Releases'),
    },
  ];

  const rank = [
    {
      rank: 1,
      username: 'leroy',
      credit: 56000,
      isYou: false,
    },
    {
      rank: 2,
      username: 'Jenkins',
      credit: 20000,
      isYou: false,
    },
    {
      rank: 3,
      username: 'Ahoi',
      credit: 10000,
      isYou: false,
    },
    {
      rank: 4,
      username: 'You!',
      credit: 10,
      isYou: true,
    },
  ];

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title={''}
        maxLengthTitle={20}
        itemStrokeColor={'white'}
        leftIcon={<ArrowLeftIcon />}
        leftIconAction={handleBackAction}
        rightIcon={<TopNavigation.LiveTippingNav />}
        rightIconAction={() => null}
        containerStyles={{
          paddingHorizontal: widthResponsive(20),
          borderBottomWidth: 0,
        }}
      />
      <View style={{flex: 1, paddingHorizontal: widthResponsive(24)}}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <AvatarProfile
              initialName={initialname('Sam Padbiri')}
              imgUri={'https://picsum.photos//201'}
              onPress={() => null}
            />
            <Gap height={heightResponsive(4)} />
            <View
              style={[
                styles.rowCenter,
                {
                  position: 'relative',
                },
              ]}>
              <View style={styles.containerIconLive}>
                <LiveIcon
                  width={widthResponsive(20)}
                  height={heightResponsive(20)}
                />
              </View>
              <Text
                style={[
                  Typography.Heading6,
                  {
                    color: Color.Neutral[10],
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                Sam Padbiri
              </Text>
            </View>

            <Text style={[Typography.Overline, {color: '#A1A1A1'}]}>
              @dreebsby
            </Text>
          </TouchableOpacity>

          <Gap height={heightResponsive(14)} />

          <Text
            style={[
              Typography.Overline,
              {
                textAlign: 'center',
                paddingHorizontal: widthResponsive(30),
                color: Color.Neutral[10],
              },
            ]}>
            British and Albanian singer and songwriter. Possessing a
            mezzo-soprano vocal range.
          </Text>

          <Gap height={heightResponsive(14)} />

          <View style={styles.rowCenter}>
            {infoProfileArtist.map((v, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={styles.itemStyle}
                  onPress={() => null}>
                  <Text style={styles.pointStyle}>
                    {isNaN(v?.point) ? '-' : kFormatter(v?.point, 1)}
                  </Text>
                  <Text style={styles.titleStyle}>{v.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Gap height={heightResponsive(18)} />

          <View style={styles.rowCenter}>
            {rank.map((v, i) => {
              return (
                <React.Fragment key={i}>
                  <RankCard
                    rank={v.rank}
                    username={v.username}
                    credit={v.credit}
                    isYou={v.isYou}
                  />
                  {i < 3 && <Gap width={widthResponsive(8)} />}
                </React.Fragment>
              );
            })}
          </View>
        </View>
      </View>

      <ModalCustom
        modalVisible={showModalEmpty}
        children={
          <View style={styles.modalContainer}>
            <View style={styles.imageModalContainer}>
              <Image source={require('../assets/image/wallet-tipping.png')} />
            </View>
            <Gap height={heightResponsive(16)} />
            <Text
              style={[Typography.Body2, {fontWeight: '700', color: '#FFF'}]}>
              {t('Modal.CreditEmpty.Title')}
            </Text>
            <Text style={[Typography.Overline, {color: '#BDBDBD'}]}>
              {t('Modal.CreditEmpty.Subtitle')}
            </Text>
            <Gap height={heightResponsive(20)} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
              }}>
              <TouchableOpacity onPress={() => setShowModalEmpty(false)}>
                <Text
                  style={[
                    Typography.Body2,
                    {fontWeight: '600', color: '#FFF'},
                  ]}>
                  {t('General.Dismiss')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('TopUpCredit')}>
                <Text
                  style={[
                    Typography.Body2,
                    {fontWeight: '600', color: '#FFF'},
                  ]}>
                  {t('General.Topup')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />

      <ModalCustom
        modalVisible={showModalSession}
        children={
          <View style={styles.modalContainer}>
            <View style={styles.imageModalContainer}>
              <Image source={require('../assets/image/glass-hour.png')} />
            </View>
            <Gap height={heightResponsive(16)} />
            <Text
              style={[Typography.Body2, {fontWeight: '700', color: '#FFF'}]}>
              {t('Modal.SessionEnd.Title')}
            </Text>
            <Text style={[Typography.Overline, {color: '#BDBDBD'}]}>
              {t('Modal.SessionEnd.Subtitle')}
            </Text>
            <Gap height={heightResponsive(20)} />
            <TouchableOpacity onPress={() => navigation.goBack()}>
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    position: 'relative',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: widthResponsive(10),
  },
  pointStyle: {
    fontFamily: Font.InterMedium,
    fontSize: mvs(14),
    color: Color.Neutral[10],
  },
  titleStyle: {
    fontFamily: Font.InterMedium,
    fontSize: mvs(10),
    color: Color.Dark[50],
  },
  textInter: {
    fontFamily: Font.InterRegular,
  },
  containerIconLive: {
    backgroundColor: '#FF68D6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthResponsive(2),
    borderRadius: 4,
    position: 'absolute',
    left: widthResponsive(-30),
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
