import React, {FC} from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {color, font} from '../../../theme';
import {SearchIcon} from '../../../assets/icon';
import {ms, mvs} from 'react-native-size-matters';

interface OTPInputProps {
  pinCount?: number;
  containerStyle?: object;
  inputStyle?: object;
  testID?: string;
  clearInputs?: boolean;
  onCodeChanged?: (code: string) => void;
  autoFocusOnLoad?: boolean;
  hideIcon?: boolean;
  onCodeFilled?: (result: boolean, code: string) => void;
  code?: string;
}

const fields: TextInput[] | null[] = [];

const SsuOTPInput: FC<OTPInputProps> = (props = defaultProps) => {
  const {
    containerStyle,
    inputStyle,
    pinCount,
    testID,
    onCodeChanged,
    clearInputs,
    autoFocusOnLoad,
    onCodeFilled,
    hideIcon,
    code,
  } = props;
  const textInputCount = new Array(pinCount).fill(0);
  const [digits, setDigits] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (onCodeChanged) {
      onCodeChanged(digits.join(''));
    }
  }, [digits]);

  React.useEffect(() => {
    if (pinCount && code && code.length >= pinCount) {
      setDigitsFromCode(code);
    }
  }, [code]);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      bringUpKeyBoardIfNeeded();
      setDigitsFromCode(code);
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        blurAllFields,
      );
      return keyboardDidHideListener.remove;
    } else {
      bringUpKeyBoardIfNeeded();
      setDigitsFromCode(code);
    }
  }, []);

  function setDigitsFromCode(code: any) {
    const regexp = new RegExp(`^\\d{${pinCount}}$`);
    if (regexp.test(code)) {
      setDigits(code.split(''));
      blurAllFields();
      onCodeFilled && onCodeFilled(true, code);
    }
  }

  function bringUpKeyBoardIfNeeded() {
    const focusIndex = digits.length ? digits.length - 1 : 0;
    if (pinCount && focusIndex < pinCount && autoFocusOnLoad) {
      focusField(focusIndex);
    }
  }

  function focusField(index: number) {
    if (index < fields.length) {
      const input = fields[index] as TextInput;
      input.focus();
    }
  }

  function handleChangeText(index: number, text: string) {
    let newdigits: string[] = digits.slice();
    const oldTextLength = newdigits[index] ? newdigits[index].length : 0;
    const newTextLength = text.length;
    /* istanbul ignore if */
    if (newTextLength - oldTextLength === pinCount) {
      text = text.replace(/[^0-9]/g, '');
      newdigits = text.split('').slice(oldTextLength, newTextLength);
      setDigits(newdigits);
    } else {
      /* istanbul ignore if */
      if (text.length === 0) {
        /* istanbul ignore if */
        if (newdigits.length > 0) {
          newdigits = newdigits.slice(0, newdigits.length - 1);
        }
      } else {
        text = text.replace(/[^0-9]/g, '');
        /* istanbul ignore else */
        text?.split('')?.forEach(value => {
          /* istanbul ignore if */
          if (pinCount && index < pinCount) {
            newdigits[index] = value;
            index += 1;
          }
        });
        index -= 1;
      }
      setDigits(newdigits);
    }

    let result = newdigits.join('');
    if (pinCount && result.length >= pinCount) {
      onCodeFilled && onCodeFilled(true, result);
      focusField(pinCount - 1);
      blurAllFields();
    } else {
      if (pinCount && text.length > 0 && index < pinCount - 1) {
        onCodeFilled && onCodeFilled(false, result);
        focusField(index + 1);
      }
    }
  }

  function blurAllFields() {
    fields.forEach((field: TextInput | null) => (field as TextInput)?.blur());
  }

  function handleKeyPressTextInput(index: number, key: string) {
    if (key === 'Backspace') {
      if (!digits[index] && index > 0) {
        handleChangeText(index - 1, '');
        focusField(index - 1);
      }
    }
  }

  function handleValidationWhenClear() {
    if (!clearInputs) {
      let filledPinCount = digits.filter(digit => {
        return digit !== null && digit !== undefined;
      }).length;
      if (pinCount) {
        focusField(Math.min(filledPinCount, pinCount - 1));
      }
    } else {
      focusField(0);
      setDigits([]);
    }
  }

  function renderCicleIcon() {
    const size = 32;
    return (
      <View
        style={{
          position: 'absolute',
          top: -(size / 2),
          right: 0,
          left: 0,
          alignItems: 'center',
        }}>
        <SearchIcon
          // name={otpSuccess ? 'success_circle' : 'error_circle'}
          width={size}
        />
      </View>
    );
  }

  return (
    <View
      style={{...containerStyle}}
      accessibilityLabel={testID}
      accessible
      testID={testID}>
      {!hideIcon && renderCicleIcon()}
      <TouchableWithoutFeedback
        accessibilityLabel={`${testID}.touchableWithoutFeedback`}
        accessible
        style={{height: 200, backgroundColor: 'transparent'}}
        onPress={handleValidationWhenClear}>
        <View
          accessible
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {textInputCount.map((_, index) => {
            return (
              <View pointerEvents="none" key={index + 'view'}>
                <TextInput
                  testID={`${testID}.otpInput${index}`}
                  accessibilityLabel={`${testID}.otpInput${index}`}
                  accessible
                  key={index}
                  selectionColor={color.Success[500]}
                  style={[
                    inputStyle,
                    {
                      color: color.Neutral[10],
                    },
                  ]}
                  value={digits[index] || ''}
                  onChangeText={text => handleChangeText(index, text)}
                  ref={ref => {
                    fields[index] = ref;
                  }}
                  keyboardType="number-pad"
                  onKeyPress={({nativeEvent: {key}}) => {
                    handleKeyPressTextInput(index, key);
                  }}
                />
              </View>
            );
          })}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    width: '100%',
  },
  defaultBoxStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  defaultInput: {
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    fontFamily: font.InterMedium,
    fontSize: mvs(12),
    width: ms(40),
    height: mvs(40),
    backgroundColor: color.Dark[600],
  },
});

const defaultProps: OTPInputProps = {
  pinCount: 6,
  containerStyle: styles.defaultContainer,
  inputStyle: styles.defaultInput,
  clearInputs: false,
  autoFocusOnLoad: false,
  hideIcon: false,
};

SsuOTPInput.defaultProps = defaultProps;

export default SsuOTPInput;
