import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ListItem} from './components/ListItem';
import {SquareImageText} from '../../components';
import {RootStackParams} from '../../navigations';
import {heightPercentage, widthPercentage} from '../../utils';

type ListImageProps = NativeStackScreenProps<RootStackParams, 'ListImage'>;

export const ListImageScreen: React.FC<ListImageProps> = ({
  route,
  navigation,
}: ListImageProps) => {
  const {title, data, containerStyle} = route.params;

  const goToListSong = (name: string) => {
    navigation.navigate('ListMusic', {title: name, id: 1, type: 'song'});
  };

  const children = () => {
    return (
      <FlatList
        data={data ?? []}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.containerFlatlist}
        renderItem={({item, index}) => (
          <SquareImageText
            key={index}
            imgUri={
              'https://media.istockphoto.com/id/510463404/id/foto/sungai-bow-yang-tenang.jpg?s=612x612&w=0&k=20&c=MzqOzZHf5mG7ZtfLdWCdv-DbVSMPApNecPUT3Tr4QCU='
            }
            text={item.name}
            containerStyle={styles.containerImage}
            onPress={() => goToListSong(item.name)}
          />
        )}
      />
    );
  };

  return (
    <ListItem
      title={title}
      children={children()}
      containerStyle={containerStyle}
    />
  );
};

const styles = StyleSheet.create({
  containerFlatlist: {
    flex: 1,
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
