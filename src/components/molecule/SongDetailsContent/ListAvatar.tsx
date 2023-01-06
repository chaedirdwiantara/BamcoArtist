import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Gap} from '../../atom';
import {color, font, typography} from '../../../theme';
import {
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {mvs} from 'react-native-size-matters';
import {DefaultAvatar} from '../../../assets/icon';
import {FeaturingArtist} from '../../../interface/song.interface';

interface ListAvatarProps {
  avatarUri?: string;
  title: string;
  text?: string;
  featuring?: boolean;
  featuringData?: FeaturingArtist[];
}

export const ListAvatar: React.FC<ListAvatarProps> = ({
  title,
  text,
  featuring,
  featuringData,
  avatarUri = 'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
}) => {
  return (
    <View>
      {title && (
        <Text
          style={[
            typography.Subtitle1,
            {color: color.Success[500], paddingBottom: heightPercentage(10)},
          ]}>
          {title}
        </Text>
      )}
      {featuring && featuringData ? (
        featuringData.map((item, i) => (
          <View style={styles.containerAvatar}>
            {item.ImageURL ? (
              <Avatar size={widthResponsive(44)} imgUri={item.ImageURL} />
            ) : (
              <DefaultAvatar.MusicianIcon width={44} height={44} />
            )}
            <Gap width={10} />
            {/* <Text style={styles.text}>{item.ArtistsName}</Text> //TODO: CHANGE AFTER BE FIXED IT */}
            {/* @ts-ignore */}
            <Text style={styles.text}>{item}</Text>
          </View>
        ))
      ) : (
        <View style={styles.containerAvatar}>
          {avatarUri ? (
            <Avatar size={widthResponsive(44)} imgUri={avatarUri} />
          ) : (
            <DefaultAvatar.MusicianIcon width={44} height={44} />
          )}
          <Gap width={10} />
          <Text style={styles.text}>{text}</Text>
        </View>
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
    fontSize: mvs(15),
    lineHeight: heightPercentage(20),
    color: color.Neutral[10],
  },
});
