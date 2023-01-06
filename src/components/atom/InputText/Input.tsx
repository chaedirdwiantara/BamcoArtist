import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {
  CloseIcon,
  ErrorIcon,
  EyeCloseIcon,
  EyeOpenIcon,
} from '../../../assets/icon';
import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils/dimensionFormat';
import Gap from '../Gap/Gap';
import InputLabel from './InputLabel';

interface InputProps extends TextInputProps {
  fontSize?: number;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  isError?: boolean;
  errorMsg?: string;
  password?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  fontColor?: string;
  rightIcon?: boolean;
  isFocus?: boolean;
  rightIconComponent?: React.ReactNode;
  reset?: () => void;
  containerStyles?: ViewStyle;
  inputStyles?: ViewStyle;
  leftIconContainer?: ViewStyle;
}

interface TextAreaProps extends TextInputProps {
  fontSize?: number;
  backgroundColor?: string;
  containerStyles?: ViewStyle;
  inputStyles?: ViewStyle;
  isFocus?: boolean;
}

type TypeStyle = {
  container: ViewStyle;
  errorText: TextStyle;
  label: any;
  input: any;
  inputTextArea: any;
  leftIconStyle: ViewStyle;
};

const ErrorColor = color.Error[400];
const FontColor = color.Dark[300];

const InputText: React.FC<InputProps> = props => {
  const {
    fontSize = mvs(12),
    value,
    keyboardType,
    onChangeText,
    disabled,
    isError,
    errorMsg,
    leftIcon,
    password,
    backgroundColor,
    borderColor,
    fontColor,
    rightIcon,
    rightIconComponent,
    isFocus,
    reset,
    onSubmitEditing,
    onEndEditing,
    containerStyles,
    inputStyles,
    leftIconContainer,
  } = props;
  const [state, setState] = useState<boolean>(false);
  const [secure, setSecure] = useState<boolean>(true);

  const newBorderWidth = isError || borderColor ? 1 : 0;
  const newBorderColor = isError
    ? ErrorColor
    : borderColor && state
    ? borderColor
    : '';

  const rightIconComp = () => {
    return (
      <TouchableOpacity onPress={reset} style={{padding: ms(4)}}>
        <CloseIcon stroke={FontColor} fill={backgroundColor} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : color.Dark[900],
            borderWidth: newBorderWidth,
            borderColor: newBorderColor,
          },
          isFocus
            ? {borderColor: color.Pink[2], borderWidth: 1}
            : {borderColor: color.Dark[800], borderWidth: 1},
          isError && !isFocus
            ? {borderColor: ErrorColor, borderWidth: 1}
            : null,
          containerStyles,
        ]}>
        {leftIcon && (
          <View style={[styles.leftIconStyle, leftIconContainer]}>
            {leftIcon}
          </View>
        )}
        <TextInput
          style={[styles.input(fontSize, fontColor), inputStyles]}
          value={value}
          secureTextEntry={password ? secure : false}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          editable={disabled ? false : true}
          placeholderTextColor={FontColor}
          onFocus={() => setState(true)}
          onEndEditing={onEndEditing}
          onSubmitEditing={onSubmitEditing}
          {...props}
        />
        {password ? (
          <TouchableOpacity
            onPress={() => {
              setSecure(!secure);
            }}>
            {secure ? (
              <EyeCloseIcon stroke={FontColor} />
            ) : (
              <EyeOpenIcon stroke={FontColor} />
            )}
          </TouchableOpacity>
        ) : null}
        <View>
          {rightIcon
            ? rightIconComponent
              ? rightIconComponent
              : rightIconComp()
            : null}
        </View>
      </View>

      {isError === true ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: mvs(4),
            alignItems: 'flex-end',
          }}>
          <ErrorIcon fill={ErrorColor} style={{marginBottom: mvs(-1)}} />
          <Gap width={4} />
          <Text
            style={{
              fontFamily: font.InterRegular,
              fontWeight: '400',
              fontSize: mvs(10),
              lineHeight: mvs(12),
              color: ErrorColor,
              maxWidth: '90%',
            }}>
            {errorMsg}
          </Text>
        </View>
      ) : null}
    </>
  );
};

const TextArea: React.FC<TextAreaProps> = props => {
  const {
    fontSize,
    value,
    onChangeText,
    editable,
    placeholder,
    backgroundColor,
    containerStyles,
    inputStyles,
    maxLength,
    isFocus,
  } = props;
  const [state, setState] = useState<boolean>(false);
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomWidth: state === true ? 1 : 0,
          borderBottomColor: color.Pink[200],
          backgroundColor: backgroundColor ? backgroundColor : color.Dark[900],
        },
        containerStyles,
        isFocus
          ? {borderBottomColor: color.Pink[2], borderBottomWidth: 1}
          : {borderBottomWidth: 0},
      ]}>
      <TextInput
        style={[styles.inputTextArea(fontSize), inputStyles]}
        multiline={true}
        numberOfLines={3}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholder={placeholder}
        placeholderTextColor={FontColor}
        onFocus={() => setState(true)}
        maxLength={maxLength}
        {...props}
      />
    </View>
  );
};

export default {InputText, TextArea, InputLabel};

const styles = StyleSheet.create<TypeStyle>({
  container: {
    borderRadius: 5,
    paddingHorizontal: widthResponsive(12),
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  leftIconStyle: {
    marginRight: widthResponsive(8),
    width: widthResponsive(20),
    alignItems: 'center',
  },
  errorText: {
    color: ErrorColor,
    fontSize: mvs(13),
    marginLeft: ms(10),
  },
  label: (fontSize: number) => ({
    fontSize: fontSize ? fontSize : mvs(18),
    fontFamily: font.InterLight,
  }),
  input: (fontSize: number, fontColor: string) => ({
    flex: 1,
    fontSize: fontSize ? fontSize : mvs(13),
    fontFamily: font.InterLight,
    fontWeight: '400',
    color: fontColor ? fontColor : color.Neutral[10],
    marginVertical: Platform.OS === 'ios' ? mvs(12.5) : 0,
  }),
  inputTextArea: (fontSize: number) => ({
    flex: 1,
    fontSize: fontSize ? fontSize : mvs(13),
    fontFamily: font.InterLight,
    paddingVertical: mvs(5),
    paddingHorizontal: ms(5),
    textAlignVertical: 'top',
    color: color.Neutral[10],
  }),
});
