import { useMemo, useRef } from "react";

const useRunOnce = <T extends (...a: any[]) => void>(fn: T) => {
  // 当前版本 trick 用闭包保持fn的值
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useMemo(() => {
    let shouldRun = true;
    return (...args: Parameters<T>): void => {
      if (shouldRun) {
        shouldRun = false;
        fnRef.current(...args);
      }
    };
  }, []);
};

export default useRunOnce;
