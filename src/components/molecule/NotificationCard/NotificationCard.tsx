import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import {ListAvatar} from './ListAvatar';
import HeartIcon from '../../../assets/icon/Heart.icon';
import {BellNotif} from '../../../assets/icon';
import {
  heightPercentage,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {NotifDataType} from '../../../data/notification';
import {color} from '../../../theme';

interface NotificationCardProps {
  data: NotifDataType[];
}

export const NotificationCard: React.FC<NotificationCardProps> = (
  props: NotificationCardProps,
) => {
  const {data} = props;
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => (
        <View style={styles.root}>
          {item.type === 'like' ? (
            <HeartIcon style={styles.icon} />
          ) : (
            <BellNotif style={styles.icon} />
          )}
          <View style={{width: '100%'}}>
            <ListAvatar data={item.data} size={32} desc={item.desc} />
          </View>
        </View>
      )}
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
