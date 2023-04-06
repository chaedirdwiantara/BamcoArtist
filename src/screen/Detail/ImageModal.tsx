import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  LogBox,
} from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import {Image} from 'react-native-image-crop-picker';

import {color} from '../../theme';
import {imageTypes} from '../../interface/feed.interface';
import {photos} from '../../interface/musician.interface';
import {CloseCircleIcon, TrashIcon} from '../../assets/icon';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';

export const {width} = Dimensions.get('screen');

interface ModalImageProps {
  toggleModal: () => void;
  modalVisible: boolean;
  imageIdx: number;
  dataImage?: imageTypes[][] | string[];
  dataImageGallery?: photos[] | Image[];
  type?: string;
  removePhoto?: (id: number) => void;
}

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

const ImageModal: FC<ModalImageProps> = (props: ModalImageProps) => {
  const {
    toggleModal,
    modalVisible,
    imageIdx,
    dataImage,
    dataImageGallery,
    type,
    removePhoto,
  } = props;

  // ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['scrollToIndex should be used in conjunction with']);
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;
  const imageSlider = useRef(null);
  const [activeIndexSlide, setActiveIndexSlide] = useState<number>(imageIdx);

  useEffect(() => {
    setActiveIndexSlide(imageIdx);
  }, [imageIdx]);

  const handleScroll: OnScrollEventHandler = event => {
    let offsetX = event.nativeEvent.contentOffset.x;
    setActiveIndexSlide(Math.ceil(offsetX / width));
  };

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={1}
      backdropColor={color.Dark[800]}
      style={{marginHorizontal: 0}}
      onBackButtonPress={toggleModal}>
      <StatusBar backgroundColor={color.Dark[800]} />
      <SafeAreaView style={styles.container}>
        <View style={styles.containerIcon}>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <CloseCircleIcon />
          </TouchableOpacity>

          {type === 'editProfile' ? (
            <TouchableOpacity
              onPress={() => removePhoto && removePhoto(activeIndexSlide)}
              style={styles.removeIcon}>
              <TrashIcon />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.mainContainer}>
          {dataImageGallery ? (
            <Animated.FlatList<Image | photos>
              ref={imageSlider}
              data={dataImageGallery}
              initialScrollIndex={imageIdx}
              getItemLayout={(data, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
              renderScrollComponent={props => (
                <ScrollView {...props} onScroll={handleScroll} />
              )}
              renderItem={({item}) => (
                <Animated.View style={styles.mainImageWrapper}>
                  <View style={styles.imageWrapper}>
                    <FastImage
                      source={{
                        uri:
                          type === 'profile'
                            ? item.images[3]?.image
                            : item.path,
                      }}
                      style={[styles.imageStyle]}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>
                </Animated.View>
              )}
            />
          ) : (
            <Animated.FlatList
              ref={imageSlider}
              data={dataImage}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              pagingEnabled
              initialScrollIndex={type === 'zoomProfile' ? undefined : imageIdx}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
              renderItem={({item}) => (
                <Animated.View style={styles.mainImageWrapper}>
                  <View style={styles.imageWrapper}>
                    <FastImage
                      source={{
                        uri: type === 'zoomProfile' ? item : item[3].image,
                      }}
                      style={[styles.imageStyle]}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>
                </Animated.View>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: heightResponsive(55),
    paddingBottom: heightResponsive(65),
  },
  scrollView: {
    alignItems: 'center',
  },
  mainImageWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: width,
    height: undefined,
    aspectRatio: 1 / 2,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginTop: heightPercentage(24),
    marginLeft: widthResponsive(24),
  },
  containerIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
  },
  removeIcon: {
    alignSelf: 'flex-end',
    marginTop: heightPercentage(24),
    marginRight: widthResponsive(24),
  },
});
