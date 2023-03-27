import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {ListItem} from './ListItem';
import {color, font} from '../../../theme';
import {widthPercentage} from '../../../utils';
import {EmptyState} from '../../../components';
import ListSongs from '../../ListCard/ListSongs';
import {useHomeHook} from '../../../hooks/use-home.hook';
import {AlbumData} from '../../../interface/musician.interface';

interface ListAlbumProps {
  title: string;
  goToDetailAlbum: (id: number) => void;
}

export const ListAlbum: React.FC<ListAlbumProps> = ({
  title,
  goToDetailAlbum,
}) => {
  const {t} = useTranslation();
  const {isLoading, dataAlbumComingSoon, getListComingSoon} = useHomeHook();
  useEffect(() => {
    getListComingSoon();
  }, []);

  const children = () => {
    if (isLoading) {
      return null;
    }

    if (dataAlbumComingSoon.length > 0) {
      return (
        <ScrollView>
          <View style={{paddingHorizontal: widthPercentage(20)}}>
            <ListSongs
              dataSong={dataAlbumComingSoon}
              hideDropdownMore={true}
              type="home"
              onPress={(item: AlbumData) => goToDetailAlbum(item.id)}
            />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <EmptyState
          text={t('Home.ComingSoon.EmptyState')}
          containerStyle={styles.containerEmpty}
          textStyle={styles.emptyText}
          hideIcon={true}
        />
      );
    }
  };

  return <ListItem title={title} children={children()} />;
};

const styles = StyleSheet.create({
  containerEmpty: {
    alignSelf: 'center',
  },
  emptyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    textAlign: 'center',
    color: color.Neutral[10],
    lineHeight: mvs(16),
  },
});
