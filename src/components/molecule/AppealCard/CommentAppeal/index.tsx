import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

import {Gap} from '../../../atom';
import {color} from '../../../../theme';
import {widthResponsive} from '../../../../utils';
import PostComment from '../../DetailPost/PostComment';
import ChoiceIconAppeal from '../ChildrenCard/ChoiceIcon';

interface CommentAppealPropsType {
  fullname: string;
  username: string;
  repliedTo: string;
  postDate: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  onPressSelected?: () => void;
  isSelected?: boolean;
  hideChoiceIcon?: boolean;
  containerStyles?: ViewStyle;
}

const CommentAppeal: React.FC<CommentAppealPropsType> = ({
  isSelected,
  fullname,
  username,
  repliedTo,
  postDate,
  caption,
  likesCount,
  commentsCount,
  onPressSelected,
  hideChoiceIcon,
  containerStyles,
}) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {!hideChoiceIcon && (
        <>
          <ChoiceIconAppeal
            choiceOnPress={() => onPressSelected && onPressSelected()}
            selected={isSelected || false}
          />
          <Gap width={12} />
        </>
      )}
      <TouchableOpacity style={styles.componentStyle} onPress={onPressSelected}>
        <PostComment
          fullName={fullname}
          userName={username}
          artistPostId={repliedTo}
          postDate={postDate}
          commentCaption={caption}
          likeCount={likesCount}
          commentCount={commentsCount}
          hideDropDown
          appeal
        />
      </TouchableOpacity>
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
