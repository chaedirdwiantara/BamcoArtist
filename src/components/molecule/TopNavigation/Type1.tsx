import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import {ArrowLeftIcon, ShareIcon} from '../../../assets/icon';
import {elipsisText, widthPercentage} from '../../../utils';
import topNavstyles from './topNavstyles';
import {color, font} from '../../../theme';
import QRCodeIcon from '../../../assets/icon/QRCode.icon';

/** === INTERFACE === */
type Props = {
  type?: string;
  title: string;
  maxLengthTitle?: number;
  bgColor?: string;
  itemStrokeColor?: string;
  leftIcon?: React.ReactNode;
  leftIconAction: () => void;
  containerStyles?: ViewStyle;
  onPressShareQR?: () => void;
};

/** == COMPONENT === */
const Type1: React.FC<Props> = (props: Props) => {
  /** => icon profile share */
  const iconProfileShare = () => {
    return (
      <TouchableOpacity
        style={topNavstyles.iconLeftContainer}
        onPress={props.leftIconAction}>
        <ShareIcon
          stroke={color.Neutral[10]}
          style={{
            marginRight: widthPercentage(12),
            width: widthPercentage(22),
            height: widthPercentage(22),
          }}
        />
      </TouchableOpacity>
    );
  };

  /** => icon qr share */
  const iconQRShare = () => {
    return (
      <TouchableOpacity
        style={topNavstyles.iconLeftContainer}
        onPress={props.onPressShareQR}>
        <QRCodeIcon
          stroke={color.Neutral[10]}
          style={{
            marginRight: widthPercentage(24),
          }}
        />
      </TouchableOpacity>
    );
  };

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
        <View style={topNavstyles.rightContainer}>
          {props.type === 'musician detail' && (
            <>
              {iconProfileShare()}
              {iconQRShare()}
            </>
          )}
        </View>
      </View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type1;
