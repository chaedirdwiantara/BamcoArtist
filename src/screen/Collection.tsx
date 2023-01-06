import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const CollectionScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <Text>Collection Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
