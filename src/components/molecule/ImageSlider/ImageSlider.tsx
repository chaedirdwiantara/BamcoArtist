import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
} from 'react-native';

import {heightPercentage, width} from '../../../utils';
import Color from '../../../theme/Color';
import {FooterContent} from './FooterContent';
import {MusicianList} from '../../../interface/musician.interface';
import Typography from '../../../theme/Typography';
import {SelectBox} from '../../../components';
import {UpdateProfilePropsType} from '../../../api/profile.api';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {DataOnboardType} from '../../../data/onboard';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

interface ImageSliderProps {
  type?: string;
  data: any;
  onPress: () => void;
  onUpdatePreference?: (props?: UpdateProfilePropsType) => void;
  dataList?: MusicianList[];
  isLoading: boolean;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  type,
  data,
  onPress,
  onUpdatePreference,
  isLoading,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<number[]>([]);
  const [selectedExpectations, setSelectedExpectations] = useState<number[]>(
    [],
  );
  const [activeIndexSlide, setActiveIndexSlide] = useState<number>(0);

  const dataArray = [
    {
      title: 'Select Your Favorite Genres',
      list: data.genre,
    },
    {
      title: 'Current Mood?',
      list: data.mood,
    },
    {
      title: "I'm Here To",
      list: data.expectation,
    },
  ];

  const handleNextSlide = () => {
    if (activeIndexSlide === 0 && onUpdatePreference) {
      onUpdatePreference({
        favoriteGeneres: selectedGenres,
      });
    } else if (activeIndexSlide === 1 && onUpdatePreference) {
      onUpdatePreference({
        moods: selectedMoods,
      });
    } else if (activeIndexSlide === 2 && onUpdatePreference) {
      onUpdatePreference({
        expectations: selectedExpectations,
      });
    }
    const newIndex = activeIndexSlide + 1;
    setActiveIndexSlide(newIndex);
    scrollViewRef.current?.scrollTo({
      x: width * newIndex,
      y: 0,
      animated: true,
    });
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.ceil(offsetX / width);
    const totalPage = type === 'Preference' ? 4 : 3;
    page < totalPage
      ? setActiveIndexSlide(Math.ceil(offsetX / width))
      : onPress;
  };

  const onPressNext =
    type === 'Preference'
      ? activeIndexSlide === dataArray.length - 1
        ? onPress
        : handleNextSlide
      : activeIndexSlide === data.length - 1
      ? onPress
      : handleNextSlide;

  const heightContent =
    type === 'Preference'
      ? {
          height: '80%',
        }
      : {
          height: '60%',
        };

  return (
    <View style={styles.root}>
      {type === 'Preference' ? (
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          pagingEnabled={true}
          snapToInterval={width}
          decelerationRate="fast"
          scrollEventThrottle={200}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.containerScrollView, heightContent]}
          scrollEnabled={false}>
          {dataArray.map((item, index) => {
            // TODO: render list of the favourites
            const selected =
              index === 0
                ? selectedGenres
                : index === 1
                ? selectedMoods
                : selectedExpectations;

            const setSelected =
              index === 0
                ? setSelectedGenres
                : index === 1
                ? setSelectedMoods
                : setSelectedExpectations;

            return (
              <View key={index}>
                <Text style={[Typography.Heading4, styles.title]}>
                  {item.title}
                </Text>
                <SelectBox
                  selected={selected}
                  setSelected={setSelected}
                  data={item.list}
                />
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          pagingEnabled={true}
          snapToInterval={width}
          decelerationRate="fast"
          scrollEventThrottle={200}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.containerScrollView, heightContent]}
          onScroll={handleScroll}>
          {data.map((item: DataOnboardType, index: number) => {
            return (
              <Image
                key={index}
                source={item.uri}
                style={styles.image}
                resizeMode={'cover'}
              />
            );
          })}
        </ScrollView>
      )}

      <FooterContent
        type={type}
        activeIndexSlide={activeIndexSlide}
        data={type === 'Preference' ? dataArray : data}
        onPressGoTo={onPress}
        onPressNext={onPressNext}
      />
      <ModalLoading visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerScrollView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    // marginBottom: heightPercentage(20)
  },
  image: {
    width,
    height: '100%',
  },
  title: {
    textAlign: 'center',
    color: Color.Neutral[10],
    marginBottom: heightPercentage(20),
  },
});
