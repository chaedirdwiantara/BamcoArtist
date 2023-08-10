import {StyleSheet, View} from 'react-native';
import React from 'react';
import PostComment from '../../DetailPost/PostComment';
import {widthResponsive} from '../../../../utils';
import {color} from '../../../../theme';
import ChoiceIconAppeal from '../ChildrenCard/ChoiceIcon';
import {Gap} from '../../../atom';

const CommentAppeal = () => {
  return (
    <View style={styles.container}>
      <ChoiceIconAppeal choiceOnPress={() => {}} selected={false} />
      <Gap width={12} />
      <PostComment
        fullName="Sam"
        userName="Samsibar"
        artistPostId="Hamzahaz"
        postDate="21 Jun 2014"
        commentCaption="Pucek"
        likeCount={0}
        commentCount={100}
        hideDropDown
        appeal
        containerStyles={styles.componentStyle}
      />
    </View>
  );
};

export default CommentAppeal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  componentStyle: {
    flex: 1,
    padding: widthResponsive(12),
    borderWidth: 1,
    borderColor: color.Dark[500],
    borderRadius: 4,
  },
});
