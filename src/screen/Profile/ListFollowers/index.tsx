import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Color from '../../../theme/Color';
import {FollowersList} from './ListFollowers';
import {useSearchHook} from '../../../hooks/use-search.hook';
import {MainTabParams, RootStackParams} from '../../../navigations';
import {profileStorage} from '../../../hooks/use-storage.hook';
import {useInfiniteQuery} from 'react-query';

type FollowersProps = NativeStackScreenProps<RootStackParams, 'Followers'>;

export const FollowersScreen: React.FC<FollowersProps> = ({
  route,
}: FollowersProps) => {
  const {uuid} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const {getListFollowers} = useSearchHook();
  const [search, setSearch] = useState<string>('');

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToDetail = (type: 'fans' | 'musician', id: string) => {
    if (id === profileStorage()?.uuid) {
      navigation2.navigate('Profile', {});
    } else {
      if (type === 'fans') {
        navigation.push('OtherUserProfile', {id});
      } else {
        navigation.push('MusicianProfile', {id});
      }
    }
  };

  const {
    data: dataFollowers,
    refetch,
    isRefetching,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['/list-follower', uuid, search],
    ({pageParam = 1}) =>
      getListFollowers({uuid, keyword: search, page: pageParam}),
    {
      getNextPageParam: lastPage => {
        if (lastPage?.meta) {
          const nextPage = lastPage?.meta?.page + 1;
          return nextPage;
        }
        return null;
      },
    },
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    refetch();
  }, [search]);

  return (
    <View style={styles.root}>
      <FollowersList
        search={search}
        setSearch={setSearch}
        dataList={
          dataFollowers?.pages?.map((page: any) => page.data).flat() ?? []
        }
        goToDetail={goToDetail}
        onPressGoBack={onPressGoBack}
        loadMore={loadMore}
        isLoading={isLoading}
        isRefetching={isRefetching}
        isFetchingNextPage={isFetchingNextPage}
        refetch={refetch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
