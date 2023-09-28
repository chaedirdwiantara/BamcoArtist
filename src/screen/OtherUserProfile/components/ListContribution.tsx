import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';
import {FlashList} from '@shopify/flash-list';
import {mvs} from 'react-native-size-matters';

import {EmptyState} from '../../../components';
import {heightPercentage} from '../../../utils';
import {useMusicianHook} from '../../../hooks/use-musician.hook';
import MusicianSection from '../../../components/molecule/MusicianSection/MusicianSection';

export interface ListContributonProps {
  uuid: string;
}

const ListContributionToMusician: FC<ListContributonProps> = (
  props: ListContributonProps,
) => {
  const {t} = useTranslation();
  const {getListContribution} = useMusicianHook();
  const {data: dataContribution, isLoading} = useQuery(
    ['/list-contribution'],
    () => getListContribution({fansUUID: props.uuid}),
  );

  return (
    <View style={styles.container}>
      {isLoading ? null : dataContribution &&
        dataContribution?.data.length > 0 ? (
        <FlashList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          data={dataContribution.data}
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
      ) : (
        <EmptyState
          text={t('Profile.Label.NoMusicianOther') || ''}
          containerStyle={{marginVertical: heightPercentage(30)}}
        />
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
});
