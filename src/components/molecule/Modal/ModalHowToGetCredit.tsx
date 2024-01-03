import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {ModalCustom} from './ModalCustom';
import {color, font} from '../../../theme';
import {RootStackParams} from '../../../navigations';
import {width, widthPercentage} from '../../../utils';
import {ArrowLeftIcon, ArrowRightIcon} from '../../../assets/icon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface ModalHowToGetCreditProps {
  visible: boolean;
  onPressClose: () => void;
  onPressExclusive: () => void;
}

interface ChevronPrevNextProps {
  length: number;
  activeIndex: number;
  onPressPrev: () => void;
  onPressNext: () => void;
}

const ChevronPrevNext: React.FC<ChevronPrevNextProps> = ({
  length,
  activeIndex,
  onPressPrev,
  onPressNext,
}) => {
  const disabledPrev = activeIndex === 0;
  const disabledNext = activeIndex === 2;
  return (
    <View style={styles.containerArrow}>
      <TouchableOpacity onPress={onPressPrev} disabled={disabledPrev}>
        <ArrowLeftIcon
          style={{
            width: widthPercentage(20),
            height: widthPercentage(20),
          }}
          stroke={disabledPrev ? '#919191' : color.Neutral[10]}
        />
      </TouchableOpacity>
      <Text style={styles.noSlide}>{`${activeIndex + 1} of ${length}`}</Text>
      <TouchableOpacity onPress={onPressNext} disabled={disabledNext}>
        <ArrowRightIcon stroke={disabledNext ? '#919191' : color.Neutral[10]} />
      </TouchableOpacity>
    </View>
  );
};

export const ModalHowToGetCredit: React.FC<ModalHowToGetCreditProps> = (
  props: ModalHowToGetCreditProps,
) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {visible, onPressClose} = props;
  const [activeIndexSlide, setActiveIndexSlide] = useState<number>(0);
  const dataArray = [
    {
      title: t('Rewards.MissionTab.ModalGetCredit.Title1'),
      subtitle: t('Rewards.MissionTab.ModalGetCredit.Subtitle1'),
      btnText: t('Rewards.MissionTab.ModalGetCredit.Button1'),
      navigate: () =>
        navigation.navigate('CreatePost', {audience: 'Feed.Public'}),
    },
    {
      title: t('Rewards.MissionTab.ModalGetCredit.Title2'),
      subtitle: t('Rewards.MissionTab.ModalGetCredit.Subtitle2'),
      btnText: t('Rewards.MissionTab.ModalGetCredit.Button2'),
      navigate: () => props.onPressExclusive(),
    },
    {
      title: t('Rewards.MissionTab.ModalGetCredit.Title3'),
      subtitle: t('Rewards.MissionTab.ModalGetCredit.Subtitle3'),
      btnText: t('Rewards.MissionTab.ModalGetCredit.Button3'),
      navigate: () => navigation.navigate('CreatePost'),
    },
  ];

  const handlePreviousSlide = () => {
    const newIndex = activeIndexSlide - 1;
    setActiveIndexSlide(newIndex);
  };

  const handleNextSlide = async () => {
    const newIndex = activeIndexSlide + 1;
    setActiveIndexSlide(newIndex);
  };

  const children = () => (
    <View style={styles.card}>
      <View style={styles.containerContent}>
        <Text style={styles.title}>
          {t('Rewards.MissionTab.ModalGetCredit.HowToGetCredit')}
        </Text>
        <Image source={require('../../../assets/image/feed.png')} />
        <Text style={[styles.title, {marginTop: mvs(15)}]}>
          {dataArray[activeIndexSlide].title}
        </Text>
        <Text style={styles.subtitle}>
          {dataArray[activeIndexSlide].subtitle}
        </Text>
        <ChevronPrevNext
          length={dataArray.length}
          activeIndex={activeIndexSlide}
          onPressPrev={handlePreviousSlide}
          onPressNext={handleNextSlide}
        />
        <TouchableOpacity
          onPress={() => {
            dataArray[activeIndexSlide].navigate();
            onPressClose();
          }}>
          <Text
            style={[styles.title, {marginBottom: 0, color: color.Pink[200]}]}>
            {dataArray[activeIndexSlide].btnText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ModalCustom
      modalVisible={visible}
      children={children()}
      onPressClose={onPressClose}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.7,
    backgroundColor: color.Dark[900],
    borderRadius: mvs(16),
    paddingHorizontal: ms(20),
    paddingVertical: mvs(20),
  },
  containerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: color.Neutral[10],
    fontFamily: font.InterBold,
    fontSize: mvs(14),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: mvs(15),
  },
  subtitle: {
    color: color.Neutral[10],
    fontFamily: font.InterBold,
    fontSize: mvs(10),
    fontWeight: '500',
    textAlign: 'center',
  },
  noSlide: {
    color: color.Secondary[10],
    fontFamily: font.InterBold,
    fontSize: mvs(12),
    fontWeight: '500',
    textAlign: 'center',
  },
  containerArrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.4,
    marginTop: mvs(15),
    marginBottom: mvs(20),
  },
});
