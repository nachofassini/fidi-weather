import { useEffect, useCallback, useReducer } from "react";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

const getStorageItemAsync = async <T>(key: string): Promise<T | null> => {
  try {
    if (typeof localStorage !== "undefined") {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
  } catch (e) {
    console.error("Local storage is unavailable:", e);
  }

  return null;
};

export async function setStorageItemAsync<T>(key: string, value: T | null) {
  try {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.error("Local storage is unavailable:", e);
  }
}

// Creates a useState hook that persists it's state in localStorage with the given key
export function useStorageState<T>(
  key: string,
  initialValue?: T
): UseStateHook<T> {
  const [state, setState] = useAsyncState<T>(
    initialValue ? [true, initialValue] : undefined
  );

  // Get
  useEffect(() => {
    getStorageItemAsync<T>(key).then((value) => setState(value));
  }, [key, setState]);

  // Set
  const setValue = useCallback(
    (value: T | null) => {
      setState(value);
      setStorageItemAsync<T>(key, value);
    },
    [key, setState]
  );

  return [state, setValue];
}
