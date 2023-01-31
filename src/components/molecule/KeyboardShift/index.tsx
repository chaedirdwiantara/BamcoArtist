import * as React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

type Props = {
  children: React.ReactNode;
};

export const KeyboardShift = ({children}: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
      enabled>
      {children}
    </KeyboardAvoidingView>
  );
};
