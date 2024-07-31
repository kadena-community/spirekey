import { useEffect, useState } from 'react';

export const useLocalState = (
  key: string,
  defaultValue: string,
): [string, (newValue: string) => void] => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    const localValue = localStorage.getItem(key);
    if (localValue) setValue(localValue);
  }, []);
  const setLocalValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };
  return [value, setLocalValue];
};
