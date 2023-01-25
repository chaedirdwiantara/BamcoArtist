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

interface CarouselProps {
  data: BannerList[];
  onPressBanner: (title: string, url: string) => void;
}

export const Carousel: FC<CarouselProps> = ({data, onPressBanner}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [dataWithPlaceholders, setDataWithPlaceholders] = useState<
    BannerList[]
  >([]);
  const [activeIndexSlide, setActiveIndexSlide] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    setDataWithPlaceholders([{id: 0}, ...data, {id: data.length + 1}]);
  }, [data]);

  const getItemLayout = (_data: any, index: number) => ({
    length: ITEM_LENGTH,
    offset: ITEM_LENGTH * (index - 1),
    index,
  });

  const handleScroll: OnScrollEventHandler = event => {
    let offsetX = event.nativeEvent.contentOffset.x;
    setActiveIndexSlide(Math.ceil(offsetX / width));
  };

  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={dataWithPlaceholders}
        renderItem={({item, index}) => {
          if (!item.imageUrls || !item.title) {
            return <View style={{width: EMPTY_ITEM_LENGTH}} />;
          }

          const inputRange = [
            (index - 2) * ITEM_LENGTH,
            (index - 1) * ITEM_LENGTH,
            index * ITEM_LENGTH,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [ITEM_LENGTH, 0, -ITEM_LENGTH],
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
                item.linkUrl && onPressBanner(item.title, item.linkUrl)
              }>
              <Animated.View
                style={[
                  {
                    transform: [{scale}],
                  },
                  styles.itemContent,
                ]}>
                <Image
                  source={{uri: item.imageUrls[3].image}}
                  style={styles.itemImage}
                />
                <Animated.Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[styles.itemText, {transform: [{translateX}]}]}>
                  {item.title}
                </Animated.Text>
                <Animated.Text
                  numberOfLines={2}
                  ellipsizeMode={'tail'}
                  style={[styles.itemSubtitle, {transform: [{translateX}]}]}>
                  {item.description}
                </Animated.Text>
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
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
      <View style={styles.containerIndicator}>
        <Indicator
          activeIndex={activeIndexSlide}
          totalIndex={data.length}
          activeColor={Color.Dark[100]}
          inActiveColor={Color.Dark[300]}
        />
      </View>
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
    fontSize: mvs(14),
    position: 'absolute',
    bottom: heightPercentage(50),
    left: widthPercentage(10),
    color: Color.Neutral[10],
    fontFamily: Font.InterBold,
    width: width * 0.6,
  },
  itemSubtitle: {
    fontSize: mvs(11.5),
    position: 'absolute',
    bottom: ms(12),
    left: ms(10),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
    width: width * 0.6,
  },
  itemImage: {
    width: '100%',
    height: heightPercentage(159),
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
