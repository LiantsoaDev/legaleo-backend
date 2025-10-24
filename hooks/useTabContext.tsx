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
  handleClickSuggestion: () => void;
  handleClickEditor: () => void;
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  isSuggestionMode: boolean;
  setIsSuggestionMode: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cards: { id: number; createdAt: Date }[];
  setCards: React.Dispatch<
    React.SetStateAction<{ id: number; createdAt: Date }[]>
  >;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [showTab, setShowTab] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [isSuggestionMode, setIsSuggestionMode] = useState(false);

  const [cards, setCards] = useState<{ id: number; createdAt: Date }[]>([]);

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

  const handleClickSuggestion = () => {
    setIsSuggestionMode(true);
    setIsOpen(false);
    setCards((prev) => [...prev, { id: Date.now(), createdAt: new Date() }]);
  };

  const handleClickEditor = () => {
    if (isSuggestionMode) {
      setIsSuggestionMode(false);
    } else {
      setIsOpen(!isOpen);
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
        isSuggestionMode,
        setIsSuggestionMode,
        cards,
        setCards,
        isOpen,
        setIsOpen,
        handleClickSuggestion,
        handleClickEditor,
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
