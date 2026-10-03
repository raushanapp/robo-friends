import React from "react";
//  here i am pass the props and destructure them in the function parameters and also control the count from the parent component
const CounterButtons = ({
  color,
  count,
  handleCount,
}: {
  color: string;
  count: number;
  handleCount: () => void;
}) => {
  //   const [count, setCount] = React.useState(0);
  //   const updateCount = (value: number) => {
  //     setCount(count + value);
  //   };

  //   console.log("CounterButtons rendered");

  return (
    <section>
      <button style={{ backgroundColor: color }} onClick={handleCount}>
        count :{count}
      </button>
    </section>
  );
};

export default React.memo(CounterButtons);
