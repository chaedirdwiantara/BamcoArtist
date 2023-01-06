import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Gap, SquareImage} from '../../components';
import {heightPercentage, widthResponsive} from '../../utils';

interface ImageListProps {
  disabled?: boolean;
  onPress: (uri: number) => void;
  width: number;
  height: number;
  heightType2?: number;
  widthType2?: number;
  imgData: any;
}

const ImageList: FC<ImageListProps> = (props: ImageListProps) => {
  const {
    disabled = true,
    onPress,
    imgData,
    width = 162,
    height = 79,
    heightType2 = 161,
    widthType2 = 327,
  } = props;

  return (
    <View style={styles.container}>
      {imgData.length === 1 && (
        <>
          <SquareImage
            imgUri={imgData && imgData[0]}
            size={widthResponsive(widthType2)}
            height={heightPercentage(heightType2)}
            containerStyle={{
              marginRight: widthResponsive(3),
            }}
            disabled={disabled}
            onPress={() => onPress(0)}
          />
        </>
      )}
      {imgData.length === 2 && (
        <>
          <SquareImage
            imgUri={imgData && imgData[0]}
            size={widthResponsive(width, 375)}
            height={heightPercentage(heightType2)}
            containerStyle={{
              marginRight: widthResponsive(3),
            }}
            disabled={disabled}
            onPress={() => onPress(0)}
          />
          <SquareImage
            imgUri={imgData && imgData[1]}
            size={widthResponsive(width, 375)}
            height={heightPercentage(heightType2)}
            containerStyle={{
              marginRight: widthResponsive(3),
            }}
            disabled={disabled}
            onPress={() => onPress(1)}
          />
        </>
      )}
      {imgData.length === 3 && (
        <>
          <SquareImage
            imgUri={imgData && imgData[0]}
            size={widthResponsive(width, 375)}
            height={heightPercentage(heightType2)}
            containerStyle={{
              marginRight: widthResponsive(3),
            }}
            disabled={disabled}
            onPress={() => onPress(0)}
          />
          <View>
            <SquareImage
              imgUri={imgData && imgData[1]}
              size={widthResponsive(width, 375)}
              height={heightPercentage(height)}
              disabled={disabled}
              onPress={() => onPress(1)}
            />
            <Gap height={3} />
            <SquareImage
              imgUri={imgData && imgData[2]}
              size={widthResponsive(width, 375)}
              height={heightPercentage(height)}
              disabled={disabled}
              onPress={() => onPress(2)}
            />
          </View>
        </>
      )}
      {imgData.length === 4 && (
        <>
          <View>
            <SquareImage
              imgUri={imgData && imgData[0]}
              size={widthResponsive(width, 375)}
              height={heightPercentage(height)}
              disabled={disabled}
              onPress={() => onPress(0)}
            />
            <Gap height={3} />
            <SquareImage
              imgUri={imgData && imgData[2]}
              size={widthResponsive(width, 375)}
              height={heightPercentage(height)}
              disabled={disabled}
              onPress={() => onPress(2)}
            />
          </View>
          <Gap width={3} />
          <View>
            <SquareImage
              imgUri={imgData && imgData[1]}
              size={widthResponsive(width, 375)}
              height={heightPercentage(height)}
              disabled={disabled}
              onPress={() => onPress(1)}
            />
            <Gap height={3} />
            <SquareImage
              imgUri={imgData && imgData[3]}
              size={widthResponsive(width, 375)}
              height={heightPercentage(height)}
              disabled={disabled}
              onPress={() => onPress(3)}
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
    width: '100%',
    flexDirection: 'row',
  },
});
