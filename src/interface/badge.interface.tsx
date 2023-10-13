export type BadgePropsType = {
  // fans = 1, artist = 2
  userType: 1 | 2;
  point: number;
};

export type DataBadgeType = {
  id: number;
  title: string;
  level: number;
  description: string;
  startPoint: number;
  endPoint: number;
  userType: number;
  image: {
    image: string;
    presetName: string;
  }[];
  colour: string;
  createdAt: string;
  updatedAt: string;
};

export type DataBadgeResponseType = {
  code: number;
  data: DataBadgeType;
  message: string;
  status: number;
};
