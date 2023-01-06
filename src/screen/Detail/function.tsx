import {
  CommentList,
  CommentList2,
  CommentList3,
} from '../../interface/feed.interface';

export const duplicateFilter = (
  newData: CommentList[],
  oldData: CommentList2[] | CommentList3[],
) => {
  let a = [];
  for (let i = 0; i < newData.length; i++) {
    if (newData[i].parentID !== oldData[i].parentID) {
      a.push(newData[i]);
    } else if (
      newData[i].parentID === oldData[i].parentID &&
      newData[i].id !== oldData[i].id
    ) {
      a.push(newData[i]);
    }
  }
  return a;
};

export const filterParentID = (
  data: CommentList2[] | CommentList3[],
  item: string,
) => {
  let a = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentID === item) {
      a.push(data[i]);
    }
  }
  return a;
};
