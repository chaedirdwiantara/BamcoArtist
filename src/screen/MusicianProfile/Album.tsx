import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

import SquareComp from './SquareComp';
import {color, font} from '../../theme';
import {Gap, Title} from '../../components';
import {dummySongImg} from '../../data/image';
import {RootStackParams} from '../../navigations';
import {AlbumData} from '../../interface/musician.interface';
import {heightResponsive, widthResponsive} from '../../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface AlbumProps {
  title: string;
  data: AlbumData[];
  errorText: string;
  artistName: string;
}

const Album: FC<AlbumProps> = (props: AlbumProps) => {
  const {title, data, errorText, artistName} = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleToDetail = (dataAlbum: AlbumData) => {
    navigation.navigate('Album', dataAlbum);
  };

  return (
    <View style={{marginHorizontal: widthResponsive(24)}}>
      <Title textStyle={{fontSize: mvs(13)}} text={title} />
      <Gap height={12} />
      {data?.length > 0 ? (
        <View>
          {data.map((item, i) => (
            <TouchableOpacity
              style={styles.container}
              onPress={() => handleToDetail(item)}
              testID={`album${i}`}>
              <SquareComp
                imgUri={
                  item.imageUrl.length !== 0
                    ? item.imageUrl[0].image
                    : dummySongImg
                }
                size={widthResponsive(56)}
              />
              <View style={styles.textContainer}>
                <Text style={styles.songTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Gap height={4} />
                <Text style={styles.songDesc} numberOfLines={1}>
                  {`by ${artistName}`}
                </Text>
              </View>
              {/* <Dropdown.More
              data={dataFilter ? dataFilter : dataMore}
              selectedMenu={onPressMore}
              containerStyle={{
                width: widthPercentage(120),
                marginLeft: widthPercentage(-110),
                marginTop: heightPercentage(-8),
              }}
            /> */}
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.captionStyle}>{errorText}</Text>
      )}
    </View>
  );
};

export default Album;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightResponsive(16),
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
  captionStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: ms(14),
  },
});
