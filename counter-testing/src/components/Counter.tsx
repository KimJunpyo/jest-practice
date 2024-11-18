"use client";

import React, { Fragment, useState } from "react";

interface CounterProps {
  initValue?: number;
}

const MyCounter = ({ initValue = 0 }: CounterProps) => {
  const [count, setCount] = useState(initValue);
  return (
    <Fragment>
      <div role="count">{count}</div>
      <button
        className="w-4 h-4 border-white border grid place-content-center"
        onClick={() => setCount((prevState) => prevState + 1)}
      >
        +
      </button>
      <button
        className="w-4 h-4 border-white border grid place-content-center"
        onClick={() => setCount((prevState) => prevState - 1)}
      >
        -
      </button>
      <button
        className="w-10 h-4 border-white border grid place-content-center"
        onClick={() => setCount(initValue)}
      >
        reset
      </button>
    </Fragment>
  );
};

export default MyCounter;
