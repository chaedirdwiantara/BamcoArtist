import {Animated, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {elipsisText} from '../../../utils';
import topNavstyles from './topNavstyles';
import {font} from '../../../theme';
import {useScrollStore} from '../../../store/translateY.store';

/** === INTERFACE === */
type Props = {
  title: string;
  maxLengthTitle?: number;
  bgColor?: string;
  itemStrokeColor?: string;
  containerStyle?: ViewStyle;
};

/** == COMPONENT === */
const Type2Animated: React.FC<Props> = (props: Props) => {
  /** => header */
  const header = () => {
    const {compATranslateY, headerOpacity} = useScrollStore();
    return (
      <Animated.View
        style={[
          topNavstyles.headerContainer,
          {
            backgroundColor: props.bgColor,
            transform: compATranslateY
              ? [{translateY: compATranslateY}]
              : undefined,
            opacity: headerOpacity ? headerOpacity : 1,
          },
          props.containerStyle,
        ]}>
        <View style={topNavstyles.leftContainer}></View>
        <View style={topNavstyles.centerContainer}>
          <Text
            numberOfLines={1}
            style={[
              topNavstyles.centerTitle,
              {
                color: props.itemStrokeColor,
                fontFamily: font.InterSemiBold,
              },
            ]}>
            {elipsisText(props.title, props.maxLengthTitle ?? 20)}
          </Text>
        </View>
        <View style={topNavstyles.rightContainer}></View>
      </Animated.View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type2Animated;
