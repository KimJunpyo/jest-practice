"use client";

import React, {Fragment, useState} from "react";

interface CounterProps {
  initValue?: number;
}

const MyCounter = ({initValue = 0}: CounterProps) => {
  const [count, setCount] = useState(initValue);
  return (
    <Fragment>
      <div role="count">{count}</div>
      <button onClick={() => setCount((prevState) => prevState + 1)}>+</button>
      <button onClick={() => setCount((prevState) => prevState - 1)}>-</button>
    </Fragment>
  );
};

export default MyCounter;
