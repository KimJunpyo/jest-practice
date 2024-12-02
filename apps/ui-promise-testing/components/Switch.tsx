"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";

const SwitchServer = () => {
  const [checked, setChecked] = useState(false);

  const callback = () => {
    setTimeout(() => {
      setChecked((prev) => !prev);
    }, 2000);
  };
  return (
    <div>
      <Switch role="switch" aria-checked={checked} onClick={callback} />
      <div role="test">{checked ? "성공" : "실패"}</div>
    </div>
  );
};

export default SwitchServer;
