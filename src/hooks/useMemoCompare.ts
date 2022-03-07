import { useRef, useEffect } from 'react';

export const useMemoCompare = (next: any, compare: (prev: any, next: any) => any) => {
    const previousRef = useRef<any>();
    const previous = previousRef.current;

    const isEqual = compare(previous, next);

    useEffect(() => {
        if (!isEqual) {
            previousRef.current = next;
        }
    });

    return isEqual ? previous : next;
};
