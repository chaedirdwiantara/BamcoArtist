/** === IMPORT LIB HERE === */
import React, {FC} from 'react';
import {Text} from 'react-native';
import {color, font} from '../../../theme';
/** === INTERFACE === */
type Props = {
  color?: string;
  children?: React.ReactNode;
  align?: 'center' | 'justify' | 'left' | 'right';
  textDecorationLine?: 'line-through' | 'underline' | 'underline line-through';
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  numberOfLines?: number;
};
/** === COMPONENT === */
/** => Headline - Default */

// Biggest type
const Large: FC<Props> = props => {
  return (
    <Text
      ellipsizeMode={props.ellipsizeMode}
      numberOfLines={props.numberOfLines}
      style={{
        textDecorationLine: props.textDecorationLine
          ? props.textDecorationLine
          : 'none',
        fontFamily: font.InterMedium,
        fontSize: 15,
        lineHeight: 20,
        fontWeight: '500',
        letterSpacing: 0.15,
        color: props.color ? props.color : color.Neutral[10],
        textAlign: props.align ? props.align : 'auto',
      }}>
      {props.children}
    </Text>
  );
};

const Default: FC<Props> = props => {
  return (
    <Text
      ellipsizeMode={props.ellipsizeMode}
      numberOfLines={props.numberOfLines}
      style={{
        textDecorationLine: props.textDecorationLine
          ? props.textDecorationLine
          : 'none',
        fontFamily: font.InterMedium,
        fontSize: 12,
        lineHeight: 20,
        fontWeight: '400',
        letterSpacing: 0.15,
        color: props.color ? props.color : color.Neutral[10],
        textAlign: props.align ? props.align : 'auto',
      }}>
      {props.children}
    </Text>
  );
};

const Small: FC<Props> = props => {
  return (
    <Text
      ellipsizeMode={props.ellipsizeMode}
      numberOfLines={props.numberOfLines}
      style={{
        textDecorationLine: props.textDecorationLine
          ? props.textDecorationLine
          : 'none',
        fontFamily: font.InterMedium,
        fontSize: 10,
        lineHeight: 12,
        fontWeight: '500',
        letterSpacing: 0.5,
        color: props.color ? props.color : color.Neutral[10],
        textAlign: props.align ? props.align : 'auto',
      }}>
      {props.children}
    </Text>
  );
};

const Tiny: FC<Props> = props => {
  return (
    <Text
      ellipsizeMode={props.ellipsizeMode}
      numberOfLines={props.numberOfLines}
      style={{
        textDecorationLine: props.textDecorationLine
          ? props.textDecorationLine
          : 'none',
        fontFamily: font.InterMedium,
        fontSize: 8,
        lineHeight: 12,
        fontWeight: '400',
        letterSpacing: 0.5,
        color: props.color ? props.color : color.Neutral[10],
        textAlign: props.align ? props.align : 'auto',
      }}>
      {props.children}
    </Text>
  );
};

/** === EXPORT COMPONENT === */
export default {Default, Large, Small, Tiny};
