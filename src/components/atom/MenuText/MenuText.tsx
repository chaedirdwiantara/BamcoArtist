import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import Gap from '../Gap/Gap';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import {ArrowRightIcon} from '../../../assets/icon';
import {ButtonStatus} from '../../molecule/TopupCoin/ButtonStatus';

interface Props {
  text: string;
  title?: string;
  subtitle?: string;
  showIcon?: boolean;
  isButton?: boolean;
  icon?: React.ReactNode;
  tooltip?: React.ReactNode;
  onPress?: () => void;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
  activeOpacity?: number;
  onPressTooltip?: () => void;
}

const LeftIcon: React.FC<Props> = (props: Props) => {
  const {icon, text, onPress, containerStyles} = props;
  return (
    <TouchableOpacity style={[styles.root, containerStyles]} onPress={onPress}>
      {icon}
      <Text style={[Typography.Button2, styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
};

const RightIcon: React.FC<Props> = (props: Props) => {
  const {
    icon = <ArrowRightIcon />,
    activeOpacity,
    tooltip,
    text,
    onPress,
    containerStyles,
    textStyles,
    onPressTooltip,
  } = props;

  return (
    <TouchableOpacity
      style={[styles.root2, containerStyles]}
      activeOpacity={activeOpacity}
      onPress={onPress}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={onPressTooltip}>
        <Text style={[Typography.Button2, styles.text, textStyles]}>
          {text}
        </Text>
        {tooltip}
      </TouchableOpacity>
      {icon}
    </TouchableOpacity>
  );
};

const LeftIconWithSubtitle: React.FC<Props> = (props: Props) => {
  const {icon, text, subtitle, onPress, containerStyles} = props;
  return (
    <TouchableOpacity style={[styles.root, containerStyles]} onPress={onPress}>
      {icon}
      <View>
        <Text style={styles.text2}>{text}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const RightIconDisable: React.FC<Props> = (props: Props) => {
  const {
    icon = <ArrowRightIcon fill={Color.Neutral[50]} />,
    text,
    onPress,
    containerStyles,
  } = props;

  return (
    <TouchableOpacity style={[styles.root2, containerStyles]} onPress={onPress}>
      <Text style={[Typography.Button2, styles.textDisable]}>{text}</Text>
      {icon}
    </TouchableOpacity>
  );
};

const Withdrawal: React.FC<Props> = (props: Props) => {
  const {icon, showIcon, title, text, isButton, containerStyles} = props;

  return (
    <View style={[containerStyles]}>
      <Text style={[Typography.Caption, {color: Color.Dark[50]}]}>{title}</Text>
      <View style={styles.rootWithdrawal}>
        {isButton ? (
          <ButtonStatus label={text} />
        ) : (
          <Text style={[Typography.Subtitle2, {color: Color.Neutral[10]}]}>
            {text ? text : '-'}
          </Text>
        )}
        <Gap width={widthPercentage(10)} />
        {showIcon && icon}
      </View>
    </View>
  );
};

export const MenuText = {
  LeftIcon,
  RightIcon,
  LeftIconWithSubtitle,
  RightIconDisable,
  Withdrawal,
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentage(12),
  },
  root2: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: mvs(1),
    borderBottomColor: Color.Dark[500],
    paddingBottom: heightPercentage(12),
  },
  text: {
    color: Color.Neutral[10],
    fontSize: mvs(13),
  },
  text2: {
    fontSize: normalize(16),
    paddingLeft: ms(10),
    marginBottom: mvs(2),
    color: Color.Neutral[10],
    fontFamily: Font.InterSemiBold,
    lineHeight: mvs(24),
  },
  subtitle: {
    fontSize: normalize(12),
    paddingLeft: ms(10),
    color: Color.Dark[50],
    fontFamily: Font.InterMedium,
  },
  textDisable: {
    color: Color.Neutral[50],
    fontSize: mvs(13),
  },
  rootWithdrawal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mvs(8),
  },
});
