import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Gap} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import {PlayPinkIcon} from '../../../../assets/icon';
import MusiciansListCard from '../../../../components/molecule/ListCard/MusiciansListCard';
import {MusicianListData} from '../../../../data/topMusician';

const YourTopFans = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <PlayPinkIcon />
          <Gap width={12} />
          <Text style={styles.value}>
            {t('Home.Tab.Analytic.Fans.TopFans.Title')}
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.link}>
            {t('Home.Tab.Analytic.Fans.TopFans.Link')}
          </Text>
        </TouchableOpacity>
      </View>
      <Gap height={23} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={MusicianListData}
        renderItem={({item, index}) => (
          <MusiciansListCard
            musicianNum={item.musicNum}
            onPressMore={() => {}}
            activeMore={false}
            onPressImage={() => {}}
            musicianName={item.fullname}
            imgUri={item.imageProfileUrl}
            point={item.point}
            containerStyles={{marginBottom: widthResponsive(12)}}
          />
        )}
      />
    </View>
  );
};

export default YourTopFans;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontFamily: font.InterRegular,
    fontSize: mvs(18),
    fontWeight: '600',
    color: color.Neutral[20],
    lineHeight: mvs(28),
  },
  link: {
    fontFamily: font.InterRegular,
    fontSize: mvs(11),
    fontWeight: '500',
    color: color.Success[400],
    lineHeight: mvs(28),
  },
});
