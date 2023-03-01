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
  ImageBackground,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {Image} from 'react-native-image-crop-picker';

import Gap from '../Gap/Gap';
import {
  CameraIcon,
  CloseCircleIcon,
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
  isFocus?: boolean;
  onPressCamera?: () => void;
  onPressLibrary?: () => void;
  isPhone?: boolean;
  leftIcon?: React.ReactNode;
  leftIconStyle?: ViewStyle;
  listImage?: Image[];
  onPressDeleteImage?: (id: number) => void;
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
    isPhone,
    leftIcon,
    leftIconStyle,
    listImage,
    onPressDeleteImage,
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
      <View style={[styles.iconCamera, {borderBottomColor}]}>
        <View style={{flexDirection: 'row'}}>
          {listImage?.map((val, i) => (
            <View key={i} style={styles.rootImage}>
              <ImageBackground
                source={{uri: val.path}}
                resizeMode="cover"
                imageStyle={{borderRadius: 8}}
                style={styles.image}>
                <TouchableOpacity
                  onPress={() => onPressDeleteImage && onPressDeleteImage(i)}>
                  <CloseCircleIcon style={styles.closeIcon} />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          ))}
        </View>
        <View style={{flexDirection: 'row'}}>
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
      </View>
    );
  };

  const stylesPhone = isPhone && Platform.OS === 'ios' ? mvs(20) : undefined;

  return (
    <View style={containerStyles}>
      {label && (
        <Text style={[typography.Overline, {color}, styles.label]}>
          {label}
        </Text>
      )}
      <View style={[styles.root, {borderBottomColor}, containerInputStyles]}>
        {leftIcon && (
          <View
            style={[
              {
                position: 'absolute',
                left: 0,
                zIndex: 1,
                alignItems: 'center',
                marginRight: mvs(20),
              },
              leftIconStyle,
            ]}>
            {leftIcon}
          </View>
        )}
        <TextInput
          style={[styles.input, inputStyles, {lineHeight: stylesPhone}]}
          placeholderTextColor={Color.Dark[300]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={password ? secure : false}
          {...props}
        />
        <View style={{position: 'absolute', right: 0}}>
          {password ? passwordComp() : null}
        </View>
      </View>
      {showImage ? iconCameraComp() : null}
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
    paddingRight: mvs(40),
    fontSize: mvs(15),
    // lineHeight: Platform.OS === 'ios' ? mvs(20) : undefined,
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
    paddingLeft: widthPercentage(10),
    paddingBottom: heightPercentage(10),
    borderBottomWidth: mvs(1),
  },
  rootImage: {
    width: '22%',
    aspectRatio: 1 / 1,
    borderColor: Color.Neutral[10],
    borderWidth: mvs(1),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: mvs(20),
    marginRight: widthPercentage(10),
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: widthPercentage(28),
    height: widthPercentage(28),
  },
});

export default InputLabel;
