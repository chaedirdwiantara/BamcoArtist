import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';
import {mvs} from 'react-native-size-matters';
import {Button, Gap} from '../../atom';

interface BlockProfileUIProps {
  title: string;
  caption: string;
  buttonOnPress?: () => void;
  containerStyle?: ViewStyle;
}

const BlockProfileUI: FC<BlockProfileUIProps> = (
  props: BlockProfileUIProps,
) => {
  const {caption, title, buttonOnPress, containerStyle} = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Gap height={10} />
      <Text style={styles.caption}>{caption}</Text>
      <Gap height={16} />
      {buttonOnPress && (
        <Button
          type="border"
          label={'Ublock'}
          borderColor={color.Success[400]}
          containerStyles={styles.buttonStyle}
          textStyles={{color: color.Neutral[10]}}
          onPress={buttonOnPress}
        />
      )}
    </View>
  );
};

export default BlockProfileUI;

const styles = StyleSheet.create({
  container: {
    marginTop: widthResponsive(15),
  },
  title: {
    fontFamily: font.InterRegular,
    fontSize: mvs(16),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  caption: {
    color: color.Dark[50],
    fontSize: mvs(14),
    fontFamily: font.InterRegular,
    fontWeight: '400',
  },
  buttonStyle: {
    backgroundColor: color.Error.block,
    borderWidth: 0,
    aspectRatio: undefined,
    width: widthResponsive(100),
    height: widthResponsive(32),
    paddingHorizontal: widthResponsive(16),
    paddingVertical: widthResponsive(6),
  },
});
