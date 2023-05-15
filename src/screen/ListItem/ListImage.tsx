import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ListItem} from './components/ListItem';
import {SquareImageText} from '../../components';
import {RootStackParams} from '../../navigations';
import {storage} from '../../hooks/use-storage.hook';
import {useBackHandler} from '../../utils/useBackHandler';
import {useSettingHook} from '../../hooks/use-setting.hook';
import {heightPercentage, widthPercentage} from '../../utils';

type ListImageProps = NativeStackScreenProps<RootStackParams, 'ListImage'>;

export const ListImageScreen: React.FC<ListImageProps> = ({
  route,
  navigation,
}: ListImageProps) => {
  const {title, containerStyle, filterBy} = route.params;
  const {
    isLoading,
    listGenre,
    listMood,
    getListMoodPublic,
    getListGenrePublic,
  } = useSettingHook();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const listData = filterBy === 'mood' ? listMood : listGenre;

  useEffect(() => {
    if (filterBy === 'mood') {
      getListMoodPublic({page: 0, perPage: 30});
    } else {
      getListGenrePublic({page: 0, perPage: 30});
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing]);

  const goToListSong = (name: string, id: number) => {
    navigation.navigate('ListMusic', {
      title: name,
      type: 'song',
      fromMainTab: false,
      id,
      filterBy,
    });
  };

  const children = () => {
    return (
      <FlatList
        data={listData.sort((a, b) => (a.name > b.name ? 1 : -1)) ?? []}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.containerFlatlist}
        renderItem={({item, index}) => (
          <SquareImageText
            key={index}
            imgUri={item.imageUrls[2].image}
            text={item.name}
            containerStyle={styles.containerImage}
            onPress={() => goToListSong(item.name, item.id)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
        ListFooterComponent={<View style={{height: heightPercentage(20)}} />}
      />
    );
  };

  const onPressHidePlayer = () => {
    storage.set('withoutBottomTab', false);
    navigation.goBack();
  };

  useBackHandler(() => {
    onPressHidePlayer();
    return true;
  });

  return (
    <ListItem
      title={title}
      children={children()}
      containerStyle={containerStyle}
      onPressBack={onPressHidePlayer}
      isLoading={isLoading || refreshing}
    />
  );
};

const styles = StyleSheet.create({
  containerFlatlist: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImage: {
    width: '45%',
    height: heightPercentage(80),
    marginHorizontal: widthPercentage(7),
    marginVertical: heightPercentage(8),
  },
});
