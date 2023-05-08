import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {
  width,
  normalize,
  widthPercentage,
  heightPercentage,
  heightResponsive,
} from '../../../utils';
import {
  Gap,
  Avatar,
  SearchBar,
  EmptyState,
  TopNavigation,
} from '../../../components';
import {font} from '../../../theme';
import Color from '../../../theme/Color';
import {ArrowLeftIcon, DefaultAvatar} from '../../../assets/icon';
import {ListDataSearchFans} from '../../../interface/search.interface';
import LoadingSpinner from '../../../components/atom/Loading/LoadingSpinner';

interface FollowersListProps {
  onPressGoBack: () => void;
  dataList: ListDataSearchFans[];
  search: string;
  setSearch: (value: string) => void;
  goToDetail: (type: 'fans' | 'musician', value: string) => void;
  loadMore: () => void;
  isLoading: boolean;
  isRefetching: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
  myUUID: string | undefined;
}

export const FollowersList: React.FC<FollowersListProps> = ({
  dataList,
  onPressGoBack,
  search,
  setSearch,
  goToDetail,
  loadMore,
  isLoading,
  isRefetching,
  isFetchingNextPage,
  refetch,
  myUUID,
}) => {
  const {t} = useTranslation();
  const [listFollowing, setListFollowing] = useState(dataList);

  useEffect(() => {
    if (dataList !== undefined) {
      setListFollowing(dataList);
    }
  }, [dataList]);

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('General.Followers')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />
      <SearchBar
        value={search}
        onChangeText={(text: string) => setSearch(text)}
        containerStyle={{
          paddingHorizontal: widthPercentage(20),
          paddingVertical: heightPercentage(20),
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: heightResponsive(25)}}
        onTouchEnd={loadMore}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={refetch}
            onLayout={e => console.log(e.nativeEvent)}
            tintColor="transparent"
            colors={['transparent']}
            style={{backgroundColor: 'transparent'}}
          />
        }>
        {(isRefetching || isLoading) && !isFetchingNextPage && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}

        {isLoading ? null : listFollowing.length > 0 ? (
          listFollowing
            .filter(val => val !== null)
            .map((val, i) => (
              <TouchableOpacity
                key={i}
                style={styles.listContainer}
                onPress={() => goToDetail(val.followersType, val.uuid)}>
                {val.imageProfileUrls === null ||
                val.imageProfileUrls.length === 0 ? (
                  <DefaultAvatar.MusicianIcon />
                ) : (
                  <Avatar
                    imgUri={val.imageProfileUrls[0].image}
                    size={widthPercentage(44)}
                  />
                )}
                <Gap width={10} />
                <View style={styles.textContainer}>
                  <Text style={styles.musicianName} numberOfLines={1}>
                    {val.fullname}
                  </Text>

                  {val.uuid === myUUID && (
                    <Text style={styles.followerCount} numberOfLines={1}>
                      {t('General.ItsMe')}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))
        ) : (
          <EmptyState
            text={t('EmptyState.NoFollowersTitle') || ''}
            subtitle={t('EmptyState.NoFollowersSubtitle') || ''}
            containerStyle={{
              marginTop: heightPercentage(30),
              alignSelf: 'center',
            }}
          />
        )}

        {isFetchingNextPage && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  textVersion: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
    paddingTop: heightPercentage(15),
  },
  textSignOut: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
  },
  containerSignout: {
    flexDirection: 'row',
    paddingLeft: widthPercentage(15),
    position: 'absolute',
    bottom: heightPercentage(20),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  musicianName: {
    fontFamily: font.InterRegular,
    fontSize: normalize(14),
    fontWeight: '500',
    color: Color.Neutral[10],
  },
  followerCount: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: Color.Dark[50],
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    width,
    paddingHorizontal: widthPercentage(20),
    flexDirection: 'row',
    marginBottom: heightPercentage(15),
  },
});
