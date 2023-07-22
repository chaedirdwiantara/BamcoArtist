import React from 'react';
import {View, StyleSheet} from 'react-native';
import Color from '../../../theme/Color';
import {useSearchHook} from '../../../hooks/use-search.hook';
import {useQuery} from 'react-query';
import {FansListMusician} from './ListFansMusician';
import {EmptyState} from '../..';
import {heightPercentage} from '../../../utils';
import {ListDataFans} from '../../../interface/search.interface';

interface FollowersProps {
  uuid: string;
}

export const FansScreen: React.FC<FollowersProps> = (props: FollowersProps) => {
  const {uuid} = props;
  const {getListMusiciansFans} = useSearchHook();

  const {
    data: dataFans,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery('/list-fans', () => getListMusiciansFans({uuid}));

  return (
    <View style={styles.root}>
      {dataFans?.data && dataFans?.data?.length > 0 ? (
        <FansListMusician
          dataList={dataFans?.data}
          isLoading={isLoading}
          isRefetching={isRefetching}
        />
      ) : (
        <EmptyState
          text={'Musician do not have any fans.'}
          containerStyle={{
            alignSelf: 'center',
            marginTop: heightPercentage(30),
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
