import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {NotificationIcon} from '../../../assets/icon';
import {color, font} from '../../../theme';
import {ms, mvs} from 'react-native-size-matters';
import {normalize} from '../../../utils';

interface IconNotifProps {
  label: number;
}

const IconNotif: FC<IconNotifProps> = (props: IconNotifProps) => {
  const {label} = props;
  return (
    <View>
      <NotificationIcon stroke={color.Dark[100]} />
      {label > 0 && (
        <View style={styles.notifContainer}>
          <Text style={styles.notifText}>{label}</Text>
        </View>
      )}
    </View>
  );
};

export default IconNotif;

const styles = StyleSheet.create({
  notifContainer: {
    backgroundColor: color.Error[400],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: ms(18),
    height: mvs(18),
    padding: 3,
    position: 'absolute',
    left: ms(10),
    top: mvs(-5),
  },
  notifText: {
    color: color.Neutral[10],
    fontSize: normalize(9),
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    lineHeight: mvs(12),
  },
});
