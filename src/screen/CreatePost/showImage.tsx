import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Gap, SquareImage} from '../../components';
import {heightPercentage} from '../../utils';
import {Image} from 'react-native-image-crop-picker';
import {CloseIcon} from '../../assets/icon';
import {color} from '../../theme';
import {ms} from 'react-native-size-matters';

interface ImageListProps {
  disabled?: boolean;
  onPress: (uri: number) => void;
  height: number;
  heightType2?: number;
  imgData: Image[];
}

const ImageList: FC<ImageListProps> = (props: ImageListProps) => {
  const {
    disabled = true,
    onPress,
    imgData,
    height = 79,
    heightType2 = 161,
  } = props;

  return (
    <View style={styles.container}>
      {imgData.length === 1 && (
        <>
          <SquareImage
            imgUri={imgData && imgData[0].path}
            height={heightPercentage(heightType2)}
            disabled={disabled}
          />
          <TouchableOpacity onPress={() => onPress(0)} style={styles.closeIcon}>
            <CloseIcon stroke={color.Neutral[10]} />
          </TouchableOpacity>
        </>
      )}
      {imgData.length === 2 && (
        <>
          <View style={styles.imageContainer}>
            <SquareImage
              imgUri={imgData && imgData[0].path}
              height={heightPercentage(heightType2)}
              disabled={disabled}
            />
            <TouchableOpacity
              onPress={() => onPress(0)}
              style={styles.closeIcon}>
              <CloseIcon stroke={color.Neutral[10]} />
            </TouchableOpacity>
          </View>
          <Gap width={3} />
          <View style={styles.imageContainer}>
            <SquareImage
              imgUri={imgData && imgData[1].path}
              height={heightPercentage(heightType2)}
              disabled={disabled}
            />
            <TouchableOpacity
              onPress={() => onPress(1)}
              style={styles.closeIcon}>
              <CloseIcon stroke={color.Neutral[10]} />
            </TouchableOpacity>
          </View>
        </>
      )}
      {imgData.length === 3 && (
        <>
          <View style={styles.imageContainer}>
            <SquareImage
              imgUri={imgData && imgData[0].path}
              height={heightPercentage(heightType2)}
              disabled={disabled}
            />
            <TouchableOpacity
              onPress={() => onPress(0)}
              style={styles.closeIcon}>
              <CloseIcon stroke={color.Neutral[10]} />
            </TouchableOpacity>
          </View>
          <Gap width={3} />
          <View style={styles.imageContainer}>
            <View style={styles.imageContainer}>
              <SquareImage
                imgUri={imgData && imgData[1].path}
                height={heightPercentage(height)}
                disabled={disabled}
              />
              <TouchableOpacity
                onPress={() => onPress(1)}
                style={styles.closeIcon}>
                <CloseIcon stroke={color.Neutral[10]} />
              </TouchableOpacity>
            </View>
            <Gap height={3} />
            <View style={styles.imageContainer}>
              <SquareImage
                imgUri={imgData && imgData[2].path}
                height={heightPercentage(height)}
                disabled={disabled}
              />
              <TouchableOpacity
                onPress={() => onPress(2)}
                style={styles.closeIcon}>
                <CloseIcon stroke={color.Neutral[10]} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {imgData.length === 4 && (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.imageContainer}>
            <View>
              <SquareImage
                imgUri={imgData && imgData[0].path}
                height={heightPercentage(height)}
                disabled={disabled}
              />
              <TouchableOpacity
                onPress={() => onPress(0)}
                style={styles.closeIcon}>
                <CloseIcon stroke={color.Neutral[10]} />
              </TouchableOpacity>
            </View>
            <Gap height={3} />
            <View>
              <SquareImage
                imgUri={imgData && imgData[2].path}
                height={heightPercentage(height)}
                disabled={disabled}
              />
              <TouchableOpacity
                onPress={() => onPress(2)}
                style={styles.closeIcon}>
                <CloseIcon stroke={color.Neutral[10]} />
              </TouchableOpacity>
            </View>
          </View>
          <Gap width={3} />
          <View style={styles.imageContainer}>
            <View>
              <SquareImage
                imgUri={imgData && imgData[1].path}
                height={heightPercentage(height)}
                disabled={disabled}
              />
              <TouchableOpacity
                onPress={() => onPress(1)}
                style={styles.closeIcon}>
                <CloseIcon stroke={color.Neutral[10]} />
              </TouchableOpacity>
            </View>
            <Gap height={3} />
            <View>
              <SquareImage
                imgUri={imgData && imgData[3].path}
                height={heightPercentage(height)}
                disabled={disabled}
              />
              <TouchableOpacity
                onPress={() => onPress(3)}
                style={styles.closeIcon}>
                <CloseIcon stroke={color.Neutral[10]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  closeIcon: {position: 'absolute', right: ms(12), top: ms(8)},
  imageContainer: {flex: 1},
});
