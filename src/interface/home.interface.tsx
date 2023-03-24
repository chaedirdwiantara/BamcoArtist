export type DiveIn = {
  title: string;
  imageUrl: string;
  description: string;
  type: string;
};

export type DiveInResponseType = {
  code: number;
  data: DiveIn[];
  message: string;
  status: number;
};
