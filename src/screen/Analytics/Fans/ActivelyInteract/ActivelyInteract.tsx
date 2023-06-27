import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {widthResponsive} from '../../../../utils';
import {color} from '../../../../theme';

const FansActiveInteract = () => {
  return (
    <View style={styles.container}>
      <Text>FansActiveInteract</Text>
    </View>
  );
};

export default FansActiveInteract;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
});
