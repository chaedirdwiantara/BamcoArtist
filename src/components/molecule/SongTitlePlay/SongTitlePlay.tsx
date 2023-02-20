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
import {storage} from '../../../hooks/use-storage.hook';
import {DefaultAvatar, PauseIcon, PlayIcon} from '../../../assets/icon';
import {useTranslation} from 'react-i18next';

interface SongTitlePlayProps {
  title: string;
  totalSong: number;
  createdDate: string;
  createdBy: string;
  avatarUri?: string | null;
  showIconPlay: boolean;
  isPlaying: boolean;
  handlePlayPaused: () => void;
  onPressSong: () => void;
}

export const SongTitlePlay: React.FC<SongTitlePlayProps> = ({
  title,
  totalSong,
  createdDate,
  createdBy,
  avatarUri = '',
  showIconPlay,
  isPlaying,
  handlePlayPaused,
  onPressSong,
}) => {
  const {t} = useTranslation();
  const reset = storage.getBoolean('resetPlayer');

  const [first, setFirst] = useState(true);
  const onPressPlay = () => {
    if ((first && !isPlaying) || (reset && !isPlaying)) {
      onPressSong();
      setFirst(false);
      storage.set('resetPlayer', false);
    } else {
      handlePlayPaused();
      setFirst(false);
      storage.set('resetPlayer', false);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.containerTitle}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.createdOn}>
            {`${t('Music.Label.CreatedOn')} ${createdDate} · ${totalSong} ${t(
              'Music.Label.Songs',
            )}`}
          </Text>
        </View>
        {showIconPlay ? (
          <TouchableOpacity onPress={onPressPlay}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.containerCreatedBy}>
        <Text style={styles.by}>by</Text>
        <Gap width={widthPercentage(5)} />
        {avatarUri ? (
          <Avatar size={widthPercentage(16)} imgUri={avatarUri} />
        ) : (
          <DefaultAvatar.ProfileIcon
            width={widthPercentage(18)}
            height={widthPercentage(18)}
          />
        )}
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
