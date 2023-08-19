import {
  Dimensions,
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {mvs} from 'react-native-size-matters';
import {PostList} from '../../../../interface/feed.interface';
import {elipsisText, widthResponsive} from '../../../../utils';
import {Gap} from '../../../atom';
import ImageList from '../../../../screen/ListCard/ImageList';
import VideoComp from '../../VideoPlayer/videoComp';
import ImageModal from '../../../../screen/Detail/ImageModal';
import {color, font} from '../../../../theme';
import MusicPreviewAppeal from '../ChildrenCard/MusicPreview';

export const {width} = Dimensions.get('screen');

interface ChildrenPostCardProps {
  data: PostList;
  imgWidth?: number;
  imgWidth2?: number;
}

const ChildrenPostCard: FC<ChildrenPostCardProps> = (
  props: ChildrenPostCardProps,
) => {
  const {data, imgWidth, imgWidth2} = props;

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<number>(-1);

  // ignore warning
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  const toggleModalOnPress = (index: number) => {
    setModalVisible(!isModalVisible);
    setImgUrl(index);
  };

  const toggleImageModal = () => {
    setImgUrl(-1);
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{width: '100%'}}>
      <Text style={styles.childrenPostTitle}>
        {elipsisText(data.caption, 600)}
      </Text>
      {data.images !== null ? (
        <>
          <Gap height={8} />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: '100%',
                width: '100%',
              }}>
              <ImageList
                imgData={data.images}
                height={69.5}
                heightType2={142}
                onPress={() => {}}
                disabled={true}
              />
              {data.images.length === 0 && data.quoteToPost.encodeHlsUrl ? (
                <MusicPreviewAppeal
                  title={data.quoteToPost.title}
                  musician={data.quoteToPost.musician}
                  coverImage={
                    data.quoteToPost.coverImage[1]?.image !== undefined
                      ? data.quoteToPost.coverImage[1].image
                      : ''
                  }
                  duration={data.quoteToPost.endAt}
                />
              ) : null}
              {data.video.encodeHlsUrl !== '' && (
                <TouchableOpacity disabled>
                  <VideoComp
                    id={data.id}
                    dataVideo={data.video}
                    sourceUri={data.video.encodeHlsUrl}
                    onPress={() => {}}
                    buttonIconsStyle={{
                      position: 'absolute',
                      bottom: widthResponsive(-5),
                      width: width - widthResponsive(104),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    videoContainer={{
                      width: '100%',
                      height: width - widthResponsive(150),
                    }}
                    blurModeOn
                    disabledPlayIcon
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
      ) : null}
      <ImageModal
        toggleModal={toggleImageModal}
        modalVisible={isModalVisible}
        imageIdx={imgUrl}
        dataImage={data?.images}
      />
    </View>
  );
};

export default ChildrenPostCard;

const styles = StyleSheet.create({
  childrenPostTitle: {
    flexShrink: 1,
    maxWidth: widthResponsive(288),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(13),
    color: color.Neutral[10],
    lineHeight: mvs(18.2),
  },
  videoStyle: {
    width: '100%',
    height: 300,
  },
});
