import {Animated, NativeModules, Platform, View, ViewStyle} from 'react-native';
import React from 'react';
import {elipsisText} from '../../../utils';
import topNavstyles from './topNavstyles';
import {color, font} from '../../../theme';
import {useScrollStore} from '../../../store/translateY.store';

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

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
      <>
        <Animated.View
          style={[
            topNavstyles.headerContainer,
            {
              backgroundColor: props.bgColor,
              transform: compATranslateY
                ? [{translateY: compATranslateY}]
                : undefined,
              borderBottomWidth: 0,
            },
            props.containerStyle,
          ]}>
          <View style={topNavstyles.leftContainer}></View>
          <View style={topNavstyles.centerContainer}>
            <Animated.Text
              numberOfLines={1}
              style={[
                topNavstyles.centerTitle,
                {
                  color: props.itemStrokeColor,
                  fontFamily: font.InterSemiBold,
                  opacity: headerOpacity,
                },
              ]}>
              {elipsisText(props.title, props.maxLengthTitle ?? 20)}
            </Animated.Text>
          </View>
          <View style={topNavstyles.rightContainer}></View>
        </Animated.View>

        <Animated.View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: color.Dark[500],
            zIndex: 10,
            position: 'absolute',
            top: Platform.OS === 'ios' ? 42 : barHeight + 52,
            transform: compATranslateY
              ? [{translateY: compATranslateY}]
              : undefined,
            opacity: headerOpacity,
          }}
        />
      </>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type2Animated;
