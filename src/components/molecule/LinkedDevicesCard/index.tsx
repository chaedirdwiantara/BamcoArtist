import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {color, font} from '../../../theme';
import {LinkedDevicesData} from '../../../interface/qrcode.interface';
import {widthResponsive} from '../../../utils';
import {Gap} from '../../atom';
import {mvs} from 'react-native-size-matters';
import {
  BraveBrowserIcon,
  ChromeBrowserIcon,
  DefaultBrowserIcon,
  EdgeBrowserIcon,
  FirefoxBrowserIcon,
  OperaBrowserIcon,
  SafariBrowserIcon,
} from '../../../assets/icon';

interface LinkedDevicesCardProps {
  data: LinkedDevicesData;
  index: number;
  onPress: () => void;
}

const LinkedDevicesCard: FC<LinkedDevicesCardProps> = (
  props: LinkedDevicesCardProps,
) => {
  const {data, index, onPress} = props;

  const BrowserLibrary = (data: string) => {
    return (
      <View>
        {data.includes('Brave') ? (
          <BraveBrowserIcon />
        ) : data.includes('Chrome') ? (
          <ChromeBrowserIcon />
        ) : data.includes('Firefox') ? (
          <FirefoxBrowserIcon />
        ) : data.includes('Edge') ? (
          <EdgeBrowserIcon />
        ) : data.includes('Opera') ? (
          <OperaBrowserIcon />
        ) : data.includes('Safari') ? (
          <SafariBrowserIcon />
        ) : (
          <DefaultBrowserIcon />
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {marginBottom: index === 0 ? widthResponsive(24) : widthResponsive(8)},
      ]}
      onPress={onPress}>
      {BrowserLibrary(data.deviceName ?? 'Undefined')}
      <Gap width={12} />
      <View>
        <Text style={styles.device}>
          {data.deviceName ?? 'Undefined Device'}
        </Text>
        <Gap height={4} />
        <Text style={styles.lastActive}>{data.lastActiveAt ?? ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LinkedDevicesCard;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(12),
    borderWidth: 1,
    borderRadius: 4,
    borderColor: color.Dark[500],
    flexDirection: 'row',
    alignItems: 'center',
  },
  device: {
    fontFamily: font.InterRegular,
    color: color.Neutral[10],
    fontWeight: '500',
    fontSize: mvs(13),
  },
  lastActive: {
    fontFamily: font.InterRegular,
    color: color.Neutral[110],
    fontWeight: '400',
    fontSize: mvs(13),
  },
});
