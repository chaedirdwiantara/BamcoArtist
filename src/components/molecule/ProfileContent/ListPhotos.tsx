import React, {FC} from 'react';
import {Image} from 'react-native-image-crop-picker';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Gap} from '../../../components';
import {color, font} from '../../../theme';
import {ms} from 'react-native-size-matters';
import {widthResponsive} from '../../../utils';
import SquareComp from '../../../screen/MusicianProfile/SquareComp';

interface PhotoProps {
  data: Image[];
  photoOnpress: () => void;
}

const ListPhotos: FC<PhotoProps> = (props: PhotoProps) => {
  const {data, photoOnpress} = props;

  return (
    <View style={{marginHorizontal: widthResponsive(24), width: '100%'}}>
      {data ? (
        <View style={{flexDirection: 'row', width: '100%'}}>
          {data.map((item, i) => (
            <View key={i}>
              {data.length <= 4 && (
                <>
                  <SquareComp imgUri={item.path} size={widthResponsive(76)} />
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
                    <SquareComp imgUri={item.path} size={widthResponsive(76)} />
                  </View>
                  <View style={styles.textNumberStyle}>
                    <Text style={styles.textPhotos}>{`+${
                      data.length - 3
                    }`}</Text>
                  </View>
                </TouchableOpacity>
              ) : data.length > 4 && i < 3 ? (
                <>
                  <SquareComp imgUri={item.path} size={widthResponsive(76)} />
                  <Gap width={8} />
                </>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default ListPhotos;

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
