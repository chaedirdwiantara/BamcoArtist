import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {ArrowUpIcon} from '../../../assets/icon';
import {Gap} from '../../atom';
import {mvs} from 'react-native-size-matters';

interface NewPostAvailProps {
  onPress: () => void;
  numberOfNewData: number;
}

const NewPostAvail: FC<NewPostAvailProps> = (props: NewPostAvailProps) => {
  const {onPress, numberOfNewData} = props;
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: widthResponsive(60),
        backgroundColor: color.Success[400],
        paddingHorizontal: widthResponsive(10),
        paddingVertical: widthResponsive(10),
        borderRadius: 30,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <ArrowUpIcon />
      <Gap width={4} />
      <Text
        style={{
          fontFamily: font.InterRegular,
          fontWeight: '500',
          fontSize: mvs(13),
          color: color.Neutral[10],
        }}>
        {numberOfNewData > 1
          ? `New ${numberOfNewData} Post Available`
          : 'See New Feed'}
      </Text>
    </TouchableOpacity>
  );
};

export default NewPostAvail;

const styles = StyleSheet.create({});
