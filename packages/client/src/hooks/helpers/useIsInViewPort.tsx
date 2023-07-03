import { useEffect, useMemo, useState } from 'react';

export const useIsInViewPort = (ref: React.MutableRefObject<any>) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(() => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)), []);

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
};
