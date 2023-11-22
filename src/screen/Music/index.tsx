import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Share from 'react-native-share';
import {useTranslation} from 'react-i18next';
import ViewShot from 'react-native-view-shot';
import {mvs} from 'react-native-size-matters';
import ImageColors from 'react-native-image-colors';
import {Slider} from '@miblanchard/react-native-slider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  Gap,
  ModalDonate,
  SsuStatusBar,
  ModalSuccessDonate,
} from '../../components';
import TopNav from './TopNav';
import {color, font} from '../../theme';
import MusicControl from './MusicControl';
import {SongsProps} from '../../data/music';
import {Beamco2Logo} from '../../assets/logo';
import TitleAndDonate from './TitleAndDonate';
import {RootStackParams} from '../../navigations';
import {useSongHook} from '../../hooks/use-song.hook';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {profileStorage} from '../../hooks/use-storage.hook';
import {heightResponsive, widthResponsive} from '../../utils';
import {CoinCIcon, LoveIcon, ShareIcon} from '../../assets/icon';

export const {width} = Dimensions.get('screen');

type MusicProps = NativeStackScreenProps<RootStackParams, 'MusicPlayer'>;

export const MusicPlayer: FC<MusicProps> = ({navigation}: MusicProps) => {
  const {t} = useTranslation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const {playerProgress, currentTrack, seekPlayer} = usePlayerHook();
  const {setLikeSong, setUnlikeSong} = useSongHook();
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [colors, setColors] = useState();
  const [screenshot, setScreenshot] = useState<string>('');
  const [showShareImage, setShowShareImage] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(currentTrack?.isLiked);

  // const [songIndex, setSongIndex] = useState<number>(0);

  // TODO: will gonna use it when swipe on the song is applied
  // useEffect(() => {
  //   scrollX.addListener(({value}) => {
  //     const index = Math.round(value / width);
  //     setSongIndex(index);
  //   });
  // }, []);

  const {showMiniPlayerOnly} = usePlayerHook();

  useEffect(() => {
    const url = currentTrack?.artwork;
    async function fetchMyAPI() {
      const result = await ImageColors.getColors(url, {
        fallback: '#228B22',
        cache: true,
        key: url,
      });

      setColors(result);
    }

    fetchMyAPI();
  }, []);

  const RenderSongs = (item: SongsProps, index: number) => {
    return (
      <Animated.View style={styles.mainImageWrapper}>
        <View style={styles.imageWrapper}>
          {/* @ts-ignore */}
          <Image source={{uri: item.artwork}} style={styles.musicImage} />
        </View>
      </Animated.View>
    );
  };

  const coinOnPress = () => {
    setModalDonate(true);
  };

  const onPressCloseModalDonate = () => {
    setModalDonate(false);
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  const artistOnPress = () => {
    showMiniPlayerOnly();
    navigation.navigate('MusicianProfile', {id: currentTrack?.musicianId});
  };

  const handleTopLeftIcon = () => {
    showMiniPlayerOnly();
    navigation.goBack();
  };

  const onCapture = useCallback(uri => {
    setScreenshot(uri);
    setShowShareImage(false);
  }, []);

  const shareMusic = () => {
    const shareOptions = {
      url: screenshot,
      social: Share.Social.INSTAGRAM,
    };

    Share.open(shareOptions);
  };

  const likeOnPress = async (isLikedSong: boolean) => {
    isLikedSong
      ? await setUnlikeSong({id: currentTrack?.id})
      : await setLikeSong({id: currentTrack?.id});

    setIsLiked(!isLikedSong);
  };

  return (
    <View style={styles.container}>
      <SsuStatusBar type="black" />
      <View style={styles.topNavStyle}>
        <TopNav
          songId={currentTrack?.id}
          musicianId={currentTrack?.musicianId}
          leftIconAction={handleTopLeftIcon}
        />
      </View>
      <View style={styles.mainContainer}>
        {/* image */}
        <Animated.FlatList
          data={[currentTrack]}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          renderItem={({item, index}) => RenderSongs(item, index)}
        />
      </View>
      {/* Title  */}
      <View style={styles.titleStyle}>
        <TitleAndDonate
          title={currentTrack?.title ?? ''}
          artist={currentTrack?.artist ?? ''}
          artistOnPress={artistOnPress}
        />
      </View>
      {/* slider */}
      <View style={styles.sliderStyle}>
        <Slider
          value={playerProgress.position}
          minimumValue={0}
          maximumValue={playerProgress.duration}
          minimumTrackTintColor={color.Success[400]}
          maximumTrackTintColor={color.Dark[400]}
          thumbTintColor={color.Success[400]}
          onSlidingComplete={e => {
            const seekDuration = e as number[];
            seekPlayer(seekDuration[0]);
          }}
          thumbStyle={{width: 8, height: 8}}
          containerStyle={{
            marginBottom: heightResponsive(-12),
            marginTop: heightResponsive(-25),
          }}
        />
        <View style={styles.progresTextContainer}>
          <Text style={styles.progresText}>
            {new Date((playerProgress.position + 1) * 1000)
              .toISOString()
              .slice(14, 19)}
          </Text>
          <Text style={styles.progresText}>
            {new Date(playerProgress.duration * 1000)
              .toISOString()
              .slice(14, 19)}
          </Text>
        </View>
      </View>
      <View style={styles.musiControl}>
        <MusicControl />
      </View>
      <View style={styles.footerStyle}>
        <TouchableOpacity style={styles.containerShare} onPress={shareMusic}>
          <ShareIcon width={mvs(19)} height={mvs(19)} />
          <Text style={styles.textShare}>{t('General.Share.Share')}</Text>
        </TouchableOpacity>
        <View style={styles.containerShare}>
          <TouchableOpacity onPress={() => likeOnPress(isLiked)}>
            <LoveIcon
              fill={isLiked ? color.Pink[100] : 'none'}
              stroke={isLiked ? 'none' : color.Neutral[10]}
              width={mvs(24)}
              height={mvs(24)}
            />
          </TouchableOpacity>
          {currentTrack?.musicianId !== profileStorage()?.uuid && (
            <>
              <Gap width={widthResponsive(15)} />
              <TouchableOpacity onPress={coinOnPress}>
                <CoinCIcon
                  width={mvs(22)}
                  height={mvs(22)}
                  fill={color.Neutral[10]}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <Gap height={mvs(20)} />
      {showShareImage && (
        <ViewShot onCapture={onCapture} captureMode="mount">
          <View
            style={[
              styles.containerMusic,
              {
                backgroundColor:
                  colors?.darkVibrant === '#000000'
                    ? colors?.darkMuted
                    : colors?.darkVibrant,
              },
            ]}>
            <Beamco2Logo />
            <View style={styles.containerImage}>
              <Image
                source={{
                  uri: currentTrack?.artwork,
                }}
                style={styles.imageStyle}
              />
            </View>
            <Text style={styles.songTitle}>{currentTrack?.title}</Text>
            <Text style={styles.artistName}>{currentTrack?.artist}</Text>
          </View>
        </ViewShot>
      )}

      {/* modal */}
      <ModalDonate
        userId={currentTrack?.musicianId}
        onPressClose={onPressCloseModalDonate}
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onModalHide={() => setModalSuccessDonate(true)}
      />

      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal ? true : false}
        toggleModal={onPressSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
    justifyContent: 'space-between',
  },
  topNavStyle: {paddingHorizontal: widthResponsive(24)},
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: heightResponsive(65),
    paddingBottom: heightResponsive(65),
  },
  mainImageWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: widthResponsive(280),
    height: heightResponsive(320),
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  titleStyle: {
    paddingBottom: heightResponsive(36),
    paddingHorizontal: widthResponsive(24),
  },
  sliderStyle: {
    width: '100%',
    paddingHorizontal: widthResponsive(24),
  },
  musiControl: {
    width: '100%',
    height: heightResponsive(68),
    marginTop: heightResponsive(35),
    paddingHorizontal: widthResponsive(24),
  },
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightResponsive(39),
    paddingHorizontal: widthResponsive(24),
    marginBottom: heightResponsive(24),
  },
  progresTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progresText: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(10),
    color: color.Neutral[10],
  },
  containerShare: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textShare: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(12),
    color: color.Neutral[10],
    marginLeft: widthResponsive(8),
  },
  containerMusic: {
    alignSelf: 'center',
    paddingVertical: mvs(20),
    paddingHorizontal: mvs(17),
    backgroundColor: '#000',
    borderRadius: mvs(8),
  },
  containerImage: {
    width: width * 0.65,
    height: width * 0.65,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: mvs(8),
  },
  songTitle: {
    fontFamily: font.InterRegular,
    fontWeight: '700',
    color: color.Neutral[10],
    fontSize: mvs(20),
    maxWidth: width * 0.6,
    marginTop: mvs(10),
  },
  artistName: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    color: color.Neutral[10],
    fontSize: mvs(16),
    maxWidth: width * 0.6,
    marginTop: mvs(10),
  },
});
