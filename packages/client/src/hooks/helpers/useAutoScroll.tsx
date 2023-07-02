import { useEffect } from 'react';

export const useAutoScroll = (selector: string) => {
  useEffect(() => {
    try {
      document?.querySelector(selector)?.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
    }
  }, []);
};
