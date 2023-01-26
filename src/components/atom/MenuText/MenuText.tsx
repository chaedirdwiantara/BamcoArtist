import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import {ArrowRightIcon} from '../../../assets/icon';
import {heightPercentage, normalize, width} from '../../../utils';

interface Props {
  text?: string;
  subtitle?: string;
  icon?: any;
  onPress?: () => void;
  containerStyles?: ViewStyle;
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
  const {icon = <ArrowRightIcon />, text, onPress, containerStyles} = props;

  return (
    <TouchableOpacity style={[styles.root2, containerStyles]} onPress={onPress}>
      <Text style={[Typography.Button2, styles.text]}>{text}</Text>
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

export const MenuText = {
  LeftIcon,
  RightIcon,
  LeftIconWithSubtitle,
  RightIconDisable,
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
  },
});
