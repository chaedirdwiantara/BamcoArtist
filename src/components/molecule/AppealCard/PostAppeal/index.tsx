import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import PostCard from './PostCardAppeal';
import ChildrenPostCard from './ChildrenPost';
import {PostList} from '../../../../interface/feed.interface';

const dataDummy: PostList = {
  id: '6wvXjK34g',
  caption: 'beatiful nature🍃',
  likesCount: 1,
  commentsCount: 0,
  category: 'day_in_life',
  images: [],
  // images: [
  //   [
  //     {
  //       image:
  //         'https://storage.googleapis.com/media-storage-81b162d8/823377-thumbnail.jpeg',
  //       presetName: 'thumbnail',
  //     },
  //     {
  //       image:
  //         'https://storage.googleapis.com/media-storage-81b162d8/823377-small.jpeg',
  //       presetName: 'small',
  //     },
  //     {
  //       image:
  //         'https://storage.googleapis.com/media-storage-81b162d8/823377-medium.jpeg',
  //       presetName: 'medium',
  //     },
  //     {
  //       image:
  //         'https://storage.googleapis.com/media-storage-81b162d8/823377-large.jpeg',
  //       presetName: 'large',
  //     },
  //   ],
  //   [
  //     {
  //       image:
  //         'https://storage.googleapis.com/media-storage-81b162d8/823377-thumbnail.jpeg',
  //       presetName: 'thumbnail',
  //     },
  //     {
  //       image:
  //         'https://storage.googleapis.com/media-storage-81b162d8/823377-small.jpeg',
  //       presetName: 'small',
  //     },
  //     {
  //       image:
  //         'https://storage.googleapis.com/media-storage-81b162d8/823377-medium.jpeg',
  //       presetName: 'medium',
  //     },
  //     {
  //       image:
  //         'https://storage.googleapis.com/media-storage-81b162d8/823377-large.jpeg',
  //       presetName: 'large',
  //     },
  //   ],
  //   [
  //     {
  //       image:
  //         'https://storage.googleapis.com/media-storage-81b162d8/823377-thumbnail.jpeg',
  //       presetName: 'thumbnail',
  //     },
  //     {
  //       image:
  //         'https://storage.googleapis.com/media-storage-81b162d8/823377-small.jpeg',
  //       presetName: 'small',
  //     },
  //     {
  //       image:
  //         'https://storage.googleapis.com/media-storage-81b162d8/823377-medium.jpeg',
  //       presetName: 'medium',
  //     },
  //     {
  //       image:
  //         'https://storage.googleapis.com/media-storage-81b162d8/823377-large.jpeg',
  //       presetName: 'large',
  //     },
  //   ],
  // ],
  musician: {
    uuid: 'dc24c143-b6df-48a8-a5bb-ae296e66ccc8',
    username: 'dzik',
    fullname: 'Seko Band',
    email: 'dzik@upi.edu',
    imageProfileUrls: [
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/000124-thumbnail.jpeg',
        presetName: 'thumbnail',
      },
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/000124-small.jpeg',
        presetName: 'small',
      },
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/000124-medium.jpeg',
        presetName: 'medium',
      },
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/000124-large.jpeg',
        presetName: 'large',
      },
    ],
    followers: 0,
    isFollowed: true,
  },
  createdAt: '2023-07-26T13:18:07Z',
  updatedAt: '2023-08-04T12:58:44Z',
  isLiked: true,
  isPremiumPost: false,
  isSubscribe: false,
  quoteToPost: {
    targetId: 'fdfdfr3r3',
    targetType: 'video',
    title: 'ada apa denganku',
    musician: 'seko bang',
    coverImage: [
      {
        image:
          'https://customer-j4g673mr0gncpv44.cloudflarestream.com/ed1a4e286008206514eb9f04eafae29a/thumbnails/thumbnail.jpg',
        presetName: 'thumbnail',
      },
      {
        image:
          'https://customer-j4g673mr0gncpv44.cloudflarestream.com/ed1a4e286008206514eb9f04eafae29a/thumbnails/thumbnail.jpg',
        presetName: 'thumbnail',
      },
    ],
    encodeDashUrl: 'null',
    encodeHlsUrl: '',
    startAt: '00:00',
    endAt: '00:00',
    lyrics: 'fdfd',
    originalSongUrl: 'http://',
  },
  video: {
    coverImage: [
      {
        image:
          'https://customer-j4g673mr0gncpv44.cloudflarestream.com/ed1a4e286008206514eb9f04eafae29a/thumbnails/thumbnail.jpg',
        presetName: 'thumbnail',
      },
    ],
    encodeDashUrl:
      'https://customer-j4g673mr0gncpv44.cloudflarestream.com/ed1a4e286008206514eb9f04eafae29a/manifest/video.mpd',
    // encodeHlsUrl: '',
    encodeHlsUrl:
      'https://customer-j4g673mr0gncpv44.cloudflarestream.com/ed1a4e286008206514eb9f04eafae29a/manifest/video.m3u8',
    duration: '00:10',
    views: 0,
  },
  timeAgo: '1 weeks',
  viewsCount: 35,
  shareCount: 0,
};

interface PostAppeal {
  data: PostList;
}

const PostAppeal: FC<PostAppeal> = (props: PostAppeal) => {
  const {data} = props;
  return (
    // TODO: CHANGE THE DUMMY DATA LATER YA BAMBANG
    <PostCard
      musicianName={dataDummy.musician.fullname}
      musicianId="123"
      postDate="27 Des 2022"
      likeCount={20}
      commentCount={21}
      category="Backstate"
      isPremium
      viewCount={3}
      shareCount={9}
      children={<ChildrenPostCard data={dataDummy} />}
    />
  );
};

export default PostAppeal;

const styles = StyleSheet.create({});
