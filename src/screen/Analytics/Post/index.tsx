import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import PopularPost from './Popular';
import {widthResponsive} from '../../../utils';
import PostEngagement from './PostEngagement';
import {Gap, StepCopilot} from '../../../components';
import {useTranslation} from 'react-i18next';

interface PostAnalyticProps {
  uuid: string;
}

const PostAnalytic: FC<PostAnalyticProps> = (props: PostAnalyticProps) => {
  const {uuid} = props;
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      {uuid && (
        <StepCopilot
          children={<PopularPost uuidMusician={uuid} />}
          order={17}
          name={t('Coachmark.PopularPost')}
          text={t('Coachmark.SubtitlePopularPost')}
        />
      )}
      <Gap height={20} />
      <StepCopilot
        children={<PostEngagement />}
        order={18}
        name={t('Coachmark.PostEngagementRate')}
        text={t('Coachmark.SubtitlePostEngagementRate')}
      />
    </View>
  );
};

export default PostAnalytic;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
  },
});
