import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Gap} from '../../components';
import ProfileComponent from './ProfileComponent';
import Photo from './Photo';
import Album from './Album';
import {DataDetailMusician} from '../../interface/musician.interface';

interface DataMusicianProps {
  profile: DataDetailMusician;
}

const DataMusician: FC<DataMusicianProps> = (props: DataMusicianProps) => {
  const {profile} = props;

  const noDataText = 'No information given.';
  const noAlbumText = 'No Album Available.';
  const noMerch = 'No Merch Available';

  return (
    <View style={{width: '100%'}}>
      <Gap height={24} />
      <ProfileComponent
        title={'About'}
        content={profile.about ? profile.about : noDataText}
        gap={16}
      />
      <Gap height={24} />
      <ProfileComponent
        title={'Social Media'}
        gap={16}
        socmedSection
        socmed={profile.socialMedia}
      />
      <Gap height={24} />
      <ProfileComponent
        title={'Origin'}
        content={
          profile.originCity && profile.originCountry
            ? `${profile.originCity}, ${profile.originCountry}`
            : noDataText
        }
      />
      <Gap height={24} />
      <ProfileComponent
        title={'Years Active'}
        content={
          profile.yearsActiveFrom && profile.yearsActiveTo
            ? `${profile.yearsActiveFrom} - ${profile.yearsActiveTo}`
            : noDataText
        }
      />
      <Gap height={24} />
      <ProfileComponent
        title={'Members'}
        memberSection
        members={profile.members}
      />
      <Gap height={24} />
      <ProfileComponent title={'Website'} content={profile.website} />
      <Gap height={24} />
      <Photo title={'Photos'} data={profile.photos} />
      <Gap height={24} />
      <Album title={'Album'} data={profile.albums} errorText={noAlbumText} />
      <Gap height={24} />
      <Album title={'Merch'} data={profile.merchs} errorText={noMerch} />
    </View>
  );
};

export default DataMusician;

const styles = StyleSheet.create({});
