import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {widthResponsive} from '../../../../utils';
import {color} from '../../../../theme';
import {ListCard} from '../../ListCard';
import ChoiceIconAppeal from '../ChildrenCard/ChoiceIcon';
import {Gap} from '../../../atom';

interface AlbumAppealProps {
  title: string;
  coverImage: string;
  year: string;
  numberOfSongs: number;
  isSelected?: boolean;
  hideChoiceIcon?: boolean;
  onPressSelected?: () => void;
  containerStyles?: ViewStyle;
}

const AlbumAppeal: FC<AlbumAppealProps> = (props: AlbumAppealProps) => {
  const {
    title,
    coverImage,
    year,
    numberOfSongs,
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
      <ListCard.MusicList
        imgUri={coverImage ?? null}
        musicTitle={title}
        singerName={`${year} * Album * ${numberOfSongs} song`}
        containerStyles={styles.componentStyle}
        hideDropdownMore
        appeal
        size={80}
      />
    </View>
  );
};

export default AlbumAppeal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  componentStyle: {
    flex: 1,
    backgroundColor: color.Dark[500],
    paddingHorizontal: widthResponsive(7),
    paddingVertical: widthResponsive(8),
    borderRadius: 4,
  },
});
