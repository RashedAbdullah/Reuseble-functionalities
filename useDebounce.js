// Debounce function for react.js and next.js

import { useEffect, useRef } from "react";

const useDebounce = (cb, delay) => {
  const timeoutRef = useRef();
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        return clearTimeout;
      }
    };
  });
  const debounce = (args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      cb(args);
    }, delay);
  };

  return debounce;
};

export default useDebounce;
