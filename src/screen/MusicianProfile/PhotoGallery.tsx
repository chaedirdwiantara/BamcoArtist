import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import FastImage from 'react-native-fast-image';
import {color} from '../../theme';
import {widthResponsive} from '../../utils';
import {ms} from 'react-native-size-matters';
import {TopNavigation} from '../../components';
import {useNavigation} from '@react-navigation/native';
import ImageModal from '../Detail/ImageModal';

const {width} = Dimensions.get('screen');

type PhotoGalleyProps = NativeStackScreenProps<RootStackParams, 'PhotoGallery'>;

const PhotoGallery: FC<PhotoGalleyProps> = ({route}: PhotoGalleyProps) => {
  const imageData = route.params.imageData;
  const userName = route.params.userName;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<number>(-1);

  const toggleModalOnPress = (index: number) => {
    setModalVisible(!isModalVisible);
    setImgUrl(index);
  };

  return (
    <View style={styles.container}>
      <TopNavigation.Type1
        title={`${userName} Photos`}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={color.Neutral[10]}
        containerStyles={{borderBottomWidth: 0}}
      />
      <FlatList
        data={imageData}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.imageStyle}
            onPress={() => toggleModalOnPress(index)}>
            <View
              style={{
                marginHorizontal: ms(1.5),
                marginVertical: ms(1.5),
              }}>
              <FastImage
                source={{uri: item}}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
      <ImageModal
        toggleModal={() => setModalVisible(!isModalVisible)}
        modalVisible={isModalVisible}
        imageIdx={imgUrl}
        dataImage={imageData}
      />
    </View>
  );
};

export default PhotoGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  imageStyle: {
    width: width / 3,
    height: undefined,
    aspectRatio: 1 / 1,
  },
});
