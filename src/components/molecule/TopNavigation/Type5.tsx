import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';

import {font} from '../../../theme';
import {Avatar, Gap} from '../../atom';
import topNavstyles from './topNavstyles';
import {elipsisText} from '../../../utils';
import {StepCopilot} from '../StepCopilot';
import {DefaultAvatar} from '../../../assets/icon';
import {ChipMoney} from '../../atom/ChipMoney/ChipMoney';

/** === INTERFACE === */
type Props = {
  name: string;
  maxLengthTitle?: number;
  bgColor?: string;
  itemStrokeColor?: string;
  leftIconAction: () => void;
  onPressCoin?: () => void;
  rightIcon: React.ReactNode;
  rightIconAction?: () => void;
  profileUri: string;
  points: number;
  containerStyles?: ViewStyle;
  guest?: boolean;
};

/** == COMPONENT === */
const Type5: React.FC<Props> = (props: Props) => {
  const {t} = useTranslation();
  /** => icon left */
  const iconLeft = () => {
    return (
      <>
        {props.profileUri ? (
          <TouchableOpacity
            activeOpacity={1}
            style={topNavstyles.iconLeftContainer}
            onPress={props.leftIconAction}>
            <Avatar imgUri={props.profileUri} size={34} />
          </TouchableOpacity>
        ) : (
          <DefaultAvatar.ProfileIcon />
        )}
      </>
    );
  };
  /** => icon right */
  const iconRight = () => {
    return (
      <TouchableOpacity
        style={topNavstyles.iconRightContainer}
        onPress={props.rightIconAction}>
        {props.rightIcon}
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
            borderBottomWidth: 0,
          },
          props.containerStyles,
        ]}>
        <View style={topNavstyles.leftContainer}>
          {props.guest ? <DefaultAvatar.ProfileIcon /> : iconLeft()}
          <Gap width={8} />
          <Text
            numberOfLines={1}
            style={[
              topNavstyles.centerTitle,
              {color: props.itemStrokeColor, fontFamily: font.InterSemiBold},
            ]}>
            {props.guest
              ? 'Guest'
              : elipsisText(
                  t('Home.Topbar.Hi', {name: props.name}),
                  props.maxLengthTitle ?? 20,
                )}
          </Text>
        </View>
        <View style={topNavstyles.rightContainer}>
          <StepCopilot
            children={
              <TouchableOpacity onPress={props.onPressCoin}>
                <ChipMoney balance={props.points} />
              </TouchableOpacity>
            }
            order={1}
            name={t('Coachmark.Credit')}
            text={t('Coachmark.SubtitleCredit')}
          />
          <Gap width={12} />
          {iconRight()}
        </View>
      </View>
    );
  };
  /** => MAIN */
  return <>{header()}</>;
};

export default Type5;
