import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';

import {Indicator} from '../../atom';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {ms, mvs} from 'react-native-size-matters';
import {BannerList} from '../../../interface/banner.interface';
import {width, widthPercentage, heightPercentage} from '../../../utils';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

const ITEM_LENGTH = width * 0.8;
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;

interface CarouselAutoPlayProps {
  data: BannerList[];
  onPressBanner: (
    title: string,
    url: string,
    type: 'artist' | 'event' | 'external',
    key: string,
  ) => void;
}

export const CarouselAutoPlay: FC<CarouselAutoPlayProps> = ({
  data,
  onPressBanner,
}) => {
  const defaultBanner = require('../../../assets/image/default_banner.png');
  const scrollX = useRef(new Animated.Value(0)).current;
  const [dataWithPlaceholders, setDataWithPlaceholders] = useState<
    BannerList[]
  >([]);
  const [activeIndexSlide, setActiveIndexSlide] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDataWithPlaceholders([{id: -1}, ...data, {id: data.length}]);
  }, [data]);

  useEffect(() => {
    let currentIndex = 0;

    const scrollToNextItem = () => {
      currentIndex = (currentIndex + 1) % dataWithPlaceholders.length;
      if (currentIndex === 0) {
        currentIndex = 1; // Skip the first placeholder
      }

      flatListRef.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
      });

      // Adjust the interval based on the current index
      adjustInterval(currentIndex);
    };

    const adjustInterval = (index: number) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // If at the last index, set interval to 2500 ms, otherwise 5000 ms
      const intervalDuration =
        index === dataWithPlaceholders.length - 1 ? 0 : 5000;
      intervalRef.current = setInterval(scrollToNextItem, intervalDuration);
    };

    // Initialize with the standard interval
    intervalRef.current = setInterval(scrollToNextItem, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dataWithPlaceholders.length]);

  const onScroll: OnScrollEventHandler = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(offsetX / ITEM_LENGTH);
    if (
      newIndex !== activeIndexSlide &&
      newIndex < dataWithPlaceholders.length - 1
    ) {
      setActiveIndexSlide(newIndex);
    }
  };

  const getItemLayout = (_data: any, index: number) => ({
    length: ITEM_LENGTH,
    offset: ITEM_LENGTH * (index - 1),
    index,
  });

  const handleScroll: OnScrollEventHandler = event => {
    let offsetX = event.nativeEvent.contentOffset.x;
    setActiveIndexSlide(Math.ceil(offsetX / ITEM_LENGTH));
  };

  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={dataWithPlaceholders}
        renderItem={({item, index}) => {
          if (!item.imageUrls) {
            return <View style={{width: EMPTY_ITEM_LENGTH}} />;
          }

          const inputRange = [
            (index - 2) * ITEM_LENGTH,
            (index - 1) * ITEM_LENGTH,
            index * ITEM_LENGTH,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [ITEM_LENGTH + 20, 0, -ITEM_LENGTH + 20],
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1.2, 0.9],
          });

          return (
            <TouchableOpacity
              style={{
                width: ITEM_LENGTH,
                marginVertical: heightPercentage(15),
              }}
              onPress={() =>
                item.linkUrl &&
                onPressBanner(item.title, item.linkUrl, item.type, item.key)
              }>
              <Animated.View
                style={[
                  {
                    transform: [{scale}],
                  },
                  styles.itemContent,
                ]}>
                <Image
                  source={
                    item.isDefault
                      ? item.imageUrls
                      : item.imageUrls.length > 0
                      ? {uri: item.imageUrls[3].image}
                      : defaultBanner
                  }
                  style={styles.itemImage}
                />
                {data.length <= 5 || Platform.OS === 'android' ? (
                  // animated not working properly on iOS, if banner length more than 5
                  <>
                    <Animated.Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[styles.itemText, {transform: [{translateX}]}]}>
                      {item.title}
                    </Animated.Text>
                    <Animated.Text
                      numberOfLines={2}
                      ellipsizeMode={'tail'}
                      style={[
                        styles.itemSubtitle,
                        {transform: [{translateX}]},
                      ]}>
                      {item.description}
                    </Animated.Text>
                  </>
                ) : (
                  <>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[styles.itemText]}>
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode={'tail'}
                      style={[styles.itemSubtitle]}>
                      {item.description}
                    </Text>
                  </>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        }}
        getItemLayout={getItemLayout}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        bounces={false}
        decelerationRate={0}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.flatListContent}
        snapToInterval={ITEM_LENGTH}
        snapToAlignment="start"
        renderScrollComponent={props => (
          <ScrollView {...props} onScroll={handleScroll} />
        )}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true, listener: onScroll},
        )}
        scrollEventThrottle={16}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
      {data.length === 1 ? null : (
        <View style={styles.containerIndicator}>
          <Indicator
            activeIndex={activeIndexSlide}
            totalIndex={data.length}
            activeColor={Color.Dark[100]}
            inActiveColor={Color.Dark[300]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    marginTop: heightPercentage(20),
  },
  itemContent: {
    marginHorizontal: widthPercentage(15),
    alignItems: 'center',
    width: '90%',
    backgroundColor: Color.Neutral[10],
    borderRadius: 8,
  },
  itemText: {
    fontSize: mvs(13),
    position: 'absolute',
    bottom: heightPercentage(45),
    left: widthPercentage(10),
    color: Color.Neutral[10],
    fontFamily: Font.InterBold,
    width: width * 0.6,
  },
  itemSubtitle: {
    fontSize: mvs(11),
    position: 'absolute',
    bottom: ms(10),
    left: ms(10),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
    width: width * 0.6,
  },
  itemImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 1,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  containerIndicator: {
    width: '100%',
    height: heightPercentage(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentage(10),
  },
});
