import {View} from 'react-native';
import React from 'react';
import FansGrowth from './FansGrowth';
import FansActiveInteract from './ActivelyInteract/ActivelyInteract';
import {Gap, StepCopilot} from '../../../components';
import YourTopFans from './YourTopFans';
import FansAge from './FansAge';
import FansGender from './FansGender';
import FansCountry from './FansCountry';

const Fans = () => {
  return (
    <View>
      <StepCopilot
        children={<FansGrowth />}
        order={9}
        name="1. Fans Growth"
        text="How your followers turned into a fan by giving you a tip or subscribe your exclusive content"
      />
      <Gap height={20} />
      <StepCopilot
        children={<YourTopFans />}
        order={10}
        name="2. Fans Interaction"
        text="Summary of your active fans interaction"
      />
      <Gap height={20} />
      <StepCopilot
        children={<FansActiveInteract />}
        order={11}
        name="3. Your Top Fans"
        text="List of your die hard fans that have been support your content & album"
      />
      <Gap height={20} />
      <StepCopilot
        children={<FansAge />}
        order={12}
        name="4. Fans age"
        text="See your fans age and make better content to suit with them"
      />
      <Gap height={20} />
      <StepCopilot
        children={<FansGender />}
        order={13}
        name="5. Fans Gender"
        text="The percentage of your fans gender"
      />
      <Gap height={20} />
      <StepCopilot
        children={<FansCountry />}
        order={14}
        name="6. Fans Country"
        text="List of where do your fans comes from"
      />
    </View>
  );
};

export default Fans;
