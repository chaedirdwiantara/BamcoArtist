import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Gap, SquareImage} from '../../components';
import {heightPercentage} from '../../utils';
import {imageTypes} from '../../interface/feed.interface';

interface ImageListProps {
  disabled?: boolean;
  onPress: (uri: number) => void;
  height: number;
  heightType2?: number;
  imgData: imageTypes[][];
  blurModeOn?: boolean;
}

const ImageList: FC<ImageListProps> = (props: ImageListProps) => {
  const {
    disabled = true,
    onPress,
    imgData,
    height = 79,
    heightType2 = 161,
    blurModeOn,
  } = props;

  return (
    <View style={styles.container}>
      {imgData.length === 1 && (
        <SquareImage
          imgUri={imgData && imgData[0][2].image}
          height={heightPercentage(heightType2)}
          disabled={disabled}
          onPress={() => onPress(0)}
          blurModeOn={blurModeOn}
          borderRadius={4}
        />
      )}
      {imgData.length === 2 && (
        <>
          <SquareImage
            imgUri={imgData && imgData[0][1].image}
            height={heightPercentage(heightType2)}
            containerStyle={{
              flex: 1,
            }}
            disabled={disabled}
            onPress={() => onPress(0)}
            blurModeOn={blurModeOn}
            borderTopLeftRadius={4}
            borderBottomLeftRadius={4}
          />
          <Gap width={3} />
          <SquareImage
            imgUri={imgData && imgData[1][1].image}
            height={heightPercentage(heightType2)}
            containerStyle={{flex: 1}}
            disabled={disabled}
            onPress={() => onPress(1)}
            blurModeOn={blurModeOn}
            borderTopRightRadius={4}
            borderBottomRightRadius={4}
          />
        </>
      )}
      {imgData.length === 3 && (
        <>
          <SquareImage
            imgUri={imgData && imgData[0][1].image}
            height={heightPercentage(heightType2)}
            containerStyle={{
              flex: 1,
            }}
            disabled={disabled}
            onPress={() => onPress(0)}
            blurModeOn={blurModeOn}
            borderTopLeftRadius={4}
            borderBottomLeftRadius={4}
          />
          <Gap width={3} />
          <View style={styles.imageContainer}>
            <SquareImage
              imgUri={imgData && imgData[1][1].image}
              height={heightPercentage(height)}
              containerStyle={{
                flex: 1,
              }}
              disabled={disabled}
              onPress={() => onPress(1)}
              blurModeOn={blurModeOn}
              borderTopRightRadius={4}
            />
            <Gap height={3} />
            <SquareImage
              imgUri={imgData && imgData[2][1].image}
              height={heightPercentage(height)}
              containerStyle={{
                flex: 1,
              }}
              disabled={disabled}
              onPress={() => onPress(2)}
              blurModeOn={blurModeOn}
              borderBottomRightRadius={4}
            />
          </View>
        </>
      )}
      {imgData.length === 4 && (
        <>
          <View style={styles.imageContainer}>
            <SquareImage
              imgUri={imgData && imgData[0][1].image}
              height={heightPercentage(height)}
              disabled={disabled}
              onPress={() => onPress(0)}
              blurModeOn={blurModeOn}
              borderTopLeftRadius={4}
            />
            <Gap height={3} />
            <SquareImage
              imgUri={imgData && imgData[2][1].image}
              height={heightPercentage(height)}
              disabled={disabled}
              onPress={() => onPress(2)}
              blurModeOn={blurModeOn}
              borderBottomLeftRadius={4}
            />
          </View>
          <Gap width={3} />
          <View style={styles.imageContainer}>
            <SquareImage
              imgUri={imgData && imgData[1][1].image}
              height={heightPercentage(height)}
              disabled={disabled}
              onPress={() => onPress(1)}
              blurModeOn={blurModeOn}
              borderTopRightRadius={4}
            />
            <Gap height={3} />
            <SquareImage
              imgUri={imgData && imgData[3][1].image}
              height={heightPercentage(height)}
              disabled={disabled}
              onPress={() => onPress(3)}
              blurModeOn={blurModeOn}
              borderBottomRightRadius={4}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  imageContainer: {flex: 1},
});
