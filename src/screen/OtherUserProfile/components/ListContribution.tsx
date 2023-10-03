import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FlashList} from '@shopify/flash-list';
import {mvs} from 'react-native-size-matters';

import {heightPercentage} from '../../../utils';
import {EmptyState} from '../../../components';
import {useMusicianHook} from '../../../hooks/use-musician.hook';
import MusicianSection from '../../../components/molecule/MusicianSection/MusicianSection';
import {MusicianList} from '../../../interface/musician.interface';
import LoadingSpinner from '../../../components/atom/Loading/LoadingSpinner';

export interface ListContributonProps {
  uuid: string;
}

const ListContributionToMusician: FC<ListContributonProps> = (
  props: ListContributonProps,
) => {
  const {t} = useTranslation();
  const {useListContribution} = useMusicianHook();
  const [dataContribution, setDataContribution] = useState<MusicianList[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useListContribution(totalPage, {fansUUID: props.uuid});

  useEffect(() => {
    if (data?.pages?.[0] !== undefined) {
      setDataContribution(
        data?.pages?.flatMap((page: any) => page?.data ?? []) ?? [],
      );
      const total = Math.ceil(data?.pages?.[0]?.meta.total ?? 1);
      setTotalPage(total);
    } else {
      setDataContribution([]);
      setTotalPage(1);
    }
  }, [data]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={dataContribution}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: MusicianList) => item?.uuid?.toString()}
        onTouchEnd={loadMore}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              text={t('Profile.Label.NoMusician') || ''}
              containerStyle={{marginVertical: heightPercentage(30)}}
            />
          ) : (
            <View style={styles.loadingContainer}>
              <LoadingSpinner />
            </View>
          )
        }
        renderItem={({item, index}) => (
          <MusicianSection
            musicianNum={(index + 1).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            musicianName={item?.fullname}
            imgUri={
              item.imageProfileUrls.length > 0
                ? item.imageProfileUrls[0].image
                : ''
            }
            containerStyles={styles.containerListContribution}
            userId={item?.uuid}
            followersCount={item?.followers}
            activeMore={false}
            point={item.credit}
          />
        )}
        estimatedItemSize={150}
      />
      {(isLoading || isRefetching || isFetchingNextPage) && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      )}
    </View>
  );
};

export default ListContributionToMusician;

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentage(8),
    width: '100%',
    height: '100%',
  },
  listContainer: {
    paddingBottom: heightPercentage(20),
  },
  containerListContribution: {
    marginTop: mvs(20),
    width: '100%',
    alignSelf: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingTop: heightPercentage(20),
  },
});
