import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Gap} from '../../../../components';
import {kFormatter, widthResponsive} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {color, font, typography} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {AlbumRow} from '../../../../components/molecule/SongDetailsContent/AlbumRow';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';
import {ListAvatar} from '../../../../components/molecule/SongDetailsContent/ListAvatar';
import {DummySongDetail} from '../../../../data/songDetail';

const SongDescription = () => {
  const {t} = useTranslation();
  const {getSongDesc} = useAnalyticsHook();
  const {
    data: songDescData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('analytic-songDesc', () => getSongDesc({}));
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const dataDetail = DummySongDetail;
  return (
    <View style={styles.container}>
      <AlbumRow
        title={'Rafaela'}
        imgUri={
          'https://cdn-2.tstatic.net/tribunnews/foto/bank/images/gambaran-live-stream-rafaela-di-dalam-game-mobile-legends.jpg'
        }
        createdOn={'2018'}
        onPress={() => {}}
        streamCount={kFormatter(2500)}
        imgSize={80}
      />
      <Gap height={18} />
      <View>
        <ListAvatar
          title={t('Home.Topbar.Search.Musician')}
          text={dataDetail.musicianName}
          avatarUri={dataDetail.album.musician.imageProfile}
          onPress={() => {}}
          uuid={dataDetail.musicianUUID}
        />
        <Gap height={8} />
        {dataDetail.featuring !== null && dataDetail.featuring.length !== 0 ? (
          <ListAvatar
            title={t('Music.Credit.Featuring')}
            featuring
            featuringData={dataDetail.featuring}
            onPress={() => {}}
          />
        ) : null}
        <Gap height={8} />

        <Text style={[typography.Subtitle1, styles.titleContent]}>
          {t('Music.Label.SongDesc')}
        </Text>
        <Text style={styles.description} numberOfLines={7}>
          {dataDetail.description
            ? dataDetail.description
            : t('General.NoDescription')}
        </Text>
      </View>
    </View>
  );
};

export default SongDescription;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  description: {
    fontSize: mvs(13),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    lineHeight: mvs(16),
    paddingTop: widthResponsive(8),
  },
  subtitle: {
    fontSize: mvs(15),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    marginTop: widthResponsive(10),
  },
  titleContent: {
    color: color.Success[500],
  },
});
