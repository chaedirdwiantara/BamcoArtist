import {StyleSheet, View} from 'react-native';
import React from 'react';
import PostComment from '../../DetailPost/PostComment';
import {widthResponsive} from '../../../../utils';
import {color} from '../../../../theme';

const CommentAppeal = () => {
  return (
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
      containerStyles={styles.container}
    />
  );
};

export default CommentAppeal;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(12),
    borderWidth: 1,
    borderColor: color.Dark[500],
    borderRadius: 4,
  },
});
