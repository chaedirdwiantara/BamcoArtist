import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import MusicListPreview from '../ChildrenCard/MusicPreview';
import {widthResponsive} from '../../../../utils';
import {color} from '../../../../theme';

interface MusicAppealProps {
  title: string;
  musician: string;
  coverImage: string;
  duration: string;
}

const MusicAppeal: FC<MusicAppealProps> = (props: MusicAppealProps) => {
  const {title, musician, coverImage, duration} = props;

  // TODO: REMOVE IT LATER YA BAMBANG
  const dummyData: MusicAppealProps = {
    title: 'ada apaa denganku',
    musician: 'kanjen band',
    coverImage:
      'https://customer-j4g673mr0gncpv44.cloudflarestream.com/ed1a4e286008206514eb9f04eafae29a/thumbnails/thumbnail.jpg',
    duration: '03:00',
  };

  return (
    <MusicListPreview
      title={dummyData.title}
      musician={dummyData.musician}
      coverImage={dummyData.coverImage}
      duration={dummyData.duration}
      containerStyle={styles.componentStyle}
    />
  );
};

export default MusicAppeal;

const styles = StyleSheet.create({
  componentStyle: {
    paddingVertical: widthResponsive(8),
    paddingHorizontal: widthResponsive(7),
    backgroundColor: color.Dark[500],
  },
});
