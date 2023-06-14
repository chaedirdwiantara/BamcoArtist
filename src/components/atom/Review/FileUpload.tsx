import {Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {ImportPhotoIcon} from '../../../assets/icon';
import {heightPercentage, widthPercentage} from '../../../utils';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import ImagePicker from 'react-native-image-crop-picker';

export const UploadArea = ({
  type = 'full',
  onPress,
}: {
  type?: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={type === 'full' ? styles.uploadAreaFull : styles.uploadArea}
      onPress={onPress}>
      <ImportPhotoIcon />
      {type === 'full' && (
        <Text style={styles.text}>Insert A Picture or Video</Text>
      )}
    </TouchableOpacity>
  );
};

const FileUpload = () => {
  const onInsertMedia = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
    }).then(file => {
      console.log(file);
    });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <UploadArea onPress={onInsertMedia} />
    </ScrollView>
  );
};

export default FileUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: heightPercentage(20),
  },
  uploadArea: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Color.Dark[300],
    padding: widthPercentage(25),
    borderRadius: widthPercentage(6),
    marginRight: widthPercentage(16),
  },
  uploadAreaFull: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Color.Dark[300],
    padding: widthPercentage(22),
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: widthPercentage(6),
  },
  text: {
    ...Typography.Subtitle3,
    color: Color.Dark[300],
    paddingLeft: widthPercentage(8),
  },
});
