import {FlatList, StyleSheet, Text} from 'react-native';
import React, {useCallback} from 'react';
import {ListCard} from '../../components';
import {mvs} from 'react-native-size-matters';
import {color, font} from '../../theme';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {profileStorage} from '../../hooks/use-storage.hook';
import {useTranslation} from 'react-i18next';

const ListToFollowMusician = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {
    setFollowMusician,
    setUnfollowMusician,
    getListDataMusician,
    dataMusician,
  } = useMusicianHook();

  useFocusEffect(
    useCallback(() => {
      getListDataMusician();
    }, []),
  );

  const handleToDetailMusician = (id: string) => {
    navigation.navigate('MusicianProfile', {id});
  };

  return (
    <>
      <Text style={styles.textStyle}>{t('Musician.Label.Musicians')}</Text>
      <FlatList
        data={dataMusician}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) =>
          item.uuid !== profileStorage()?.uuid ? (
            <ListCard.FollowMusician
              toDetailOnPress={() => handleToDetailMusician(item.uuid)}
              musicianName={item.fullname}
              imgUri={item.imageProfileUrls}
              followerCount={item.followers}
              followOnPress={() =>
                item.isFollowed
                  ? setUnfollowMusician(
                      {musicianID: item.uuid},
                      {filterBy: 'top'},
                      true,
                    )
                  : setFollowMusician(
                      {musicianID: item.uuid},
                      {filterBy: 'top'},
                      true,
                    )
              }
              stateButton={item.isFollowed}
              containerStyles={{marginTop: mvs(20)}}
            />
          ) : null
        }
      />
    </>
  );
};

export default ListToFollowMusician;

const styles = StyleSheet.create({
  textStyle: {
    color: color.Success[500],
    fontSize: mvs(15),
    fontFamily: font.InterRegular,
    fontWeight: '500',
  },
});
