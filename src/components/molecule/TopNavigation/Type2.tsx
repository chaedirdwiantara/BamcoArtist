import {Text, View} from 'react-native';
import React from 'react';
import {elipsisText} from '../../../utils';
import topNavstyles from './topNavstyles';
import {font} from '../../../theme';

/** === INTERFACE === */
type Props = {
  title: string;
  maxLengthTitle?: number;
  bgColor?: string;
  itemStrokeColor?: string;
};

/** == COMPONENT === */
const Type2: React.FC<Props> = (props: Props) => {
  /** => header */
  const header = () => {
    return (
      <View
        style={[
          topNavstyles.headerContainer,
          {
            backgroundColor: props.bgColor,
          },
        ]}>
        <View style={topNavstyles.leftContainer}></View>
        <View style={topNavstyles.centerContainer}>
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

export default Type2;
