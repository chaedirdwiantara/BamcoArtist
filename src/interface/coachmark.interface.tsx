export type CoachmarkParamsType = {
  tutorialId?: string;
};

export type PushProgressParamsType = {
  id?: number;
  tutorialId: number;
  orderingName: string;
  isFinished: boolean;
};

export type CoachmarkDetailsType = {
  ID: number;
  TutorialID: number;
  Language: string;
  Name: string;
  Description: string;
  Ordering: number;
  CreatedAt: string | null;
  UpdatedAt: string | null;
  DeletedAt: string | null;
};

export type CoachmarkProgressType = {
  ID: number;
  UserUUID: string;
  TutorialID: number;
  Ordering: number;
  OrderingName: string;
  IsFinished: boolean;
  CreatedAt: string | null;
  UpdatedAt: string | null;
  DeletedAt: string | null;
};

export type CoachmarkProgressResponseType = {
  code: number;
  data: CoachmarkProgressType[];
  message: string;
  status: number;
};
