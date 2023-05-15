import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Avatar, Gap, SsuInput} from '../../atom';
import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';
import {ImportMusicIcon, ImportPhotoIcon} from '../../../assets/icon';
import {ms, mvs} from 'react-native-size-matters';

interface CreatePostShortcutProps {
  avatarUri: string;
  placeholder: string;
  compOnPress: () => void;
}

const CreatePostShortcut: FC<CreatePostShortcutProps> = (
  props: CreatePostShortcutProps,
) => {
  const {avatarUri, placeholder, compOnPress} = props;

  return (
    <View style={styles.container}>
      <Gap height={13} />
      <TouchableOpacity style={styles.inputStyle} onPress={compOnPress}>
        <Avatar size={32} imgUri={avatarUri} />
        <Gap width={8} />
        <Text style={styles.placeHolderStyle}>
          {placeholder ?? `What's Happening...`}
        </Text>
      </TouchableOpacity>
      <Gap height={40} />
      <View style={styles.buttonContainer}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={compOnPress}>
            <ImportPhotoIcon />
          </TouchableOpacity>
          <Gap width={16} />
          <TouchableOpacity onPress={compOnPress}>
            <ImportMusicIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={compOnPress} style={styles.buttonPost}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </View>
      <Gap height={13} />
    </View>
  );
};

export default CreatePostShortcut;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: color.Dark[500],
    borderBottomColor: color.Dark[500],
    paddingHorizontal: widthResponsive(24),
  },
  inputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonPost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.Success[400],
    borderRadius: 4,
    paddingHorizontal: ms(36),
    paddingVertical: mvs(6),
  },
  postText: {
    fontFamily: font.InterMedium,
    fontSize: mvs(13),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  placeHolderStyle: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(13),
  },
});
