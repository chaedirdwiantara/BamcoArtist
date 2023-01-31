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
import {useIsFocused} from '@react-navigation/native';
import {usePlayerHook} from '../hooks/use-player.hook';

export const EventScreen: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([{filterName: 'Concert'}, {filterName: 'Merch'}]);
  const isLogin = storage.getString('profile');
  const isFocused = useIsFocused();
  const {isPlaying, showPlayer, hidePlayer} = usePlayerHook();

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
  }, [isFocused]);

  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.root}>
      {isLogin ? (
        <View>
          <TopNavigation.Type4
            title="Store"
            maxLengthTitle={20}
            itemStrokeColor={'white'}
            rightIcon={<CartIcon />}
            rightIconAction={() => null}
            leftIcon={<BoxStore />}
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
            />
            {filter[selectedIndex].filterName === 'Concert' ? (
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
