import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';
import {InfoCircleIcon} from '../../../assets/icon';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';

interface BlockUserProps {
  caption: string;
  linkCaption: string;
  linkOnPress?: () => void;
}

const BlockUser: FC<BlockUserProps> = (props: BlockUserProps) => {
  const {caption, linkCaption, linkOnPress} = props;
  return (
    <View style={styles.container}>
      <InfoCircleIcon width={20} height={20} />
      <Gap width={8} />
      <Text style={styles.caption}>
        {caption}{' '}
        <Text
          style={[styles.caption, {color: color.Pink[200]}]}
          onPress={linkOnPress}>
          {linkCaption}
        </Text>
      </Text>
    </View>
  );
};

export default BlockUser;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.Dark[600],
    padding: widthResponsive(12),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
  },
  caption: {
    flex: 1,
    color: color.Dark[50],
    fontSize: mvs(12),
    fontFamily: font.InterRegular,
    fontWeight: '500',
  },
});
