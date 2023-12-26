export type levelName = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
type itemLevel = {
  name: levelName;
  lowPoint: number;
  highPoint: number;
  label: string;
};

export const calculateGamification = (
  credit: number,
): {
  rankTitle: levelName;
  nextMilestone: number;
  nextLevelStage: levelName;
  nextLabelName: string;
  isMax: boolean;
} => {
  const rewardLevel: itemLevel[] = [
    {
      name: 'bronze',
      lowPoint: 0,
      highPoint: 1000,
      label: 'Bronze',
    },
    {
      name: 'silver',
      lowPoint: 1001,
      highPoint: 2000,
      label: 'Silver',
    },
    {
      name: 'gold',
      lowPoint: 2001,
      highPoint: 6000,
      label: 'Gold',
    },
    {
      name: 'platinum',
      lowPoint: 6001,
      highPoint: 10000,
      label: 'Platinum',
    },
    {
      name: 'diamond',
      lowPoint: 10001,
      highPoint: 9999999999999,
      label: 'Diamond',
    },
  ];
  const rewardsCredit = credit;
  const currentLevel = rewardLevel.filter(
    ar => rewardsCredit >= ar.lowPoint && rewardsCredit <= ar.highPoint,
  )[0];
  const indexCurrentLevel = rewardLevel.findIndex(
    ar => rewardsCredit >= ar.lowPoint && rewardsCredit <= ar.highPoint,
  );
  const rankTitle = currentLevel.name;
  const nextMilestone = currentLevel.highPoint;

  return {
    rankTitle,
    nextMilestone,
    nextLevelStage:
      indexCurrentLevel < rewardLevel.length - 1
        ? rewardLevel[indexCurrentLevel + 1].name
        : rewardLevel[rewardLevel.length - 1].name,
    nextLabelName:
      indexCurrentLevel < rewardLevel.length - 1
        ? rewardLevel[indexCurrentLevel + 1].label
        : rewardLevel[rewardLevel.length - 1].label,
    isMax: indexCurrentLevel === rewardLevel.length - 1,
  };
};
