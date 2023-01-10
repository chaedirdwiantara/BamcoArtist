import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import Color from '../../../theme/Color';
import {FooterContent} from './FooterContent';
import {SelectBox} from '../../../components';
import Typography from '../../../theme/Typography';
import {DataOnboardType} from '../../../data/onboard';
import {heightPercentage, width} from '../../../utils';
import {DataFavouritesType} from '../../../data/preference';
import {UpdateProfilePropsType} from '../../../api/profile.api';
import {MusicianList} from '../../../interface/musician.interface';
import {profileStorage} from '../../../hooks/use-storage.hook';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

interface ImageSliderProps {
  type?: string;
  data: DataOnboardType[] | DataFavouritesType[];
  onPress: () => void;
  onUpdatePreference?: (props?: UpdateProfilePropsType) => void;
  dataList?: MusicianList[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  type,
  data,
  onPress,
  onUpdatePreference,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<number[]>([]);
  const [selectedExpectations, setSelectedExpectations] = useState<number[]>(
    [],
  );
  const [activeIndexSlide, setActiveIndexSlide] = useState<number>(0);

  const handleNextSlide = () => {
    if (activeIndexSlide === 0 && onUpdatePreference) {
      onUpdatePreference({
        fullname: profileStorage()?.fullname,
        favoriteGeneres: selectedGenres,
      });
    } else if (activeIndexSlide === 1 && onUpdatePreference) {
      onUpdatePreference({
        fullname: profileStorage()?.fullname,
        moods: selectedMoods,
      });
    } else if (activeIndexSlide === 2 && onUpdatePreference) {
      onUpdatePreference({
        fullname: profileStorage()?.fullname,
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
    page < 3 ? setActiveIndexSlide(Math.ceil(offsetX / width)) : onPress;
  };

  const onPressNext =
    activeIndexSlide === data.length - 1 ? onPress : handleNextSlide;

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
        {data.map((item, index) => {
          if ('uri' in item) {
            return (
              <Image
                key={index}
                source={item.uri}
                style={styles.image}
                resizeMode={'cover'}
              />
            );
          } else if ('favorites' in item) {
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
                  favorites={item.favorites}
                />
              </View>
            );
          }
        })}
      </ScrollView>
      <FooterContent
        type={type}
        activeIndexSlide={activeIndexSlide}
        data={data}
        onPressGoTo={onPress}
        onPressNext={onPressNext}
      />
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
