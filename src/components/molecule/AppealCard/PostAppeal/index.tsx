import React, {FC} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {Gap} from '../../../atom';
import PostCard from './PostCardAppeal';
import ChildrenPostCard from './ChildrenPost';
import {widthResponsive} from '../../../../utils';
import ChoiceIconAppeal from '../ChildrenCard/ChoiceIcon';
import {PostList} from '../../../../interface/feed.interface';
import {PostReportedType} from '../../../../interface/setting.interface';

interface PostAppeal {
  data: PostList;
  isSelected?: boolean;
  hideChoiceIcon?: boolean;
  onPressSelected?: () => void;
  containerStyles?: ViewStyle;
}

const PostAppeal: FC<PostAppeal> = (props: PostAppeal) => {
  const {data, isSelected, hideChoiceIcon, onPressSelected, containerStyles} =
    props;
  return (
    <View style={[styles.container, containerStyles]}>
      {!hideChoiceIcon && (
        <>
          <ChoiceIconAppeal
            choiceOnPress={() => onPressSelected && onPressSelected()}
            selected={isSelected || false}
          />
          <Gap width={widthResponsive(20)} />
        </>
      )}
      <View style={styles.componentStyle}>
        <PostCard
          musicianName={data.musician.fullname}
          musicianId={data.musician.username}
          postDate={data.timeAgo}
          likeCount={data.likesCount}
          commentCount={data.commentsCount}
          category={data.category}
          isPremium={data.isPremiumPost}
          viewCount={data.viewsCount}
          shareCount={data.shareCount}
          children={<ChildrenPostCard data={data} />}
        />
      </View>
    </View>
  );
};

export default PostAppeal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  componentStyle: {
    flex: 1,
  },
});
