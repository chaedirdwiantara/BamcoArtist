import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {EmptyState, ListCard} from '../../components';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {useQuery} from 'react-query';
import {useSearchHook} from '../../hooks/use-search.hook';
import Color from '../../theme/Color';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {useTranslation} from 'react-i18next';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {font} from '../../theme';
import {dateFormat, dateFormatFullYear} from '../../utils/date-format';

interface Props {
  keyword: string;
  listType?: 'suggest';
}

const ListResultLiveEvent: FC<Props> = ({keyword, listType}: Props) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleOnPress = (eventId: string) => {
    navigation.navigate('EventDetail', {id: eventId});
  };

  const {getSearchLiveEvent} = useSearchHook();

  const {
    data: dataSearchLiveEvent,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery(['/search-live-event'], () =>
    getSearchLiveEvent({
      keyword: keyword,
      perPage: listType === 'suggest' ? 3 : undefined,
    }),
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
  return (
    <View style={styles(listType).container}>
      {(isRefetching || isLoading) && (
        <View style={styles().loadingContainer}>
          <LoadingSpinner />
        </View>
      )}

      {listType === 'suggest' &&
      dataSearchLiveEvent?.data &&
      dataSearchLiveEvent?.data.length > 0 ? (
        <Text style={styles().titleTab}>Event</Text>
      ) : null}

      <FlatList
        contentContainerStyle={styles(listType).ListContainer}
        showsVerticalScrollIndicator={false}
        data={dataSearchLiveEvent?.data ?? []}
        scrollEnabled={listType === 'suggest' ? false : true}
        renderItem={({item, index}) => (
          <ListCard.MusicList
            imgUri={item.imageCover[0]?.image ?? null}
            musicTitle={item.name}
            singerName={`${item.locationCity}, ${dateFormatFullYear(
              item.startDate,
            )}`}
            containerStyles={{marginTop: mvs(20)}}
            onPressCard={() => handleOnPress(item.id)}
            hideDropdownMore
          />
        )}
        ListEmptyComponent={
          !isLoading && !isRefetching && listType !== 'suggest' ? (
            <EmptyState
              text={t('EmptyState.Search.Song') || ''}
              containerStyle={styles().containerEmpty}
            />
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      />
    </View>
  );
};

export default ListResultLiveEvent;

const styles = (listType?: 'suggest') =>
  StyleSheet.create({
    container: {
      marginTop: widthResponsive(16),
      width: '100%',
      marginBottom: widthResponsive(16),
    },
    ListContainer: {
      paddingBottom: listType !== 'suggest' ? widthResponsive(400) : undefined,
    },
    loading: {
      color: Color.Neutral[10],
    },
    loadingContainer: {
      alignItems: 'center',
      paddingVertical: heightPercentage(20),
    },
    containerEmpty: {
      flex: 0,
      height: heightResponsive(500),
    },
    titleTab: {
      fontSize: mvs(14),
      color: Color.Neutral[10],
      fontFamily: font.InterRegular,
      fontWeight: '500',
    },
  });
