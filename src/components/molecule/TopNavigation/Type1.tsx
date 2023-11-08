import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {ArrowLeftIcon, DropDownIcon} from '../../../assets/icon';
import {elipsisText, widthPercentage, widthResponsive} from '../../../utils';
import topNavstyles from './topNavstyles';
import {color, font} from '../../../theme';
import DropdownMore from '../V2/DropdownFilter/DropdownMore';
import {
  DataDropDownNumberType,
  DataDropDownType,
  albumReportSent,
} from '../../../data/dropdown';

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
  resultDataDropdown?: (
    dataResult: DataDropDownType | DataDropDownNumberType,
  ) => void;
  dropdownData?: DataDropDownType[] | DataDropDownNumberType[];
  beingBlocked?: boolean;
  dropdownStyle?: ViewStyle;
  leftPositionDropdown?: number;
  rightIcon?: React.ReactNode;
  rightIconAction?: () => void;
};

/** == COMPONENT === */
const Type1: React.FC<Props> = (props: Props) => {
  const {
    dropdownData,
    resultDataDropdown,
    beingBlocked,
    dropdownStyle,
    leftPositionDropdown = widthResponsive(20),
    rightIconAction,
    rightIcon,
  } = props;

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

  const iconRight = (title?: string) => {
    if (title === '') {
      return <View style={topNavstyles.iconRightContainer}>{rightIcon}</View>;
    }
    return (
      <TouchableOpacity
        style={topNavstyles.iconRightContainer}
        onPress={rightIconAction}>
        {rightIcon}
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
          {props.type === 'user detail' && !beingBlocked && (
            <View style={[styles.dropdownContainer, dropdownStyle]}>
              <DropdownMore
                dataFilter={dropdownData ?? albumReportSent}
                selectedMenu={resultDataDropdown!}
                iconChildren={<DropDownIcon />}
                topPosition={widthResponsive(5)}
                leftPosition={leftPositionDropdown}
              />
            </View>
          )}

          {props.type === 'event detail' && rightIcon && iconRight(props.title)}
        </View>
      </View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type1;

const styles = StyleSheet.create({
  dropdownContainer: {
    marginRight: widthResponsive(10),
  },
});
