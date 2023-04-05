import { useRef, useEffect } from 'react';

// compares objects that are hook dependencies to prevent infinite re-renders

export const useMemoCompare = (next: any) => {
  const previousRef = useRef<any>();
  const previous = previousRef.current;

  const isEqual = JSON.stringify(next) === JSON.stringify(previous);

  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });

  return isEqual ? previous : next;
};
