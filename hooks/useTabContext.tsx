"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

interface TabContextType {
  showTab: boolean;
  setShowTab: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowTab: (
    showTab: boolean,
    setShowTab: React.Dispatch<React.SetStateAction<boolean>>,
    tabNumber?: number
  ) => void;
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [showTab, setShowTab] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);

  const handleShowTab = (
    showTab: boolean,
    setShowTab: React.Dispatch<React.SetStateAction<boolean>>,
    tabNumber?: number
  ) => {
    if (tabNumber) {
      setCurrentTab(tabNumber);
      if (!showTab) setShowTab(true);
    } else {
      setShowTab((prev) => !prev);
    }
  };

  return (
    <TabContext.Provider
      value={{
        showTab,
        setShowTab,
        handleShowTab,
        currentTab,
        setCurrentTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context)
    throw new Error("useTabContext must be used within a TabProvider");
  return context;
};
