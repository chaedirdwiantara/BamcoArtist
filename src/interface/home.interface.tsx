export type DiveIn = {
  title: string;
  imageUrl: string;
  description: string;
  type: string;
  id: number;
};

export type DiveInResponseType = {
  code: number;
  data: DiveIn[];
  message: string;
  status: number;
};

export type ComingSoon = {
  id: number;
  title: string;
  musician: {
    uuid: string;
    name: string;
    imageProfile: string;
  };
  description: string;
  imageUrl: string;
  featuringArtist: string[];
  genre: {
    id: number;
    name: string;
  };
  mood: {
    id: number;
    name: string;
  };
  copyrightProducer: string[];
  copyrightVisual: string[];
  copyrightFans: string[];
  productionYear: string;
  publishedDate: string;
  language: string;
  label: string[];
  createdAt: string;
};

export type ComingSoonResponseType = {
  code: number;
  data: ComingSoon[];
  message: string;
  status: number;
};
