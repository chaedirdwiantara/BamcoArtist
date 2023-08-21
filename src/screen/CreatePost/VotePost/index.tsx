import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {widthResponsive} from '../../../utils';
import {Gap, SsuInput} from '../../../components';
import {AddCircleIcon} from '../../../assets/icon';

interface VoteProps {}

interface dataVoteProps {
  id: number;
  caption: string;
}

const VoteComponent: FC<VoteProps> = (props: VoteProps) => {
  const [caption, setCaption] = useState<string>('');
  const [dataVote, setDataVote] = useState<dataVoteProps[]>([
    {id: 1, caption: 'Choice 0'},
  ]);

  return (
    <View style={styles.container}>
      {dataVote.map((item, index) => (
        <View style={styles.inputContainer}>
          <SsuInput.InputText
            value={caption}
            onChangeText={(newText: string) => setCaption(newText)}
            placeholder={item.caption}
            containerStyles={{flex: 1}}
            borderColor="grey"
          />
          <Gap width={8} />
          <AddCircleIcon />
        </View>
      ))}
      <Gap height={12} />
      <Text style={styles.duration}>Poll Duration</Text>
    </View>
  );
};

export default VoteComponent;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: color.Dark[300],
    paddingVertical: widthResponsive(12),
    paddingHorizontal: widthResponsive(8),
  },
  duration: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    fontWeight: '400',
    color: color.Neutral[10],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
