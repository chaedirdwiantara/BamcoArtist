import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Gap} from '../../components';
import ProfileComponent from './ProfileComponent';
import Photo from './Photo';
import Album from './Album';
import {
  AlbumData,
  DataDetailMusician,
} from '../../interface/musician.interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {useTranslation} from 'react-i18next';
import {FavoriteGenres} from './FavoriteGenres';

interface DataMusicianProps {
  profile: DataDetailMusician;
  dataAlbum: AlbumData[];
}

const DataMusician: FC<DataMusicianProps> = (props: DataMusicianProps) => {
  const {profile, dataAlbum} = props;
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const noDataText = t('EmptyState.NoInfo');
  const noAlbumText = t('EmptyState.NoAlbum');
  const noMerch = t('EmptyState.NoMerch');

  const userName = profile?.fullname;
  const imageData = profile?.photos;

  const handleOnPress = () => {
    navigation.navigate('PhotoGallery', {imageData, userName, type: 'profile'});
  };

  return (
    <View style={{width: '100%'}}>
      <Gap height={24} />
      <ProfileComponent
        title={t('Musician.Label.About')}
        content={profile.about ? profile.about : noDataText}
        gap={16}
      />

      {profile.genres.length > 0 && (
        <>
          <Gap height={8} />
          <FavoriteGenres favGenres={profile.genres} />
        </>
      )}

      <Gap height={24} />
      <ProfileComponent
        title={t('Musician.Label.Social')}
        gap={16}
        socmedSection
        socmed={profile.socialMedia}
      />
      <Gap height={24} />
      <ProfileComponent
        title={t('Setting.Account.Label.Location')}
        content={
          profile.locationCity && profile.locationCountry
            ? `${profile.locationCity}, ${profile.locationCountry}`
            : noDataText
        }
      />
      <Gap height={24} />
      <ProfileComponent
        title={t('Musician.Label.Active')}
        content={
          profile.yearsActiveFrom && profile.yearsActiveTo
            ? `${profile.yearsActiveFrom} - ${profile.yearsActiveTo}`
            : noDataText
        }
      />
      <Gap height={24} />
      <ProfileComponent
        title={t('Musician.Label.Members')}
        memberSection
        members={profile.members}
      />
      <Gap height={24} />
      <ProfileComponent
        title={t('Musician.Label.Website')}
        websiteSection
        content={profile.website ? profile.website : noDataText}
      />
      <Gap height={24} />
      <Photo
        title={t('Musician.Label.Photos')}
        data={profile.photos}
        photoOnpress={handleOnPress}
      />
      <Gap height={24} />

      <Album
        title={t('Musician.Label.Album')}
        data={dataAlbum}
        artistName={profile.fullname}
        errorText={noAlbumText}
      />
      <Gap height={24} />
      <Album
        title={t('Musician.Label.Merch')}
        data={profile.merchs}
        artistName={profile.fullname}
        errorText={noMerch}
      />
    </View>
  );
};

export default DataMusician;
