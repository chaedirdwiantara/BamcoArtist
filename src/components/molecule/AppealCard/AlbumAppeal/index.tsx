import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {widthResponsive} from '../../../../utils';
import {color} from '../../../../theme';
import {ListCard} from '../../ListCard';

interface AlbumAppealProps {
  title: string;
  musician: string;
  coverImage: string;
  duration: string;
  year: number;
  numberOfSongs: number;
}

const AlbumAppeal: FC<AlbumAppealProps> = (props: AlbumAppealProps) => {
  const {title, musician, coverImage, duration} = props;

  // TODO: REMOVE IT LATER YA BAMBANG
  const dummyData: AlbumAppealProps = {
    title: 'ada apaa denganku',
    musician: 'kanjen band',
    coverImage:
      'https://customer-j4g673mr0gncpv44.cloudflarestream.com/ed1a4e286008206514eb9f04eafae29a/thumbnails/thumbnail.jpg',
    duration: '03:00',
    year: 2022,
    numberOfSongs: 10,
  };

  return (
    <ListCard.MusicList
      imgUri={dummyData.coverImage ?? null}
      musicTitle={dummyData.title}
      singerName={`${dummyData.year} * Album * ${dummyData.numberOfSongs} song`}
      containerStyles={styles.componentStyle}
      hideDropdownMore
      appeal
      size={80}
    />
  );
};

export default AlbumAppeal;

const styles = StyleSheet.create({
  componentStyle: {
    backgroundColor: color.Dark[500],
    paddingHorizontal: widthResponsive(7),
    paddingVertical: widthResponsive(8),
    borderRadius: 4,
  },
});
