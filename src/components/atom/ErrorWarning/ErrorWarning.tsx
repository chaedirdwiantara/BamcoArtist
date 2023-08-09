import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {mvs} from 'react-native-size-matters';
import {ErrorIcon} from '../../../assets/icon';
import Gap from '../Gap/Gap';
import {color, font} from '../../../theme';

interface ErrorWarningProps {
  erroMsg: string;
  errorColor?: string;
  iconError?: React.ReactNode;
}

const ErrorWarning: FC<ErrorWarningProps> = (props: ErrorWarningProps) => {
  const {erroMsg, errorColor = color.Error[400], iconError} = props;
  return (
    <View style={styles.container}>
      {iconError ?? (
        <ErrorIcon fill={errorColor} style={{marginBottom: mvs(-1)}} />
      )}
      <Gap width={4} />
      <Text
        style={{
          fontFamily: font.InterRegular,
          fontWeight: '400',
          fontSize: mvs(10),
          lineHeight: mvs(12),
          color: errorColor,
          maxWidth: '90%',
        }}>
        {erroMsg}
      </Text>
    </View>
  );
};

export default ErrorWarning;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: mvs(4),
    alignItems: 'flex-start',
  },
});
