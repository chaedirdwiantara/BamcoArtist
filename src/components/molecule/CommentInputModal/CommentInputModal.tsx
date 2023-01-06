import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import Modal from 'react-native-modal';
import {heightPercentage, normalize, widthResponsive} from '../../../utils';
import {Avatar, Gap, SsuInput} from '../..';
import {color, font} from '../../../theme';
import {ms} from 'react-native-size-matters';
import {CloseIcon} from '../../../assets/icon';

interface ModalImageProps {
  toggleModal: () => void;
  modalVisible: boolean;
  name: string;
  userAvatarUri?: string;
  commentValue?: string;
  onCommentChange?: (newType: string) => void;
  handleOnPress: () => void;
  onModalHide?: () => void;
}

const CommentInputModal: FC<ModalImageProps> = (props: ModalImageProps) => {
  const {
    toggleModal,
    modalVisible,
    name,
    commentValue,
    onCommentChange,
    handleOnPress,
    onModalHide,
    userAvatarUri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxwjjgqL0vLByyI1sXSGF3Q08PXEmPTUbL6w&usqp=CAU',
  } = props;

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      onModalHide={onModalHide}
      style={styles.modalStyle}>
      <View style={styles.container}>
        <View style={styles.headerComment}>
          <Text style={styles.textHeader}>
            Replied to<Text style={{color: color.Pink[100]}}> {name}</Text>
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <CloseIcon
              height={ms(8)}
              width={ms(8)}
              stroke={color.Neutral[10]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar imgUri={userAvatarUri} size={32} />
            <Gap width={12} />
            <SsuInput.InputText
              value={commentValue}
              onChangeText={(newText: string) => onCommentChange?.(newText)}
              placeholder={'Reply as <your name>...'}
              containerStyles={{
                width: widthResponsive(209),
                backgroundColor: 'transparent',
                paddingLeft: 0,
              }}
              multiline={true}
            />
          </View>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleOnPress}>
            <Text style={styles.buttonText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios' ? 'padding' : 'height'
        }></KeyboardAvoidingView>
    </Modal>
  );
};

export default CommentInputModal;

const styles = StyleSheet.create({
  modalStyle: {
    marginHorizontal: 0,
    marginVertical: 0,
    marginBottom: -1,
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    backgroundColor: color.Dark[800],
  },
  headerComment: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.Dark[500],
    paddingHorizontal: widthResponsive(24),
    paddingVertical: heightPercentage(6),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textHeader: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthResponsive(24),
    paddingVertical: heightPercentage(16),
  },
  buttonStyle: {
    backgroundColor: color.Pink[2],
    borderRadius: 4,
    paddingVertical: ms(6),
    width: widthResponsive(62),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: normalize(11),
  },
  closeButton: {
    width: widthResponsive(24),
    paddingVertical: heightPercentage(4),
    alignItems: 'center',
  },
});
