import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {storage} from '../hooks/use-storage.hook';
import {GuestContent, TabFilter, TopNavigation} from '../components';
import {heightPercentage, widthPercentage, widthResponsive} from '../utils';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {color} from '../theme';
import MerchList from './ListCard/MerchList';
import {BoxStore, CartIcon} from '../assets/icon';
import ConcertList from './ListCard/ConcertList';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';

type EventProps = NativeStackScreenProps<RootStackParams, 'Event'>;

export const EventScreen: React.FC<EventProps> = ({navigation}: EventProps) => {
  const {t} = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'Event.Concert.Title'},
    {filterName: 'Event.Merch.Title'},
  ]);
  const isLogin = storage.getString('profile');

  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.root}>
      {isLogin ? (
        <View>
          <TopNavigation.Type4
            title={t('Event.Title')}
            maxLengthTitle={20}
            itemStrokeColor={'white'}
            rightIcon={<CartIcon />}
            // rightIconAction={() => navigation.navigate('Cart')}
            rightIconAction={() => null}
            leftIcon={<BoxStore />}
            // leftIconAction={() => navigation.navigate('Transaction')}
            leftIconAction={() => null}
            containerStyles={{paddingHorizontal: widthPercentage(20)}}
          />
          <View style={styles.listContainer}>
            <TabFilter.Type1
              filterData={filter}
              onPress={filterData}
              selectedIndex={selectedIndex}
              flatlistContainerStyle={{
                justifyContent: 'space-between',
              }}
              TouchableStyle={{width: widthPercentageToDP(45)}}
              translation={true}
            />
            {filter[selectedIndex].filterName === 'Event.Concert.Title' ? (
              <ConcertList />
            ) : (
              <MerchList />
            )}
          </View>
        </View>
      ) : (
        <GuestContent />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  listContainer: {
    marginTop: heightPercentage(8),
    paddingHorizontal: widthResponsive(24),
    width: '100%',
    height: '100%',
  },
});
