import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import {ArrowLeftIcon} from '../../../assets/icon';
import {elipsisText, widthPercentage} from '../../../utils';
import topNavstyles from './topNavstyles';
import {color, font} from '../../../theme';

/** === INTERFACE === */
type Props = {
  title: string;
  maxLengthTitle?: number;
  bgColor?: string;
  itemStrokeColor?: string;
  leftIcon?: React.ReactNode;
  leftIconAction: () => void;
  containerStyles?: ViewStyle;
};

/** == COMPONENT === */
const Type1: React.FC<Props> = (props: Props) => {
  /** => icon left */
  const iconLeft = () => {
    return (
      <TouchableOpacity
        style={topNavstyles.iconLeftContainer}
        onPress={props.leftIconAction}>
        {props.leftIcon ? (
          props.leftIcon
        ) : (
          <ArrowLeftIcon
            stroke={color.Neutral[10]}
            style={{marginLeft: widthPercentage(24)}}
          />
        )}
      </TouchableOpacity>
    );
  };

  /** => header */
  const header = () => {
    return (
      <View
        style={[
          topNavstyles.headerContainer,
          {
            backgroundColor: props.bgColor,
          },
          props.containerStyles,
        ]}>
        <View style={topNavstyles.leftContainer}>{iconLeft()}</View>
        <View style={[topNavstyles.centerContainer, {flex: 5}]}>
          <Text
            numberOfLines={1}
            style={[
              topNavstyles.centerTitle,
              {color: props.itemStrokeColor, fontFamily: font.InterSemiBold},
            ]}>
            {elipsisText(props.title, props.maxLengthTitle ?? 20)}
          </Text>
        </View>
        <View style={topNavstyles.rightContainer}></View>
      </View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type1;
