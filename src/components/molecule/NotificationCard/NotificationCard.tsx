import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ListAvatar} from './ListAvatar';
import {BellNotif} from '../../../assets/icon';
import {heightPercentage, widthResponsive} from '../../../utils';
import {color} from '../../../theme';
import {
  ListNotificationData,
  PaginationType,
} from '../../../interface/notification.interface';

interface NotificationCardProps {
  data: ListNotificationData[];
  meta: PaginationType;
  nextPage: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = (
  props: NotificationCardProps,
) => {
  const {data, meta, nextPage} = props;

  const handleEndScroll = () => {
    if (data.length < meta.total) {
      nextPage();
    }
  };

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => (
        <View style={styles.root}>
          {/* {item.type === 'like' ? (
            <HeartIcon style={styles.icon} />
          ) : (
            <BellNotif style={styles.icon} />
          )} */}
          <BellNotif style={styles.icon} />
          <View style={{width: '100%'}}>
            <ListAvatar
              // data={item.data}
              size={32}
              desc={item.content}
              wordReplacer={item.wordReplacer}
            />
          </View>
        </View>
      )}
      onEndReached={handleEndScroll}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: color.Dark[500],
    paddingTop: heightPercentage(16),
    paddingBottom: heightPercentage(12),
    paddingHorizontal: widthResponsive(24),
  },
  icon: {
    marginRight: widthResponsive(14),
    marginTop: heightPercentage(6),
    alignSelf: 'flex-start',
  },
});
