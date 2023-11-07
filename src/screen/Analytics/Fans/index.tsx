import {View} from 'react-native';
import React from 'react';
import FansGrowth from './FansGrowth';
import FansActiveInteract from './ActivelyInteract/ActivelyInteract';
import {Gap, StepCopilot} from '../../../components';
import YourTopFans from './YourTopFans';
import FansAge from './FansAge';
import FansGender from './FansGender';
import FansCountry from './FansCountry';
import {useTranslation} from 'react-i18next';

const Fans = () => {
  const {t} = useTranslation();
  return (
    <View>
      <StepCopilot
        children={<FansGrowth />}
        order={7}
        name={t('Coachmark.FansGrowth')}
        text={t('Coachmark.SubtitleFansGrowth')}
      />
      <Gap height={20} />
      <StepCopilot
        children={<YourTopFans />}
        order={8}
        name={t('Coachmark.TopFans')}
        text={t('Coachmark.SubtitleTopFans')}
      />
      <Gap height={20} />
      <StepCopilot
        children={<FansActiveInteract />}
        order={9}
        name={t('Coachmark.FansInteraction')}
        text={t('Coachmark.SubtitleFansInteraction')}
      />
      <Gap height={20} />
      <StepCopilot
        children={<FansAge />}
        order={10}
        name={t('Coachmark.FansAge')}
        text={t('Coachmark.SubtitleFansAge')}
      />
      <Gap height={20} />
      <StepCopilot
        children={<FansGender />}
        order={11}
        name={t('Coachmark.FansGender')}
        text={t('Coachmark.SubtitleFansGender')}
      />
      <Gap height={20} />
      <StepCopilot
        children={<FansCountry />}
        order={12}
        name={t('Coachmark.FansCountry')}
        text={t('Coachmark.SubtitleFansCountry')}
      />
    </View>
  );
};

export default Fans;
