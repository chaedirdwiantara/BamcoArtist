export const debounce = (fn: () => void) => {
  let timeoutId: number | null;
  return wrapper;
  function wrapper(...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, 600);
  }
};
