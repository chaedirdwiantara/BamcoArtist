import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Swiper from 'react-native-swiper';
import {
  BadgeBronzeIcon,
  BadgeBronzeMIcon,
  BadgeDiamondIcon,
  BadgeDiamondMIcon,
  BadgeGoldIcon,
  BadgeGoldMIcon,
  BadgePlatinumIcon,
  BadgePlatinumMIcon,
  BadgeSilverIcon,
  BadgeSilverMIcon,
} from '../../../assets/icon';
import {widthResponsive} from '../../../utils';
import {useTranslation} from 'react-i18next';
import {color, font} from '../../../theme';
import {Gap} from '../../atom';
import * as Progress from 'react-native-progress';
import {useFocusEffect} from '@react-navigation/native';
import PointProgress from './pointProgress';
import {slideIndexStore} from '../../../store/reward.store';

type Props = {
  currentLvl: string;
};

const HeaderSwiper: FC<Props> = ({currentLvl}) => {
  const {storedSlideIndex, setStoredSlideIndex} = slideIndexStore();
  const {t} = useTranslation();

  const Bronze = '../../../assets/image/Bg1.png';
  const Silver = '../../../assets/image/Bg2.png';
  const Gold = '../../../assets/image/Bg3.png';
  const Platinum = '../../../assets/image/Bg4.png';
  const Diamond = '../../../assets/image/Bg5.png';
  const onSwipe = (index: number) => {
    setStoredSlideIndex(index);
  };

  const dataSlider = [
    {rankTitle: 'Bronze'},
    {rankTitle: 'Silver'},
    {rankTitle: 'Gold'},
    {rankTitle: 'Platinum'},
    {rankTitle: 'Diamond'},
  ];

  useFocusEffect(
    useCallback(() => {
      const initialIndex =
        currentLvl === 'Bronze'
          ? 0
          : currentLvl === 'Silver'
          ? 1
          : currentLvl === 'Gold'
          ? 2
          : currentLvl === 'Platinum'
          ? 3
          : 4;

      setStoredSlideIndex(initialIndex);
      return () => setStoredSlideIndex(undefined);
    }, [currentLvl]),
  );

  const swiperNextBtn = () => {
    return (
      <View style={styles.nextButton}>
        {storedSlideIndex === 0 ? (
          <BadgeSilverIcon />
        ) : storedSlideIndex === 1 ? (
          <BadgeGoldIcon />
        ) : storedSlideIndex === 2 ? (
          <BadgePlatinumIcon />
        ) : storedSlideIndex === 3 ? (
          <BadgeDiamondIcon />
        ) : null}
      </View>
    );
  };

  const swiperPrevBtn = () => {
    return (
      <View style={styles.prevButton}>
        {storedSlideIndex === 1 ? (
          <BadgeBronzeIcon />
        ) : storedSlideIndex === 2 ? (
          <BadgeSilverIcon />
        ) : storedSlideIndex === 3 ? (
          <BadgeGoldIcon />
        ) : storedSlideIndex === 4 ? (
          <BadgePlatinumIcon />
        ) : null}
      </View>
    );
  };

  return (
    <>
      {storedSlideIndex !== null || storedSlideIndex !== undefined ? (
        <Swiper
          style={styles.wrapper}
          index={storedSlideIndex}
          key={storedSlideIndex}
          autoplay={false}
          loop={false}
          showsPagination={false}
          showsButtons={true}
          nextButton={swiperNextBtn()}
          prevButton={swiperPrevBtn()}
          onIndexChanged={onSwipe}>
          {dataSlider.map((data, index) => {
            return (
              <>
                <ImageBackground
                  style={styles.slideContainer}
                  key={index}
                  source={
                    data.rankTitle === 'Bronze'
                      ? require(Bronze)
                      : data.rankTitle === 'Silver'
                      ? require(Silver)
                      : data.rankTitle === 'Gold'
                      ? require(Gold)
                      : data.rankTitle === 'Platinum'
                      ? require(Platinum)
                      : require(Diamond)
                  }
                  resizeMode="stretch">
                  <View style={styles.midStyle}>
                    {data.rankTitle === 'Bronze' ? (
                      <BadgeBronzeMIcon height={80} width={80} />
                    ) : data.rankTitle === 'Silver' ? (
                      <BadgeSilverMIcon height={80} width={80} />
                    ) : data.rankTitle === 'Gold' ? (
                      <BadgeGoldMIcon height={80} width={80} />
                    ) : data.rankTitle === 'Platinum' ? (
                      <BadgePlatinumMIcon height={80} width={80} />
                    ) : (
                      <BadgeDiamondMIcon height={80} width={80} />
                    )}
                  </View>
                  <Gap height={8} />
                  <Text style={styles.text}>{data.rankTitle}</Text>
                </ImageBackground>
              </>
            );
          })}
        </Swiper>
      ) : null}
    </>
  );
};

export default HeaderSwiper;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    height: widthResponsive(270),
  },
  slideContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  midStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: color.Neutral[10],
    fontSize: 18,
    fontWeight: '600',
    fontFamily: font.InterRegular,
  },
  nextButton: {
    position: 'absolute',
    top: 0,
    right: -30,
  },
  prevButton: {
    position: 'absolute',
    top: 0,
    left: -30,
  },
});
