import {View} from 'react-native';
import React from 'react';
import FansGrowth from './FansGrowth';
import FansActiveInteract from './ActivelyInteract/ActivelyInteract';
import {Gap} from '../../../components';
import YourTopFans from './YourTopFans';
import FansAge from './FansAge';
import FansGender from './FansGender';
import FansCountry from './FansCountry';

const Fans = () => {
  return (
    <View>
      <FansGrowth />
      <Gap height={20} />
      <YourTopFans />
      <Gap height={20} />
      <FansActiveInteract />
      <Gap height={20} />
      <FansAge />
      <Gap height={20} />
      <FansGender />
      <Gap height={20} />
      <FansCountry />
    </View>
  );
};

export default Fans;
