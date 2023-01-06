import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {Button, SsuInput} from '../../atom';
import {color} from '../../../theme';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface SendReportProps {
  title: string;
  onPressGoBack: () => void;
}

export const SendReportContent: React.FC<SendReportProps> = ({
  title,
  onPressGoBack,
}) => {
  const [state, setState] = useState({
    email: '',
    description: '',
  });
  const [listImage, setListImage] = useState<any>([]);

  const onChangeText = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const onPressSave = () => {};

  const onCameraPress = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
      compressImageQuality: 0.9,
      cropping: true,
    }).then(image => {
      setListImage([...listImage, image]);
    });
  };

  const onImageLibraryPress = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
      compressImageQuality: 0.9,
      cropping: true,
    }).then(image => {
      setListImage([...listImage, image]);
    });
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={title}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(12)}}
      />

      <SsuInput.InputLabel
        value={state.email}
        onChangeText={(newText: string) => onChangeText('email', newText)}
        placeholder={'Enter your email'}
        containerStyles={styles.textInput}
        inputStyles={styles.inputDesc}
      />

      <SsuInput.InputLabel
        value={state.description}
        onChangeText={(newText: string) => onChangeText('description', newText)}
        placeholder={'How can we improve your experience using this app?\n\n'}
        containerStyles={styles.textArea}
        multiline
        numberOfLines={10}
        inputStyles={styles.inputDesc}
        showImage={true}
        onPressCamera={onCameraPress}
        onPressLibrary={onImageLibraryPress}
      />

      <Button
        label="Send"
        onPress={onPressSave}
        containerStyles={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  textInput: {
    marginTop: heightPercentage(10),
  },
  textArea: {
    paddingHorizontal: 0,
  },
  inputDesc: {
    textAlignVertical: 'top',
    paddingHorizontal: widthPercentage(10),
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(25),
    alignSelf: 'center',
    backgroundColor: color.Pink[200],
  },
});
