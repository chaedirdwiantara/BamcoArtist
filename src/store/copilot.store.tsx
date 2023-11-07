import create from 'zustand';

// tutorial id = section coachmark
// from credit & tab fans = 1
// tab income = 2
// tab post = 3
// tab my music = 4
// tab discover = 5
// first post = 6
// initialName = step name where it started, ex id 1 => initialName = credit, id 2 = tab income
// copilotName = for triggering "start" coachmark when click on one of the tabs

type ScrollState = {
  tutorialId: number;
  initialName: string;
  copilotName: string;
  setTutorialId: (id: number) => void;
  setInitialName: (name: string) => void;
  setCopilotName: (name: string) => void;
};
export const useCopilotStore = create<ScrollState>(set => ({
  // initial name copilot when start the app = Live
  tutorialId: 1,
  initialName: 'Coachmark.Credit',
  copilotName: 'Coachmark.Credit',
  setTutorialId: by => set(state => ({tutorialId: by})),
  setInitialName: by => set(state => ({initialName: by})),
  setCopilotName: by => set(state => ({copilotName: by})),
}));
