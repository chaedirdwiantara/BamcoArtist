import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import MusicListPreview from '../ChildrenCard/MusicPreview';
import {widthResponsive} from '../../../../utils';
import {color} from '../../../../theme';
import {Gap} from '../../../atom';
import ChoiceIconAppeal from '../ChildrenCard/ChoiceIcon';

interface MusicAppealProps {
  title: string;
  musician: string;
  coverImage: string;
  duration: string;
  isSelected?: boolean;
  hideChoiceIcon?: boolean;
  onPressSelected?: () => void;
  containerStyles?: ViewStyle;
}

const MusicAppeal: FC<MusicAppealProps> = (props: MusicAppealProps) => {
  const {
    title,
    musician,
    coverImage,
    duration,
    isSelected,
    hideChoiceIcon,
    onPressSelected,
    containerStyles,
  } = props;

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
      <MusicListPreview
        title={title}
        musician={musician}
        coverImage={coverImage}
        duration={duration}
        containerStyle={styles.componentStyle}
      />
    </View>
  );
};

export default MusicAppeal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  componentStyle: {
    flex: 1,
    paddingVertical: widthResponsive(8),
    paddingHorizontal: widthResponsive(7),
    backgroundColor: color.Dark[500],
  },
});
