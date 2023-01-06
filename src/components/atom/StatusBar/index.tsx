/** === IMPORT LIB HERE === */
import React, {FC} from 'react';
import {StatusBar} from 'react-native';
/** === INTERFACE === */
interface StatusBarProps {
  type: 'black' | 'white';
}
/** === COMPONENT === */
const SsuStatusBar: FC<StatusBarProps> = props => {
  return (
    <StatusBar
      barStyle={props.type === 'black' ? 'light-content' : 'dark-content'}
      backgroundColor="transparent"
      translucent={true}
    />
  );
};
/** === EXPORT COMPONENT === */
export default SsuStatusBar;
