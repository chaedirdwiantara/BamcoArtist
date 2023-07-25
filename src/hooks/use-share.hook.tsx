import {useState} from 'react';
import {ShareLinkBodyReq} from '../interface/share.interface';
import {generateShareLink} from '../api/share';
import {
  AnalyticPostData,
  DetailPostData,
  PostList,
} from '../interface/feed.interface';

export const useShareHook = () => {
  const [shareLink, setShareLink] = useState<string>('generating...');
  const [successGetLink, setSuccessGetLink] = useState<boolean>(false);
  const [selectedSharePost, setSelectedSharePost] = useState<
    PostList | DetailPostData | AnalyticPostData
  >();

  const getShareLink = async (props: ShareLinkBodyReq) => {
    setSuccessGetLink(false);
    setShareLink('generating...');
    try {
      const response = await generateShareLink(props);
      setShareLink(response.data.short_link);
      setSuccessGetLink(true);
    } catch (error) {
      setShareLink('sorry, there is an error when generating');
      setSuccessGetLink(false);
    }
  };

  return {
    getShareLink,
    shareLink,
    successGetLink,
    setSelectedSharePost,
    selectedSharePost,
  };
};
