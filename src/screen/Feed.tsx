import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {color} from '../theme';
import {storage} from '../hooks/use-storage.hook';
import PostListPublic from './ListCard/PostListPublic';
import {heightPercentage, widthResponsive} from '../utils';
import PostListMyPost from './ListCard/PostListMyPost';
import {GuestContent, TabFilter, TopNavigation} from '../components';
import {dropDownDataCategory, dropDownDataSort} from '../data/dropdown';
import {useIsFocused} from '@react-navigation/native';
import {usePlayerHook} from '../hooks/use-player.hook';
import {AddPostIcon} from '../assets/icon';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';

export const FeedScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([{filterName: 'My Post'}, {filterName: 'Public'}]);
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

  const handleFloatingIcon = () => {
    navigation.navigate('CreatePost');
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
              />
            ) : (
              <PostListMyPost
                dataRightDropdown={dropDownDataCategory}
                dataLeftDropdown={dropDownDataSort}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleFloatingIcon}>
            <AddPostIcon style={styles.floatingIcon} />
          </TouchableOpacity>
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
  buttonStyle: {
    position: 'absolute',
    height: widthResponsive(50),
    width: widthResponsive(50),
    justifyContent: 'center',
    alignItems: 'center',
    right: widthResponsive(36),
    bottom: widthResponsive(94),
  },
  floatingIcon: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});
