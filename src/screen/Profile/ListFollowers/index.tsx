import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Color from '../../../theme/Color';
import {FollowersList} from './ListFollowers';
import {RootStackParams} from '../../../navigations';
import {useSearchHook} from '../../../hooks/use-search.hook';

type FollowersProps = NativeStackScreenProps<RootStackParams, 'Followers'>;

export const FollowersScreen: React.FC<FollowersProps> = ({
  route,
}: FollowersProps) => {
  const {uuid} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataFollowers, getListFollowers} = useSearchHook();
  const [search, setSearch] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      getListFollowers({uuid, keyword: search});
    }, [search]),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToDetail = (type: 'fans' | 'musician', id: string) => {
    if (type === 'fans') {
      navigation.navigate('OtherUserProfile', {id});
    } else {
      navigation.navigate('MusicianProfile', {id});
    }
  };

  return (
    <View style={styles.root}>
      <FollowersList
        search={search}
        setSearch={setSearch}
        dataList={dataFollowers}
        goToDetail={goToDetail}
        onPressGoBack={onPressGoBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
