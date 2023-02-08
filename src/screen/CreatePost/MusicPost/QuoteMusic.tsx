import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {ListCard, TopNavigation} from '../../../components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {color} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {useSearchHook} from '../../../hooks/use-search.hook';
import {ListDataSearchSongs} from '../../../interface/search.interface';
import {widthResponsive} from '../../../utils';
import {profileStorage} from '../../../hooks/use-storage.hook';
import {dummySongImg} from '../../../data/image';

const QuoteMusic = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {dataSearchSongs, getSearchSongs} = useSearchHook();

  useFocusEffect(
    useCallback(() => {
      getSearchSongs({uuid: profileStorage()?.uuid});
    }, []),
  );

  const handleOnPress = (data: ListDataSearchSongs) => {
    navigation.navigate('CreatePost', data);
  };

  return (
    <View style={styles.container}>
      <TopNavigation.Type1
        title="Quote Music"
        maxLengthTitle={20}
        itemStrokeColor={'white'}
        leftIconAction={navigation.goBack}
      />
      <View style={styles.bodyContainer}>
        <FlatList
          data={dataSearchSongs}
          renderItem={({item, index}) => (
            <ListCard.MusicList
              imgUri={
                item.imageUrl.length !== 0
                  ? item.imageUrl[0].image
                  : dummySongImg
              }
              musicNum={(index + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              musicTitle={item.title}
              singerName={item.musicianName}
              containerStyles={{marginTop: mvs(20)}}
              onPressCard={() => handleOnPress(item)}
              hideDropdownMore
            />
          )}
        />
      </View>
    </View>
  );
};

export default QuoteMusic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  bodyContainer: {
    paddingHorizontal: widthResponsive(23),
  },
});
