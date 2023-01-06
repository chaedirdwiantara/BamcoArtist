import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {color} from '../theme';
import {storage} from '../hooks/use-storage.hook';
import PostListPublic from './ListCard/PostListPublic';
import {heightPercentage, widthResponsive} from '../utils';
import PostListExclusive from './ListCard/PostListExclusive';
import {GuestContent, TabFilter, TopNavigation} from '../components';
import {PostlistData, PostlistDataExclusive} from '../data/postlist';
import {dropDownDataCategory, dropDownDataSort} from '../data/dropdown';
import {useIsFocused} from '@react-navigation/native';
import {usePlayerHook} from '../hooks/use-player.hook';

export const FeedScreen: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'Public'},
    {filterName: 'Exclusive'},
  ]);
  const isLogin = storage.getString('profile');
  const isFocused = useIsFocused();
  const {isPlay, showPlayer, hidePlayer} = usePlayerHook();

  useEffect(() => {
    if (isFocused && isPlay) {
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
          <TopNavigation.Type2
            title="FEED"
            maxLengthTitle={20}
            itemStrokeColor={'white'}
          />
          <View
            style={{
              marginTop: heightPercentage(8),
              paddingHorizontal: widthResponsive(24),
              width: '100%',
              height: '100%',
            }}>
            <TabFilter.Type1
              filterData={filter}
              onPress={filterData}
              selectedIndex={selectedIndex}
              flatlistContainerStyle={{
                justifyContent: 'space-between',
              }}
              TouchableStyle={{width: widthPercentageToDP(45)}}
            />
            {filter[selectedIndex].filterName === 'Public' ? (
              <PostListPublic
                dataRightDropdown={dropDownDataCategory}
                dataLeftDropdown={dropDownDataSort}
                data={PostlistData}
              />
            ) : (
              <PostListExclusive
                dataRightDropdown={dropDownDataCategory}
                dataLeftDropdown={dropDownDataSort}
                data={PostlistDataExclusive}
              />
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
});
