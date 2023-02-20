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

export type ListNotificationData = {
  id: string;
  notifImage: null | string;
  content: string;
  action: string;
  isRead: number;
  createdAt: string;
};

export type ListNotificationResponseType = {
  code: number;
  data: ListNotificationData[];
  message: string;
  meta: PaginationType;
  status: number;
};
