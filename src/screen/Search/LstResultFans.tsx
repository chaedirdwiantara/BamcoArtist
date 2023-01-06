import {FlatList, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';
import {mvs} from 'react-native-size-matters';
import {ListDataSearchFans} from '../../interface/search.interface';

interface ListResultFansProps {
  dataSearchFans: ListDataSearchFans[];
}

const ListResultFans: FC<ListResultFansProps> = (
  props: ListResultFansProps,
) => {
  const {dataSearchFans} = props;
  return (
    <FlatList
      data={dataSearchFans}
      renderItem={({item, index}) => (
        <MusicianSection
          musicianNum={(index + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          musicianName={item.fullname}
          imgUri={item.imageProfileUrl}
          containerStyles={{marginTop: mvs(20)}}
          musicianId={item.uuid}
          activeMore={false}
        />
      )}
    />
  );
};

export default ListResultFans;

const styles = StyleSheet.create({});
