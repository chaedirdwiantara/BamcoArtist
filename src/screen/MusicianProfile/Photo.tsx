import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Gap, Title} from '../../components';
import SquareComp from './SquareComp';
import {widthResponsive} from '../../utils';
import {color, font} from '../../theme';
import {ms} from 'react-native-size-matters';

interface PhotoProps {
  title: string;
  data: string[];
  photoOnpress: () => void;
}

const Photo: FC<PhotoProps> = (props: PhotoProps) => {
  const {title, data, photoOnpress} = props;

  return (
    <View style={{marginHorizontal: widthResponsive(24), width: '100%'}}>
      <Title text={title} />
      <Gap height={12} />
      {data ? (
        <View style={{flexDirection: 'row', width: '100%'}}>
          {data.map((item, i) => (
            <>
              {data.length <= 4 && (
                <>
                  <SquareComp imgUri={item} size={widthResponsive(76)} />
                  <Gap width={8} />
                </>
              )}
              {data.length > 4 && i === 3 ? (
                <TouchableOpacity onPress={photoOnpress}>
                  <View
                    style={{
                      backgroundColor: color.Neutral[10],
                      height: widthResponsive(76),
                      width: widthResponsive(76),
                      opacity: 0.2,
                    }}>
                    <SquareComp imgUri={item} size={widthResponsive(76)} />
                  </View>
                  <View style={styles.textNumberStyle}>
                    <Text style={styles.textPhotos}>{`+${
                      data.length - 3
                    }`}</Text>
                  </View>
                </TouchableOpacity>
              ) : data.length > 4 && i < 3 ? (
                <>
                  <SquareComp imgUri={item} size={widthResponsive(76)} />
                  <Gap width={8} />
                </>
              ) : null}
            </>
          ))}
        </View>
      ) : (
        <Text style={styles.captionStyle}>No Photos available</Text>
      )}
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({
  photo: {
    backgroundColor: 'grey',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: widthResponsive(12),
  },
  songTitle: {
    fontFamily: font.InterRegular,
    fontSize: ms(14),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: ms(10),
    color: color.Dark[100],
  },
  textPhotos: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontSize: ms(20),
    fontWeight: '600',
  },
  textNumberStyle: {
    position: 'absolute',
    top: widthResponsive(23),
    left: widthResponsive(23),
  },
  captionStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: ms(12),
  },
});
