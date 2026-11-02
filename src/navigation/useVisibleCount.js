import { useState } from 'react';

// Stored on the history entry so Back returns to the same length of list.
export function useVisibleCount(pageSize) {
  const [visibleCount, setVisibleCount] = useState(
    globalThis.history?.state?.visibleCount ?? pageSize,
  );
  const showMore = () => {
    const nextCount = visibleCount + pageSize;
    setVisibleCount(nextCount);
    window.history.replaceState({ visibleCount: nextCount }, '');
  };
  return [visibleCount, showMore];
}
