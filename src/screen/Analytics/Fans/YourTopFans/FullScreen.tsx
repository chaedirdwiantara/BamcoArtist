import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {widthResponsive} from '../../../../utils';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {PlayPinkIcon} from '../../../../assets/icon';
import {Gap, TopNavigation} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';
import {MusicianListData} from '../../../../data/topMusician';
import MusiciansListCard from '../../../../components/molecule/ListCard/MusiciansListCard';

const YourTopFansScreen = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <TopNavigation.Type1
        title={`${t('Home.Tab.Analytic.Fans.TopFans.FullScreen')}`}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={color.Neutral[10]}
        containerStyles={{
          borderBottomWidth: 1,
          borderBottomColor: color.Dark[400],
        }}
      />
      <View style={styles.bodyContainer}>
        <View style={styles.topContainer}>
          <View style={styles.titleContainer}>
            <PlayPinkIcon />
            <Gap width={12} />
            <Text style={styles.value}>
              {t('Home.Tab.Analytic.Fans.TopFans.Title')}
            </Text>
          </View>
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
              onPressImage={() =>
                navigation.navigate('OtherUserProfile', {id: item.uuid})
              }
              musicianName={item.fullname}
              imgUri={item.imageProfileUrl}
              point={item.point}
              containerStyles={{marginBottom: widthResponsive(12)}}
            />
          )}
        />
      </View>
    </View>
  );
};

export default YourTopFansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  bodyContainer: {
    margin: widthResponsive(20),
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
