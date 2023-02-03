import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import Modal from 'react-native-modal';
import {color} from '../../theme';
import FastImage from 'react-native-fast-image';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {CloseCircleIcon} from '../../assets/icon';
import {imageTypes} from '../../interface/feed.interface';
import {photos} from '../../interface/musician.interface';

export const {width} = Dimensions.get('screen');

interface ModalImageProps {
  toggleModal: () => void;
  modalVisible: boolean;
  imageIdx: number;
  dataImage?: imageTypes[][];
  dataImageGallery?: photos[];
}

const ImageModal: FC<ModalImageProps> = (props: ModalImageProps) => {
  const {toggleModal, modalVisible, imageIdx, dataImage, dataImageGallery} =
    props;

  const scrollX = useRef(new Animated.Value(0)).current;
  const imageSlider = useRef(null);

  useEffect(() => {
    if (imageIdx !== -1) {
      // @ts-ignore
      imageSlider.current?.scrollToOffset({
        offset: imageIdx * width,
      });
    }
  }, [imageIdx]);

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={1}
      backdropColor={color.Dark[800]}
      style={{marginHorizontal: 0}}
      onBackButtonPress={toggleModal}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
          <CloseCircleIcon />
        </TouchableOpacity>

        <View style={styles.mainContainer}>
          {dataImageGallery ? (
            <Animated.FlatList
              ref={imageSlider}
              data={dataImageGallery}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
              renderItem={({item, index}) => (
                <Animated.View style={styles.mainImageWrapper}>
                  <View style={styles.imageWrapper}>
                    <FastImage
                      source={{uri: item.images[3].image}}
                      style={[styles.imageStyle]}
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
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
              renderItem={({item, index}) => (
                <Animated.View style={styles.mainImageWrapper}>
                  <View style={styles.imageWrapper}>
                    <FastImage
                      source={{uri: item[3].image}}
                      style={[styles.imageStyle]}
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
    height: heightResponsive(320),
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
});
