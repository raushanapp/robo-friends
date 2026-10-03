import React, { useCallback } from "react";

const useCount = () => {
  const [count, setCount] = React.useState<number>(0);

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const decrementCount = useCallback(() => {
    if (count === 0) return;
    setCount((prev) => prev - 1);
  }, [count]);

  return { count, incrementCount, decrementCount };
};

export default useCount;
