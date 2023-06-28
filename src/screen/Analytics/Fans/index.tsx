import {StyleSheet, View} from 'react-native';
import React from 'react';
import FansGrowth from './FansGrowth';
import FansActiveInteract from './ActivelyInteract/ActivelyInteract';
import {Gap} from '../../../components';
import YourTopFans from './YourTopFans';
import FansAge from './FansAge';

const Fans = () => {
  return (
    <View style={styles.container}>
      <FansGrowth />
      <Gap height={20} />
      <YourTopFans />
      <Gap height={20} />
      <FansActiveInteract />
      <Gap height={20} />
      <FansAge />
    </View>
  );
};

export default Fans;

const styles = StyleSheet.create({
  container: {},
});
