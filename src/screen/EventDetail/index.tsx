import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Linking,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useState} from 'react';
import Color from '../../theme/Color';
import FastImage from 'react-native-fast-image';
import {heightResponsive, widthResponsive} from '../../utils';
import {Gap, SsuDivider, TabFilter, TopNavigation} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '../../theme/Typography';
import {ArrowLeftIcon, LocationIcon} from '../../assets/icon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import LineUp from './LineUp';
import {useSearchHook} from '../../hooks/use-search.hook';
import {useQuery} from 'react-query';
import TopTiper from './TopTiper';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

export const EventDetail = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {getSearchMusicians} = useSearchHook();

  const [scrollEffect, setScrollEffect] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filterTab] = useState([
    {filterName: 'Event.Detail.LineUp'},
    {filterName: 'Event.Detail.TopTiper'},
  ]);

  const filterDataTab = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 2;
    setScrollEffect(scrolled);
  };

  const scheme = Platform.select({
    ios: 'maps://0,0?q=',
    android: 'geo:0,0?q=',
  });
  //   TODO: change latLng to dynamic from response api
  const latLng = `-8.6394845,115.1193735`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  const onClickMap = () => {
    Linking.openURL(url ?? '');
  };
  const handleBackAction = () => {
    navigation.goBack();
  };

  const {
    data: dataSearchMusicians,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery(['/search-musician'], () => getSearchMusicians({keyword: ''}));

  return (
    <View style={styles.root}>
      {scrollEffect && (
        <TopNavigation.Type1
          title={t('Event.Detail.Title')}
          maxLengthTitle={20}
          itemStrokeColor={'white'}
          leftIcon={<ArrowLeftIcon />}
          leftIconAction={handleBackAction}
          containerStyles={{
            paddingHorizontal: widthResponsive(20),
          }}
        />
      )}
      <ScrollView onScroll={handleScroll}>
        <View style={styles.slide}>
          <ImageBackground
            style={{width: '100%', height: 400}}
            source={{
              uri: 'https://customer-j4g673mr0gncpv44.cloudflarestream.com/147d5a64143a1964581c19ba44fe151c/thumbnails/thumbnail.jpg',
            }}>
            <LinearGradient
              colors={['#00000000', Color.Dark[800]]}
              style={{height: '100%', width: '100%'}}>
              {!scrollEffect && (
                <TopNavigation.Type1
                  title={t('Event.Detail.Title')}
                  maxLengthTitle={20}
                  itemStrokeColor={'white'}
                  leftIcon={<ArrowLeftIcon />}
                  leftIconAction={handleBackAction}
                  containerStyles={{
                    paddingHorizontal: widthResponsive(20),
                    borderBottomColor: 'transparent',
                  }}
                />
              )}
            </LinearGradient>
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <Text style={[Typography.Heading5, {color: Color.Neutral[10]}]}>
            The Sound Project 2023
          </Text>
          <Gap height={heightResponsive(6)} />
          <Text style={[Typography.Body1, {color: Color.Success[500]}]}>
            Jakarta, 5 August 2023
          </Text>
          <Gap height={heightResponsive(6)} />
          <Text style={[{color: '#79859C', fontStyle: 'italic'}]}>
            Jl Despacito Capucino Botanmu Numero Uno No 127 Jakarta Selatan,
            Jakarta
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
            // TODO: Change data musician
            <LineUp dataMusician={dataSearchMusicians?.data} />
          ) : (
            // TODO: Change data tiper
            <TopTiper dataMusician={dataSearchMusicians?.data} />
          )}
        </View>
      </ScrollView>
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
});
