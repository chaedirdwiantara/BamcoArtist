import {CommentList2, CommentList3} from '../../interface/feed.interface';

export const filterParentIDLvl3 = (data: CommentList3[], item: string) => {
  let a = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentID === item) {
      a.push(data[i]);
    }
  }
  return a;
};

export const filterParentIDLvl2 = (data: CommentList2[], item: string) => {
  let a = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentID === item) {
      a.push(data[i]);
    }
  }
  return a;
};

export const makeId = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
