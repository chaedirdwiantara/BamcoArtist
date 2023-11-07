import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Linking,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Color from '../../theme/Color';
import {heightResponsive, width, widthResponsive} from '../../utils';
import {
  Gap,
  ModalCustom,
  SsuDivider,
  TabFilter,
  TopNavigation,
} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '../../theme/Typography';
import {ArrowLeftIcon, LiveIcon, LocationIcon} from '../../assets/icon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {useTranslation} from 'react-i18next';
import LineUp from './LineUp';
import TopTiper from './TopTiper';
import dayjs from 'dayjs';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {useEventHook} from '../../hooks/use-event.hook';
import {useFocusEffect} from '@react-navigation/native';
import {profileStorage} from '../../hooks/use-storage.hook';
import {Image} from 'react-native';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;
type EventDetailProps = NativeStackScreenProps<RootStackParams, 'EventDetail'>;

export const EventDetail: React.FC<EventDetailProps> = ({
  route,
  navigation,
}: EventDetailProps) => {
  const {id} = route.params;
  const {t} = useTranslation();
  const user = profileStorage();
  const {
    useEventDetail,
    useEventLineUp,
    useEventTopTipper,
    useEventCheckGeneratedTopupVoucher,
  } = useEventHook();

  const [scrollEffect, setScrollEffect] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filterTab] = useState([
    {filterName: 'Event.Detail.LineUp'},
    {filterName: 'Event.Detail.TopTiper'},
  ]);
  const [showModalTopup, setShowModaltopup] = useState<boolean>(false);

  const filterDataTab = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 1;
    setScrollEffect(scrolled);
  };

  const onClickMap = () => {
    const url = dataDetail?.data?.urlGoogle;
    Linking.openURL(url ?? '');
  };
  const handleBackAction = () => {
    navigation.goBack();
  };

  const {
    data: dataLineUp,
    refetch: refetchLineUp,
    isLoading: isLoadingLineUp,
    isRefetching: isRefetchingLineUp,
  } = useEventLineUp(id);

  const {
    data: dataTopTipper,
    refetch: refetchTopTipper,
    isLoading: isLoadingTopTipper,
    isRefetching: isRefetchingTopTipper,
  } = useEventTopTipper(id);

  const {
    data: dataDetail,
    refetch: refetchDetail,
    isLoading: isLoadingDetail,
    isRefetching: isRefetchingDetail,
  } = useEventDetail(id);

  const {data: dataVoucher, refetch: refetchVoucher} =
    useEventCheckGeneratedTopupVoucher({
      userUUID: user?.uuid ?? '',
      userType: 'musician',
      eventId: id,
    });

  useFocusEffect(
    useCallback(() => {
      refetchLineUp();
      refetchDetail();
      refetchTopTipper();
      refetchVoucher();
    }, []),
  );

  return (
    <View style={styles.root}>
      {scrollEffect && (
        <TopNavigation.Type1
          type="event detail"
          title={t('Event.Detail.Title') ?? ''}
          maxLengthTitle={20}
          itemStrokeColor={'white'}
          leftIcon={<ArrowLeftIcon />}
          leftIconAction={handleBackAction}
          containerStyles={styles.containerStickyHeader}
          rightIcon={
            <TopNavigation.EventDetailNav
              onPressGift={() => navigation.navigate('ListVoucher')}
              isGenerated={true}
              onPressVoucher={() => setShowModaltopup(true)}
            />
          }
          rightIconAction={() => null}
        />
      )}
      <ScrollView
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingDetail}
            onRefresh={refetchDetail}
            onLayout={e => console.log(e.nativeEvent)}
            tintColor="transparent"
            colors={['transparent']}
            style={{backgroundColor: 'transparent'}}
          />
        }>
        {isRefetchingDetail && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}

        <View style={styles.slide}>
          <ImageBackground
            style={{width: '100%', height: 400}}
            source={{
              uri: dataDetail?.data?.imageCover?.[0]?.image,
            }}>
            <LinearGradient
              colors={['#00000000', Color.Dark[800]]}
              style={{height: '100%', width: '100%'}}>
              <TopNavigation.Type4
                title={t('Event.Detail.Title') ?? ''}
                maxLengthTitle={20}
                itemStrokeColor={'white'}
                leftIcon={<ArrowLeftIcon />}
                leftIconAction={handleBackAction}
                containerStyles={{
                  borderBottomColor: 'transparent',
                  paddingHorizontal: widthResponsive(24),
                }}
                rightIcon={
                  <TopNavigation.EventDetailNav
                    onPressGift={() => navigation.navigate('ListVoucher')}
                    isGenerated={true}
                    onPressVoucher={() => setShowModaltopup(true)}
                  />
                }
              />
            </LinearGradient>
          </ImageBackground>
        </View>

        <View style={styles.content}>
          {dataDetail?.data?.status === 'live' && (
            <>
              <View style={styles.containerIconLive}>
                <LiveIcon
                  width={widthResponsive(20)}
                  height={heightResponsive(20)}
                />
                <Gap width={widthResponsive(4)} />
                <Text
                  style={[
                    Typography.Body3,
                    {color: Color.Neutral[10], textTransform: 'capitalize'},
                  ]}>
                  Live
                </Text>
              </View>
              <Gap height={heightResponsive(6)} />
            </>
          )}

          <Text
            style={[
              Typography.Heading5,
              {
                color: Color.Neutral[10],
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            {dataDetail?.data?.name}
          </Text>
          <Gap height={heightResponsive(6)} />
          <Text
            style={[
              Typography.Body1,
              {color: Color.Success[500], textTransform: 'capitalize'},
            ]}>
            {`${dataDetail?.data?.locationCity}, ${dayjs(
              dataDetail?.data?.startDate,
            ).format('D MMMM YYYY')}`}
          </Text>
          <Gap height={heightResponsive(6)} />
          <Text style={[{color: '#79859C', fontStyle: 'italic'}]}>
            {dataDetail?.data?.fullAddress}
          </Text>
          <Gap height={heightResponsive(10)} />
          <TouchableOpacity onPress={onClickMap} style={styles.map}>
            <LocationIcon
              width={widthResponsive(18)}
              stroke={Color.Pink.linear}
            />
            <Gap width={widthResponsive(4)} />
            <Text
              style={[
                Typography.Body4,
                {color: Color.Pink.linear, textTransform: 'uppercase'},
              ]}>
              View Location on map
            </Text>
          </TouchableOpacity>

          <SsuDivider
            containerStyle={{
              paddingTop: heightResponsive(20),
              paddingBottom: heightResponsive(10),
            }}
          />

          <TabFilter.Type1
            filterData={filterTab}
            onPress={filterDataTab}
            selectedIndex={selectedIndex}
            translation={true}
            flatlistContainerStyle={{
              width: 'auto',
            }}
          />

          {filterTab[selectedIndex].filterName === 'Event.Detail.LineUp' ? (
            <LineUp
              dataLineUp={dataLineUp?.data}
              isLoading={isLoadingLineUp || isRefetchingLineUp}
              eventId={id}
              endDate={dataDetail?.data?.endDate ?? ''}
            />
          ) : (
            <TopTiper
              dataTipper={dataTopTipper?.data}
              isLoading={isLoadingTopTipper || isRefetchingTopTipper}
              eventId={id}
            />
          )}
        </View>
      </ScrollView>

      <ModalCustom
        modalVisible={showModalTopup}
        children={
          <View style={styles.modalContainer}>
            <View style={styles.imageModalContainer}>
              <Image source={require('../../assets/image/topup.png')} />
              <Gap height={heightResponsive(6)} />
              <Text
                style={[
                  Typography.Body4,
                  {fontWeight: '500', color: '#FED843', textAlign: 'center'},
                ]}>
                540 {t('TopUp.Transaction.Detail.Credit')}
              </Text>
            </View>
            <Gap height={heightResponsive(16)} />
            <Text
              style={[
                Typography.Body2,
                {
                  fontWeight: '700',
                  color: '#FFF',
                  textAlign: 'center',
                  paddingHorizontal: widthResponsive(10),
                },
              ]}>
              {t('Event.Detail.Popup.Package1.Title')}
            </Text>
            <Gap height={heightResponsive(4)} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '100%',
              }}>
              <Text
                style={[
                  Typography.Overline,
                  {color: '#BDBDBD'},
                ]}>{`\u2022`}</Text>
              <Gap width={widthResponsive(4)} />
              <Text
                style={[
                  Typography.Overline,
                  {color: '#BDBDBD', fontWeight: '600'},
                ]}>
                {t('Event.Detail.Popup.Package1.Subtitle1')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '100%',
              }}>
              <Text
                style={[
                  Typography.Overline,
                  {color: '#BDBDBD'},
                ]}>{`\u2022`}</Text>
              <Gap width={widthResponsive(4)} />
              <Text
                style={[
                  Typography.Overline,
                  {color: '#BDBDBD', fontWeight: '600'},
                ]}>
                {t('Event.Detail.Popup.Package1.Subtitle2')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '100%',
              }}>
              <Text
                style={[
                  Typography.Overline,
                  {color: '#BDBDBD'},
                ]}>{`\u2022`}</Text>
              <Gap width={widthResponsive(4)} />
              <Text
                style={[
                  Typography.Overline,
                  {color: '#BDBDBD', fontWeight: '600'},
                ]}>
                {t('Event.Detail.Popup.Package1.Subtitle3')}
              </Text>
            </View>

            <Gap height={heightResponsive(20)} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
              }}>
              <TouchableOpacity onPress={() => setShowModaltopup(false)}>
                <Text
                  style={[
                    Typography.Body2,
                    {fontWeight: '600', color: '#FFF'},
                  ]}>
                  {t('General.Dismiss')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('TopUpCredit');
                }}>
                <Text
                  style={[
                    Typography.Body2,
                    {fontWeight: '600', color: Color.Pink.linear},
                  ]}>
                  {t('General.BuyNow')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />

      <ModalLoading visible={isLoadingDetail} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    position: 'relative',
  },
  content: {
    paddingHorizontal: widthResponsive(24),
  },
  slide: {
    position: 'relative',
    width: '100%',
  },
  map: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerStickyHeader: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    justifyContent: 'space-between',
    backgroundColor: Color.Dark[800],
    paddingHorizontal: widthResponsive(20),
  },
  containerIconLive: {
    backgroundColor: '#FF68D6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthResponsive(4),
    paddingVertical: heightResponsive(4),
    borderRadius: 4,
    flexDirection: 'row',
    width: widthResponsive(70),
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Color.Dark[800],
    width: '100%',
    maxWidth: widthResponsive(244),
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
