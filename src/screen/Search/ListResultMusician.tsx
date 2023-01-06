import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';
import {mvs} from 'react-native-size-matters';
import {ListDataSearchMusician} from '../../interface/search.interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';

interface ListResultMusicianProps {
  dataSearchMusicians: ListDataSearchMusician[];
}

const ListResultMusician: FC<ListResultMusicianProps> = (
  props: ListResultMusicianProps,
) => {
  const {dataSearchMusicians} = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleOnPress = (id: string) => {
    navigation.navigate('MusicianProfile', {id});
  };

  return (
    <FlatList
      data={dataSearchMusicians}
      renderItem={({item, index}) => (
        <TouchableOpacity onPress={() => handleOnPress(item.uuid)}>
          <MusicianSection
            musicianNum={(index + 1).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            musicianName={item?.fullname}
            imgUri={item?.imageProfileUrl}
            containerStyles={{marginTop: mvs(20)}}
            musicianId={item?.uuid}
            followerMode
            followersCount={item?.followers}
            activeMore={false}
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default ListResultMusician;

const styles = StyleSheet.create({});
