import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {widthResponsive} from '../../../utils';
import {DropDownFilter, Gap, SsuInput} from '../../../components';
import {AddCircleIcon, MinusCircleWhiteIcon} from '../../../assets/icon';
import {
  DataDropDownNumberType,
  DataDropDownType,
  dataDurationVote,
} from '../../../data/dropdown';
import {useTranslation} from 'react-i18next';
import {dataVoteProps} from '../../../interface/vote.interface';

interface VoteProps {
  dataVote: dataVoteProps[];
  pollDuration: DataDropDownNumberType;
  setPollDuration: React.Dispatch<
    React.SetStateAction<DataDropDownNumberType | DataDropDownType>
  >;
  setDataVote: React.Dispatch<React.SetStateAction<dataVoteProps[]>>;
  setVoteCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const VoteComponent: FC<VoteProps> = (props: VoteProps) => {
  const {
    dataVote,
    setDataVote,
    setVoteCompleted,
    pollDuration,
    setPollDuration,
  } = props;
  const [selectedChoice, setSelectedChoice] = useState<number>(-1);

  const {t} = useTranslation();

  const inputOnFocus = (id: number) => {
    setSelectedChoice(id);
  };

  const handleCaptionChange = (newText: string, index: number) => {
    const updatedChoices = [...dataVote];
    updatedChoices[index] = {...updatedChoices[index], text: newText};
    setDataVote(updatedChoices);
  };

  const handleAddChoice = () => {
    if (dataVote.length < 4) {
      const newId = dataVote.length + 1;
      const newChoice = {id: newId.toString(), text: ''};
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

  useEffect(() => {
    if (dataVote.some(item => item.text === '')) {
      setVoteCompleted(false);
    } else {
      setVoteCompleted(true);
    }
  }, [dataVote]);

  return (
    <View>
      <View style={styles.TopContainer}>
        {dataVote.map((item, index) => (
          <>
            {index !== 0 && <Gap height={12} />}
            <View style={styles.inputContainer}>
              <SsuInput.InputText
                value={item.text}
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
        <Text style={styles.duration}>{t('Vote.Duration')}</Text>
        <DropDownFilter
          labelCaption={t(pollDuration.label)}
          dataFilter={dataDurationVote}
          selectedMenu={setPollDuration}
          leftPosition={widthResponsive(25.5)}
          topPosition={widthResponsive(10)}
          bottomPosition={widthResponsive(-25)}
          containerStyle={{
            marginTop: widthResponsive(0),
            marginBottom: widthResponsive(0),
          }}
          textCustomStyle={{fontSize: mvs(13), color: color.Pink[100]}}
          iconColor={color.Neutral[10]}
          gapTextToIcon={10}
          iconSize={19}
          dropdownStyle={{width: 105}}
        />
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
