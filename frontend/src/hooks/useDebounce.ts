import React, { useEffect, useState } from "react";

function useDebounce<T>(value: T, timeout: number) {
  const [debounceValue, setDebounceValue] = useState<T>();
  let timer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    timer = setTimeout(() => {
      setDebounceValue(value);
    }, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debounceValue;
}

export default useDebounce;
