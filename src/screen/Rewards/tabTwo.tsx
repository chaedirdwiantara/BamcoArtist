import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Mission from '../../components/molecule/Reward/mission';
import {missionMenu} from '../../data/reward';
import {Button, EmptyState, Gap} from '../../components';
import {color, font} from '../../theme';
import {mvs} from 'react-native-size-matters';
import {widthResponsive} from '../../utils';

const TabTwoRewards = () => {
  const [activeIndex, setactiveIndex] = useState<number>(0);

  const onPressMenu = (index: number) => {
    setactiveIndex(index);
  };

  const onClaimMission = (id: number) => {};

  const onGoMission = (screenName: string) => {};

  const dummyData = [
    {
      id: 1,
      missionTitle: 'Complete Profile Information ',
      progress: 10,
      total: 100,
      rewardCount: 20,
      claimable: false,
      completed: false,
      screenName: 'Feed',
    },
    {
      id: 2,
      missionTitle: 'Liked on Artist Post',
      progress: 30,
      total: 30,
      rewardCount: 30,
      claimable: true,
      completed: false,
      screenName: 'Feed',
    },
    {
      id: 3,
      missionTitle: 'Voted on Artist Post',
      progress: 25,
      total: 30,
      rewardCount: 300,
      claimable: false,
      completed: false,
      screenName: 'Feed',
    },
  ];

  return (
    <View style={styles().container}>
      <View style={styles().menuStyle}>
        {missionMenu.map((data, index) => {
          return (
            <>
              <Button
                label={data.label}
                containerStyles={styles(activeIndex, index).btnClaim}
                textStyles={styles().textButton}
                onPress={() => onPressMenu(index)}
              />
              <Gap width={8} />
            </>
          );
        })}
      </View>

      <Gap height={16} />

      {dummyData.length > 0 && (
        <FlatList
          data={dummyData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <Mission
              missionTitle={item.missionTitle}
              progress={item.progress}
              total={item.total}
              rewardCount={item.rewardCount}
              onClaim={() => onClaimMission(item.id)}
              onGo={() => onGoMission(item.screenName)}
              isClaimable={item.claimable}
              isCompleted={item.completed}
            />
          )}
        />
      )}
      {/* FOR AVAILABLE VOCHER */}
      {dummyData.length == 0 && (
        <EmptyState
          text="No Mission Available"
          subtitle="Mission limit reached. Keep an eye out for 
      future opportunities!"
          hideIcon
          containerStyle={{height: 300}}
        />
      )}
    </View>
  );
};

export default TabTwoRewards;

const styles = (activeIndex?: number, index?: number) =>
  StyleSheet.create({
    container: {
      // backgroundColor: 'aqua',
    },
    btnClaim: {
      aspectRatio: undefined,
      width: undefined,
      height: undefined,
      paddingVertical: widthResponsive(6),
      paddingHorizontal: widthResponsive(16),
      backgroundColor: activeIndex === index ? color.Pink[200] : '#1A2435',
      borderRadius: 30,
    },
    textButton: {
      fontFamily: font.InterRegular,
      fontSize: mvs(10),
      fontWeight: '500',
    },
    menuStyle: {
      flexDirection: 'row',
    },
  });
