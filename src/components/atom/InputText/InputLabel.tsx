import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import Gap from '../Gap/Gap';
import {
  CameraIcon,
  ErrorIcon,
  EyeCloseIcon,
  EyeOpenIcon,
  GalleryAddIcon,
} from '../../../assets/icon';
import Color from '../../../theme/Color';
import {font, typography} from '../../../theme';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';

interface InputLabelProps extends TextInputProps {
  label?: string;
  isError?: boolean;
  errorMsg?: string;
  verifText?: string;
  password?: boolean;
  inputStyles?: ViewStyle;
  containerStyles?: ViewStyle;
  containerInputStyles?: ViewStyle;
  showImage?: boolean;
  onPressCamera?: () => void;
  onPressLibrary?: () => void;
}

const InputLabel: React.FC<InputLabelProps> = (props: InputLabelProps) => {
  const {
    label,
    verifText,
    isError,
    password,
    errorMsg,
    inputStyles,
    containerStyles,
    containerInputStyles,
    showImage,
    onPressCamera,
    onPressLibrary,
  } = props;

  const [state, setState] = useState<boolean>(false);
  const [secure, setSecure] = useState<boolean>(true);

  const color = isError ? Color.Error[400] : Color.Neutral[50];
  const borderBottomColor = isError
    ? Color.Error[400]
    : state
    ? Color.Pink[200]
    : Color.Dark[500];
  const handleFocus = () => setState(true);
  const handleBlur = () => setState(false);

  const passwordComp = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSecure(!secure);
        }}>
        {secure ? (
          <EyeCloseIcon stroke={Color.Dark[50]} />
        ) : (
          <EyeOpenIcon stroke={Color.Dark[50]} />
        )}
      </TouchableOpacity>
    );
  };

  const iconCameraComp = () => {
    return (
      <View style={styles.iconCamera}>
        <TouchableOpacity onPress={onPressCamera}>
          <CameraIcon
            width={widthPercentage(20)}
            height={widthPercentage(20)}
            stroke={Color.Dark[100]}
          />
        </TouchableOpacity>
        <Gap width={widthPercentage(10)} />
        <TouchableOpacity onPress={onPressLibrary}>
          <GalleryAddIcon
            width={widthPercentage(20)}
            height={widthPercentage(20)}
            stroke={Color.Dark[100]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={containerStyles}>
      {label && (
        <Text style={[typography.Overline, {color}, styles.label]}>
          {label}
        </Text>
      )}
      <View style={[styles.root, {borderBottomColor}, containerInputStyles]}>
        <TextInput
          style={[typography.Body2, styles.input, inputStyles]}
          placeholderTextColor={Color.Dark[300]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={password ? secure : false}
          {...props}
        />
        <View>{password ? passwordComp() : null}</View>
        {showImage ? iconCameraComp() : null}
      </View>
      {isError ? (
        <View style={styles.containerErrorMsg}>
          <ErrorIcon fill={color} />
          <Gap width={ms(4)} />
          <Text style={styles.errorMsg}>{errorMsg}</Text>
        </View>
      ) : null}
      {verifText ? <Text style={styles.verifText}>{verifText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    borderBottomWidth: mvs(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    paddingLeft: Platform.OS === 'ios' ? 0 : ms(4),
  },
  input: {
    width: '100%',
    color: Color.Neutral[10],
    paddingVertical: heightPercentage(12),
  },
  containerErrorMsg: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: mvs(4),
    alignItems: 'center',
  },
  errorMsg: {
    color: Color.Error[400],
    fontFamily: font.InterRegular,
    fontSize: normalize(10),
    lineHeight: mvs(12),
    maxWidth: '90%',
  },
  verifText: {
    paddingTop: mvs(4),
    color: Color.Pink[200],
    fontFamily: font.InterRegular,
    fontSize: normalize(10),
    lineHeight: mvs(12),
    maxWidth: '90%',
  },
  iconCamera: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: widthPercentage(10),
    paddingBottom: heightPercentage(10),
  },
});

export default InputLabel;
