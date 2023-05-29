import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {color} from '../../theme';
import {NotificationCard, TopNavigation} from '../../components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {useNotificationHook} from '../../hooks/use-notification.hook';
import {usePlayerStore} from '../../store/player.store';

export const Notification = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {listNotif, getListAllNotification, readNotification} =
    useNotificationHook();
  const [meta, setMeta] = useState<{page: number; perPage: number}>({
    page: 1,
    perPage: 15,
  });
  const {setWithoutBottomTab, show} = usePlayerStore();

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  useEffect(() => {
    getListAllNotification({page: meta.page, perPage: meta.perPage});
    readNotification();
  }, []);

  const nextPage = () => {
    getListAllNotification({page: meta.page + 1, perPage: meta.perPage});
    setMeta({
      ...meta,
      page: meta.page + 1,
    });
  };

  const handleBackAction = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Notification"
        leftIconAction={handleBackAction}
        maxLengthTitle={20}
        itemStrokeColor={color.Neutral[10]}
      />
      <NotificationCard
        data={listNotif?.data || []}
        meta={listNotif?.meta || {page: 1, perPage: 15, total: 0}}
        nextPage={nextPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
});
