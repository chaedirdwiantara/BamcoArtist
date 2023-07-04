import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import PopularPost from './Popular';
import {widthResponsive} from '../../../utils';
import PostEngagement from './PostEngagement';
import {Gap} from '../../../components';

interface PostAnalyticProps {
  uuid: string;
}

const PostAnalytic: FC<PostAnalyticProps> = (props: PostAnalyticProps) => {
  const {uuid} = props;
  return (
    <View style={styles.container}>
      {uuid && <PopularPost uuidMusician={uuid} />}
      <Gap height={20} />
      <PostEngagement />
    </View>
  );
};

export default PostAnalytic;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
  },
});
