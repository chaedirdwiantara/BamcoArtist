import {useRef, useState, useCallback, useEffect} from 'react';
import {ViewToken} from 'react-native';
import {useFeedHook} from '../../../hooks/use-feed.hook';

export const usePostLogger = () => {
  const [viewedItems, setViewedItems] = useState<string[]>([]);
  const [idNow, setIdNow] = useState<string>();
  const viewedTimeout = useRef<number | null>(null);

  const {dataLog, dataLogIsError, sendLogView} = useFeedHook();

  useEffect(() => {
    //Send API call here with firstItem.id
    sendLogView({id: idNow});
  }, [idNow]);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50, // Modify this as needed
  });

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      // Clear the previous timeout
      if (viewedTimeout.current) clearTimeout(viewedTimeout.current);

      // Check if there are any viewable items
      if (viewableItems.length > 0) {
        // Get the first viewable item (assuming this is the one in focus)
        const firstItem = viewableItems[0].item;

        // If the item has not been viewed yet
        setViewedItems(prevViewedItems => {
          if (!prevViewedItems.includes(firstItem.id)) {
            // Set a timeout
            viewedTimeout.current = setTimeout(() => {
              // Set the id to be send to API
              setIdNow(firstItem.id);
            }, 3000); // 3 seconds
            return [...prevViewedItems, firstItem.id];
          } else {
            return prevViewedItems;
          }
        });
      }
    },
    [],
  );

  return {
    viewabilityConfig: viewabilityConfig.current,
    onViewableItemsChanged,
  };
};
