import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {CloseCircleIcon} from '../../../assets/icon';
import {Gap} from '../../atom';

type PopUpProps = {
  containerStyle?: ViewStyle;
  title: string;
  subTitle: string;
  closeOnPress: () => void;
};

const PopUp: FC<PopUpProps> = (props: PopUpProps) => {
  const {containerStyle, title, subTitle, closeOnPress} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Gap height={6} />
        <Text style={styles.subtitle}>{subTitle}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={closeOnPress}>
          <CloseCircleIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: color.Dark[500],
    padding: widthResponsive(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  textContainer: {flex: 9},
  iconContainer: {flex: 1, alignItems: 'flex-end'},
  title: {
    fontFamily: font.InterBold,
    fontWeight: '600',
    fontSize: mvs(12),
    color: color.Neutral[10],
  },
  subtitle: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(10),
    color: color.Neutral[10],
  },
});
