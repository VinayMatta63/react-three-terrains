import { useCallback, useEffect, useRef } from "react";

const useWorker = <T, R>(Worker: new () => Worker) => {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker();
    return () => {
      workerRef.current?.terminate();
    };
  }, [Worker]);

  const postMessage = useCallback((data: T | null) => {
    workerRef.current?.postMessage(data);
  }, []);

  const onMessage = (callback: (data: R) => void) => {
    if (workerRef.current) {
      workerRef.current.onmessage = (e) => callback(e.data);
    }
  };

  return { postMessage, onMessage };
};

export default useWorker;
