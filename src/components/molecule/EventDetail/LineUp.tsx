import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import MusicianSection from '../../../components/molecule/MusicianSection/MusicianSection';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {useSearchHook} from '../../../hooks/use-search.hook';
import {useQuery} from 'react-query';
import Color from '../../../theme/Color';
import {heightPercentage, heightResponsive} from '../../../utils';
import {EmptyState} from '../../../components';
import {useTranslation} from 'react-i18next';
import LoadingSpinner from '../../../components/atom/Loading/LoadingSpinner';

const LineUp: React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleOnPress = (id: string) => {
    navigation.navigate('MusicianProfile', {id});
  };

  //   TODO: change function to get line up from api detail
  const {getSearchMusicians} = useSearchHook();

  const {
    data: dataSearchMusicians,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery(['/search-musician'], () =>
    getSearchMusicians({keyword: '', perPage: 3}),
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      {(isRefetching || isLoading) && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
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
      />
    </View>
  );
};

export default LineUp;

const styles = StyleSheet.create({
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
});
