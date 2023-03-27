import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../../atom';
import {useMusicianHook} from '../../../../hooks/use-musician.hook';
import {useTranslation} from 'react-i18next';
import ReleasedAlbum from '../../../../screen/MusicianProfile/ReleasedAlbum';

interface ReleasedProps {
  uuidMusician: string;
}

const Released: FC<ReleasedProps> = (props: ReleasedProps) => {
  const {uuidMusician} = props;
  const {
    isLoading,
    isError,
    dataDetailMusician,
    dataAlbum,
    dataFollow,
    getDetailMusician,
    getAlbum,
    setFollowMusician,
    setUnfollowMusician,
    setDataFollow,
  } = useMusicianHook();

  useEffect(() => {
    getAlbum({uuid: uuidMusician});
    getDetailMusician({id: uuidMusician});
  }, [uuidMusician]);

  const {t} = useTranslation();

  const noAlbumText = t('EmptyState.NoAlbum');

  return (
    <View>
      <Text style={styles.textComp}>Released This Year</Text>
      <Gap height={16} />
      {dataAlbum && dataDetailMusician ? (
        <ReleasedAlbum
          title={''}
          data={dataAlbum}
          artistName={dataDetailMusician.fullname}
          errorText={noAlbumText}
          noTitle
        />
      ) : null}
    </View>
  );
};

export default Released;

const styles = StyleSheet.create({
  textComp: {
    fontFamily: font.InterRegular,
    fontSize: mvs(16),
    fontWeight: '600',
    color: color.Neutral[10],
  },
});
