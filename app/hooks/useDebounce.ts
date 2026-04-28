import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    console.log('Setting timeout for value:', value);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      console.log('Clearing timeout for value:', value);
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}