import {FlatList, StyleSheet, Text} from 'react-native';
import React, {useCallback} from 'react';
import {ListCard} from '../../components';
import {mvs} from 'react-native-size-matters';
import {color, font} from '../../theme';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {useFocusEffect} from '@react-navigation/native';

const ListToFollowMusician = () => {
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

  return (
    <>
      <Text style={styles.textStyle}>People who might fit your interest</Text>
      <FlatList
        data={dataMusician}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <ListCard.FollowMusician
            musicianName={item.fullname}
            imgUri={`${item.imageProfileUrl}`}
            followerCount={item.followers}
            followOnPress={() =>
              item.isFollowed
                ? setUnfollowMusician({musicianID: item.uuid})
                : setFollowMusician({musicianID: item.uuid})
            }
            stateButton={item.isFollowed ? true : false}
            containerStyles={{marginTop: mvs(20)}}
          />
        )}
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
