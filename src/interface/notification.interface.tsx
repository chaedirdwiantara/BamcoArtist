export type GetCountUnreadNotificationResponseType = {
  code: number;
  data: number;
  message: string;
  status: number;
};

export type PaginationType = {
  page: number;
  perPage: number;
  total: number;
};

export type WordReplacerType = {
  text: string;
  link: string;
  linkType: 'screen' | 'url';
  color: string;
  fontWeight: string;
};

export type ListNotificationData = {
  id: string;
  notifImage: string[];
  content: string;
  action: string;
  isRead: number;
  createdAt: string;
  wordReplacer: WordReplacerType[];
  type: string;
};

export type ListNotificationResponseType = {
  code: number;
  data: ListNotificationData[];
  message: string;
  meta: PaginationType;
  status: number;
};
