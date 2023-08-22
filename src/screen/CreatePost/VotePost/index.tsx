import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {widthResponsive} from '../../../utils';
import {Gap, SsuInput} from '../../../components';
import {AddCircleIcon, MinusCircleWhiteIcon} from '../../../assets/icon';

interface VoteProps {}

interface dataVoteProps {
  id: number;
  caption: string;
}

const initialChoices: dataVoteProps[] = [
  {id: 1, caption: ''},
  {id: 2, caption: ''},
];

const VoteComponent: FC<VoteProps> = (props: VoteProps) => {
  const [selectedChoice, setSelectedChoice] = useState<number>(-1);
  const [pollDuration, setPollDuration] = useState<string>('1 Day');
  const [dataVote, setDataVote] = useState<dataVoteProps[]>(initialChoices);

  const inputOnFocus = (id: number) => {
    setSelectedChoice(id);
  };

  const handleCaptionChange = (newText: string, index: number) => {
    const updatedChoices = [...dataVote];
    updatedChoices[index] = {...updatedChoices[index], caption: newText};
    setDataVote(updatedChoices);
  };

  const handleAddChoice = () => {
    if (dataVote.length < 4) {
      const newId = dataVote.length + 1;
      const newChoice = {id: newId, caption: ''};
      setDataVote([...dataVote, newChoice]);
    }
  };

  const handleDeleteChoice = (index: number) => {
    if (dataVote.length > 2) {
      // Create a copy of dataVote without the deleted choice
      const updatedChoices = dataVote.filter((_, i) => i !== index);
      setDataVote(updatedChoices);
    }
  };

  return (
    <View>
      <View style={styles.TopContainer}>
        {dataVote.map((item, index) => (
          <>
            {index !== 0 && <Gap height={12} />}
            <View style={styles.inputContainer}>
              <SsuInput.InputText
                value={item.caption}
                onChangeText={(newText: string) =>
                  handleCaptionChange(newText, index)
                }
                placeholder={`Choice ${index + 1}`}
                containerStyles={{
                  flex: 1,
                  borderColor:
                    selectedChoice === index
                      ? color.Pink[100]
                      : color.Dark[300],
                }}
                onFocus={() => {
                  inputOnFocus(index);
                }}
                maxLength={25}
                autoFocus={index === 0}
                cursorColor={color.Pink[100]}
              />
              <Gap width={8} />
              {index === 0 && dataVote.length < 4 ? (
                <TouchableOpacity onPress={handleAddChoice}>
                  <AddCircleIcon
                    height={24}
                    width={24}
                    stroke={color.Neutral[10]}
                  />
                </TouchableOpacity>
              ) : index === 1 && dataVote.length === 2 ? (
                <TouchableOpacity disabled>
                  <MinusCircleWhiteIcon stroke="transparent" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleDeleteChoice(index)}>
                  <MinusCircleWhiteIcon />
                </TouchableOpacity>
              )}
            </View>
          </>
        ))}
      </View>
      <View style={styles.durationContainer}>
        <Text style={styles.duration}>Poll Duration</Text>
        <Text style={styles.duration}>{pollDuration}</Text>
      </View>
    </View>
  );
};

export default VoteComponent;

const styles = StyleSheet.create({
  TopContainer: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
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
  durationContainer: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: color.Dark[300],
    paddingVertical: widthResponsive(8),
    paddingHorizontal: widthResponsive(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.Dark[10],
  },
});
