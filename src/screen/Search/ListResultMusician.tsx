import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {useSearchHook} from '../../hooks/use-search.hook';
import {useQuery} from 'react-query';
import Color from '../../theme/Color';
import {widthResponsive} from '../../utils';
import {EmptyState} from '../../components';
import {useTranslation} from 'react-i18next';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {font} from '../../theme';

interface Props {
  keyword: string;
  listType?: 'suggest';
}

const ListResultMusician: FC<Props> = ({keyword, listType}: Props) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleOnPress = (id: string) => {
    navigation.navigate('MusicianProfile', {id});
  };

  const {getSearchMusicians} = useSearchHook();

  const {
    data: dataSearchMusicians,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery(['/search-musician'], () =>
    getSearchMusicians({
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
      dataSearchMusicians?.data &&
      dataSearchMusicians?.data.length > 0 ? (
        <Text style={styles().titleTab}>Musician</Text>
      ) : null}

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles(listType).ListContainer}
        data={dataSearchMusicians?.data}
        scrollEnabled={listType === 'suggest' ? false : true}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => handleOnPress(item.uuid)}>
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
              containerStyles={{marginTop: mvs(20)}}
              userId={item?.uuid}
              followerMode
              followersCount={item?.followers}
              activeMore={false}
              isHideNum
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !isLoading && !isRefetching && listType !== 'suggest' ? (
            <EmptyState
              text={t('EmptyState.Search.Musician') || ''}
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

export default ListResultMusician;

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
      paddingVertical: widthResponsive(20),
    },
    containerEmpty: {
      flex: 0,
      height: widthResponsive(500),
    },
    titleTab: {
      fontSize: mvs(14),
      color: Color.Neutral[10],
      fontFamily: font.InterRegular,
      fontWeight: '500',
    },
  });
