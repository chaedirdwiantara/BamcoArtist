import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Color from '../theme/Color';
import {AvatarProfile, Gap, ModalCustom, TopNavigation} from '../components';
import {ArrowLeftIcon, ChevronUp, LiveIcon} from '../assets/icon';
import {useTranslation} from 'react-i18next';
import {heightResponsive, kFormatter, widthResponsive} from '../utils';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import Typography from '../theme/Typography';
import {mvs} from 'react-native-size-matters';
import initialname from '../utils/initialname';
import Font from '../theme/Font';
import RankCard from '../components/molecule/ListCard/RankCard';
import Draggable from 'react-native-draggable';
import {useMusicianHook} from '../hooks/use-musician.hook';
import {useProfileHook} from '../hooks/use-profile.hook';
import {useCreditHook} from '../hooks/use-credit.hook';
import {ModalLoading} from '../components/molecule/ModalLoading/ModalLoading';

type LiveTippingProps = NativeStackScreenProps<RootStackParams, 'LiveTipping'>;

export const LiveTipping: FC<LiveTippingProps> = ({
  route,
  navigation,
}: LiveTippingProps) => {
  const uuid = route.params.id;
  const {t} = useTranslation();
  const {isLoadingMusician, dataDetailMusician, getDetailMusician} =
    useMusicianHook();
  const {dataCountProfile, getTotalCountProfile} = useProfileHook();
  const {creditCount, getCreditCount} = useCreditHook();

  const [showModalEmpty, setShowModalEmpty] = useState<boolean>(false);
  const [showModalSession, _setShowModalSession] = useState<boolean>(false);
  const [showMoney, setShowMoney] = useState<boolean>(true);
  const [opacityMoney, setOpacityMoney] = useState<number>(1);
  const [onSwipe, setOnSwipe] = useState<boolean>(false);
  const [isTop, setIsTop] = useState(true);
  const [showSwipeText, setShowSwipeText] = useState(true);
  const [credit, setCredit] = useState<number>(creditCount);
  const [counter, setCounter] = useState<number>(0);
  const [disabledSwipe, setDisabledSwipe] = useState<boolean>(creditCount <= 0);
  const [moneyBatchURL, setMoneyBatchURL] = useState<ImageSourcePropType>(
    require('../assets/image/money-batch.png'),
  );
  const [moneyURL, setMoneyURL] = useState<ImageSourcePropType>(
    require('../assets/image/money.png'),
  );
  const animatedValue = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    if (!showMoney) {
      setTimeout(() => {
        setShowMoney(true);
        setOpacityMoney(1);
        setOnSwipe(false);
      }, 50);
    }
  }, [showMoney]);

  useEffect(() => {
    if (counter >= 25 && counter < 50) {
      setMoneyBatchURL(require('../assets/image/money-batch-red.png'));
      setMoneyURL(require('../assets/image/money-red.png'));
    }
    if (counter >= 50) {
      setDisabledSwipe(true);
      setMoneyURL(require('../assets/image/money-onfire.png'));

      getCreditCount();
      // TODO: set after creditcount successfully changed or on background
      setTimeout(() => {
        setCounter(0);
        setDisabledSwipe(false);
        setMoneyBatchURL(require('../assets/image/money-batch.png'));
        setMoneyURL(require('../assets/image/money.png'));
      }, 3000);
    }
  }, [counter]);

  useEffect(() => {
    setCredit(creditCount);
  }, [creditCount]);

  const startAnimation = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsTop(!isTop);
    });
  };

  useEffect(() => {
    startAnimation(isTop ? 1 : 0);
  }, [isTop]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [heightResponsive(280), heightResponsive(300)],
    extrapolate: 'clamp',
  });

  useFocusEffect(
    useCallback(() => {
      getDetailMusician({id: uuid});
      getTotalCountProfile({uuid});
      getCreditCount();
    }, [uuid]),
  );

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title={''}
        maxLengthTitle={20}
        itemStrokeColor={'white'}
        leftIcon={<ArrowLeftIcon />}
        leftIconAction={handleBackAction}
        rightIcon={
          <TopNavigation.LiveTippingNav
            credit={credit}
            onPressCredit={() => navigation.navigate('TopUpCredit')}
            onPressGift={() => navigation.navigate('ClaimReward', {id: '1'})}
            onSwipe={onSwipe}
          />
        }
        rightIconAction={() => null}
        containerStyles={{
          paddingHorizontal: widthResponsive(20),
          borderBottomWidth: 0,
        }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingHorizontal: widthResponsive(24),
        }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <AvatarProfile
              initialName={initialname(dataDetailMusician?.fullname ?? '')}
              imgUri={
                dataDetailMusician?.imageProfileUrls.length !== 0
                  ? dataDetailMusician?.imageProfileUrls[1].image
                  : ''
              }
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
                {dataDetailMusician?.fullname}
              </Text>
            </View>

            <Text style={[Typography.Overline, {color: '#A1A1A1'}]}>
              {dataDetailMusician?.username}
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
            {dataDetailMusician?.about}
          </Text>

          <Gap height={heightResponsive(14)} />

          <View style={styles.rowCenter}>
            <TouchableOpacity style={styles.itemStyle} onPress={() => null}>
              <Text style={styles.pointStyle}>
                {isNaN(dataDetailMusician?.fans || 0)
                  ? '-'
                  : kFormatter(dataDetailMusician?.fans, 1)}
              </Text>
              <Text style={styles.titleStyle}>{t('Musician.Label.Fans')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemStyle} onPress={() => null}>
              <Text style={styles.pointStyle}>
                {isNaN(dataDetailMusician?.followers || 0)
                  ? '-'
                  : kFormatter(dataDetailMusician?.followers, 1)}
              </Text>
              <Text style={styles.titleStyle}>
                {t('Musician.Label.Followers')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemStyle} onPress={() => null}>
              <Text style={styles.pointStyle}>
                {isNaN(dataCountProfile?.countAlbumReleased || 0)
                  ? '-'
                  : kFormatter(dataCountProfile?.countAlbumReleased, 1)}
              </Text>
              <Text style={styles.titleStyle}>
                {t('Musician.Label.Releases')}
              </Text>
            </TouchableOpacity>
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

        <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
          <Image
            source={moneyBatchURL}
            style={
              {
                // width: width * 0.5,
              }
            }
            resizeMode="contain"
          />

          {showMoney && (
            <Draggable
              disabled={disabledSwipe}
              x={widthResponsive(50)}
              y={heightResponsive(-5)}
              minY={heightResponsive(-300)}
              maxY={heightResponsive(-5)}
              maxX={widthResponsive(50)}
              minX={widthResponsive(50)}
              onDragRelease={(event, ges, bound) => {
                if (event.nativeEvent.pageY < 400) {
                  setShowMoney(false);
                  setCredit(credit - 1);
                  setOnSwipe(true);
                  setCounter(counter + 1);
                }
              }}
              onDrag={(event, ges) => {
                if (showSwipeText) {
                  setShowSwipeText(false);
                }

                setOpacityMoney(0.7);
                // if (event.nativeEvent.pageY < 300) {
                //   setOpacityMoney(0.1);
                // } else if (event.nativeEvent.pageY < 400) {
                //   setOpacityMoney(0.3);
                // } else if (event.nativeEvent.pageY < 500) {
                //   setOpacityMoney(0.5);
                // } else if (event.nativeEvent.pageY < 600) {
                //   setOpacityMoney(0.7);
                // } else if (event.nativeEvent.pageY < 700) {
                //   setOpacityMoney(0.9);
                // }
              }}
              shouldReverse>
              {counter >= 50 && (
                <Image
                  source={require('../assets/image/fire.png')}
                  style={{
                    // width: width * 0.47,
                    position: 'absolute',
                    opacity: opacityMoney,
                    top: heightResponsive(-60),
                    left: widthResponsive(-25),
                  }}
                  resizeMode="contain"
                />
              )}

              <Image
                source={moneyURL}
                style={{
                  // width: width * 0.47,
                  position: 'absolute',
                  opacity: opacityMoney,
                }}
                resizeMode="contain"
              />
              {showSwipeText && (
                <View style={styles.containerAnimation}>
                  <Animated.View
                    style={[styles.square, {transform: [{translateY}]}]}>
                    <View style={{marginBottom: heightResponsive(-12)}}>
                      <ChevronUp />
                    </View>
                    <ChevronUp fill="#FFF" />
                    <Text
                      style={[
                        Typography.Subtitle2,
                        {color: Color.Neutral[10]},
                      ]}>
                      {t('LiveTipping.SwipeUp')}
                    </Text>
                  </Animated.View>
                </View>
              )}
            </Draggable>
          )}
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
              style={[
                Typography.Body2,
                {fontWeight: '700', color: '#FFF', textAlign: 'center'},
              ]}>
              {t('Modal.CreditEmpty.Title')}
            </Text>
            <Text
              style={[
                Typography.Overline,
                {color: '#BDBDBD', textAlign: 'center'},
              ]}>
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
              style={[
                Typography.Body2,
                {fontWeight: '700', color: '#FFF', textAlign: 'center'},
              ]}>
              {t('Modal.SessionEnd.Title')}
            </Text>
            <Text
              style={[
                Typography.Overline,
                {color: '#BDBDBD', textAlign: 'center'},
              ]}>
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
      <ModalLoading visible={isLoadingMusician} />
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
  containerAnimation: {
    position: 'absolute',
    bottom: 0,
  },
  square: {
    width: widthResponsive(200),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
