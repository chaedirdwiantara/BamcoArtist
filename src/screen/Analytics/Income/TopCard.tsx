import {View, Text, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import Color from '../../../theme/Color';
import {heightResponsive, widthResponsive} from '../../../utils';
import {Gap} from '../../../components';

interface TopCardProps {
  icon: ReactNode;
  bgIcon: string;
  value: string;
  text: string;
}

const TopCard = (props: TopCardProps) => {
  const {icon, bgIcon, value, text} = props;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={[styles.iconContainer, {backgroundColor: bgIcon}]}>
          {icon}
        </View>
        <Gap width={widthResponsive(8)} />
        <Text style={styles.title}>{value}</Text>
      </View>
      <Text style={styles.subtitle}>{text}</Text>
    </View>
  );
};

export default TopCard;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: Color.Dark[400],
    borderRadius: 4,
    flex: 1,
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  iconContainer: {
    width: widthResponsive(32),
    height: heightResponsive(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(24),
    color: Color.Neutral[10],
  },
  subtitle: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(11),
    color: Color.Neutral[10],
    marginLeft: widthResponsive(40),
  },
});
