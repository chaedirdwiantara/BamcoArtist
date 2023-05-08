import React from 'react';
import {View, StyleSheet} from 'react-native';
import Color from '../../../theme/Color';
import {useSearchHook} from '../../../hooks/use-search.hook';
import {useInfiniteQuery} from 'react-query';
import {FansListMusician} from './ListFansMusician';
import {EmptyState} from '../../../components';
import {heightPercentage} from '../../../utils';

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
  } = useInfiniteQuery(['/list-fans', uuid], ({pageParam = 1}) =>
    getListMusiciansFans({uuid, page: pageParam}),
  );

  return (
    <View style={styles.root}>
      {dataFans?.pages[0] && dataFans?.pages[0]?.data.length > 0 ? (
        <FansListMusician
          dataList={dataFans?.pages?.map((page: any) => page.data).flat() ?? []}
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
