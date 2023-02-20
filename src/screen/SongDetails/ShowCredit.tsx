import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {ShowCreditContent} from '../../components';
import {useSongHook} from '../../hooks/use-song.hook';

type ShowCreditProps = NativeStackScreenProps<RootStackParams, 'ShowCredit'>;

export const ShowCreditScreen: React.FC<ShowCreditProps> = ({
  route,
}: ShowCreditProps) => {
  const {songId} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {dataDetailSong, getDetailSong} = useSongHook();

  useFocusEffect(
    useCallback(() => {
      getDetailSong({id: songId.toString()});
    }, []),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {dataDetailSong && (
        <ShowCreditContent
          dataDetail={dataDetailSong}
          onPressGoBack={onPressGoBack}
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
});
