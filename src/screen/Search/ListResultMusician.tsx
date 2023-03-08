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
import {KeywordProps} from '../../interface/search.interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {useSearchHook} from '../../hooks/use-search.hook';
import {useQuery} from 'react-query';
import Color from '../../theme/Color';
import {heightPercentage, heightResponsive} from '../../utils';
import {EmptyState} from '../../components';
import {useTranslation} from 'react-i18next';

const ListResultMusician: FC<KeywordProps> = ({keyword}: KeywordProps) => {
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
    getSearchMusicians({keyword: keyword}),
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <View style={styles.container}>
      {(isRefetching || isLoading) && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ListContainer}
        data={dataSearchMusicians?.data}
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
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !isLoading && !isRefetching ? (
            <EmptyState
              text={t('EmptyState.Search.Musician') || ''}
              containerStyle={styles.containerEmpty}
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

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentage(8),
    width: '100%',
    height: '100%',
  },
  ListContainer: {
    paddingBottom: heightPercentage(400),
  },
  loading: {
    color: Color.Neutral[10],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: heightPercentage(50),
  },
  containerEmpty: {
    flex: 0,
    height: heightResponsive(500),
  },
});
