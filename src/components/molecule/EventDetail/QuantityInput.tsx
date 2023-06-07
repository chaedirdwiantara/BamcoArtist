import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import {AddIcon, MinusIcon} from '../../../assets/icon';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';

const QuantityInput = ({
  value,
  onPress,
  onChangeQuantity,
}: {
  value: string;
  onPress: (type: string) => void;
  onChangeQuantity: (value: string) => void;
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <TouchableOpacity
          disabled={Number(value) <= 0}
          onPress={() => onPress('decrement')}>
          <MinusIcon
            fill={Number(value) > 0 ? Color.Neutral[10] : Color.Dark[50]}
          />
        </TouchableOpacity>
        <View style={styles.valueContainer}>
          <TextInput
            style={styles.value}
            value={value}
            keyboardType="numeric"
            onChangeText={onChangeQuantity}
          />
          {/* <InputText style={styles.value}>{value}</Text> */}
        </View>
        <TouchableOpacity onPress={() => onPress('increment')}>
          <AddIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuantityInput;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Dark[900],
    padding: heightPercentage(8),
    width: widthPercentage(140),
  },
  valueContainer: {
    flex: 1,
    margin: 'auto',
  },
  value: {
    fontSize: normalize(15),
    fontFamily: Font.InterMedium,
    color: 'white',
    alignSelf: 'center',
  },
});
