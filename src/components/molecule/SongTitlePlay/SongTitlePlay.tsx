import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import {Avatar, Gap} from '../../atom';
import {color, font} from '../../../theme';
import {PauseIcon, PlayIcon} from '../../../assets/icon';

interface SongTitlePlayProps {
  title: string;
  totalSong: number;
  createdDate: string;
  createdBy: string;
  avatarUri?: string;
}

export const SongTitlePlay: React.FC<SongTitlePlayProps> = ({
  title,
  totalSong,
  createdDate,
  createdBy,
  avatarUri = 'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
}) => {
  const [played, setPlayed] = useState(false);

  return (
    <View style={styles.root}>
      <View style={styles.containerTitle}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.createdOn}>
            {`Created on ${createdDate} · ${totalSong} songs`}
          </Text>
        </View>
        {played ? (
          <TouchableOpacity onPress={() => setPlayed(false)}>
            <PauseIcon />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setPlayed(true)}>
            <PlayIcon />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.containerCreatedBy}>
        <Text style={styles.by}>by</Text>
        <Gap width={widthPercentage(5)} />
        <Avatar size={widthPercentage(16)} imgUri={avatarUri} />
        <Gap width={widthPercentage(5)} />
        <Text style={styles.createdBy}>{createdBy}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentage(12),
    marginTop: heightPercentage(10),
  },
  title: {
    fontSize: normalize(20),
    color: color.Neutral[10],
    fontFamily: font.InterSemiBold,
    lineHeight: heightPercentage(28),
    width: width * 0.7,
  },
  createdOn: {
    fontSize: normalize(10),
    color: color.Dark[50],
    fontFamily: font.InterMedium,
  },
  containerCreatedBy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(12),
    marginVertical: heightPercentage(6),
  },
  by: {
    fontSize: normalize(12),
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
  },
  createdBy: {
    fontSize: normalize(12),
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
  },
});
