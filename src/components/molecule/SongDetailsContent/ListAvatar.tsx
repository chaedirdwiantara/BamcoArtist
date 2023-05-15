import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {mvs} from 'react-native-size-matters';

import {Avatar, Gap} from '../../atom';
import {DefaultAvatar} from '../../../assets/icon';
import {color, font, typography} from '../../../theme';
import {heightPercentage, widthPercentage} from '../../../utils';
import {FeaturingArtist} from '../../../interface/song.interface';

interface ListAvatarProps {
  avatarUri?: string;
  title: string;
  uuid?: string;
  text?: string;
  featuring?: boolean;
  featuringData?: FeaturingArtist[];
  onPress: (uuid: string) => void;
}

export const ListAvatar: React.FC<ListAvatarProps> = ({
  title,
  uuid,
  text,
  featuring,
  featuringData,
  avatarUri,
  onPress,
}) => {
  return (
    <View>
      {title && (
        <Text
          style={[
            typography.Subtitle1,
            {
              color: color.Success[500],
              paddingBottom: heightPercentage(10),
            },
          ]}>
          {title}
        </Text>
      )}
      {featuring && featuringData ? (
        featuringData.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.containerAvatar}
            disabled={item.isDeletedUser}
            onPress={() => onPress(item.uuid)}>
            {item.imageProfile ? (
              <Avatar size={widthPercentage(44)} imgUri={item.imageProfile} />
            ) : (
              <DefaultAvatar.MusicianIcon
                color={item.isDeletedUser ? 'rgba(0, 0, 0, 0.5)' : '#222731'}
              />
            )}
            <Gap width={10} />
            <Text
              style={[styles.text, {opacity: item.isDeletedUser ? 0.5 : 1}]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <TouchableOpacity
          onPress={() => onPress(uuid ? uuid : '')}
          style={styles.containerAvatar}>
          {avatarUri ? (
            <Avatar size={widthPercentage(44)} imgUri={avatarUri} />
          ) : (
            <DefaultAvatar.MusicianIcon />
          )}
          <Gap width={10} />
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: heightPercentage(12),
  },
  text: {
    fontFamily: font.InterMedium,
    fontSize: mvs(14),
    lineHeight: heightPercentage(20),
    color: color.Neutral[10],
  },
});
