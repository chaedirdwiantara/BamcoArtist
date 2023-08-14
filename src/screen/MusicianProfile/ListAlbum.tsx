import React, {FC} from 'react';
import {ScrollView, View, ViewStyle} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

import {Gap, Title} from '../../components';
import {RootStackParams} from '../../navigations';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ListAlbumCard from '../../components/molecule/ListCard/ListAlbumCard';
import {AlbumData, AppearsOnDataType} from '../../interface/musician.interface';

interface ListAlbumProps {
  title: string;
  data: AlbumData[] | AppearsOnDataType[];
  containerStyles?: ViewStyle;
}

const ListAlbum: FC<ListAlbumProps> = (props: ListAlbumProps) => {
  const {title, data, containerStyles} = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleToDetail = (dataAlbum: AlbumData | AppearsOnDataType) => {
    navigation.push('Album', dataAlbum);
  };

  return (
    <View style={containerStyles}>
      <Title textStyle={{fontSize: mvs(13)}} text={title} />
      <Gap height={mvs(12)} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, i) => (
          <ListAlbumCard
            key={i}
            title={item.title}
            year={item.productionYear}
            albumType={item?.albumType || 'Album'}
            imgUri={item.imageUrl.length > 0 ? item.imageUrl[2].image : ''}
            onPress={() => handleToDetail(item)}
            containerStyle={{marginRight: ms(12)}}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ListAlbum;
