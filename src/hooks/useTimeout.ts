import React, { useState, useEffect } from "react";

import { Configs } from "../constants/Configs";

const useTimeout = (
  isReady: boolean,
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  useEffect(() => {
    if (isReady === true) {
      const timer: NodeJS.Timeout = setTimeout(() => {
        setIsReady(false);
      }, Number(Configs.ALERT_TIMEOUT));
      return () => clearTimeout(timer);
    }
  }, [isReady]);
};

export default useTimeout;
