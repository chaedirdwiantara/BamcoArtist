import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {
  heightPercentage,
  heightResponsive,
  normalize,
  widthPercentage,
} from '../../../utils';
import {font} from '../../../theme';
import Color from '../../../theme/Color';
import {ListDataSearchFans} from '../../../interface/search.interface';
import {EmptyState} from '../../../components';
import MusicianSection from '../../../components/molecule/MusicianSection/MusicianSection';
import {mvs} from 'react-native-size-matters';

interface FansListProps {
  dataList: ListDataSearchFans[];
  isLoading: boolean;
  isRefetching: boolean;
}

export const FansListMusician: React.FC<FansListProps> = ({
  dataList,
  isLoading,
  isRefetching,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.root}>
      {dataList.map((item, index) => (
        <MusicianSection
          key={index}
          musicianNum={(index + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          musicianName={item.fullname}
          imgUri={
            item.imageProfileUrls.length > 0
              ? item.imageProfileUrls[0].image
              : ''
          }
          containerStyles={{marginTop: mvs(20)}}
          userId={item.uuid}
          activeMore={false}
          type={item.followersType}
          point={item.point}
        />
      ))}
      {!isLoading && !isRefetching && dataList.length === 0 && (
        <EmptyState
          text={t('EmptyState.Search.Fans') || ''}
          containerStyle={styles.containerEmpty}
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
  ListContainer: {
    paddingBottom: heightPercentage(400),
  },
  containerEmpty: {
    flex: 0,
    height: heightResponsive(500),
  },
});
