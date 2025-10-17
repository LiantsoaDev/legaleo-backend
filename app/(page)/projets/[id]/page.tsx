"use client";
import { Editor } from "@/components/blocks/editor-00/editor";

const page = ({
  currentTab,
  setShowTab,
  showTab,
  handleShowTab,
}: {
  currentTab?: number;
  showTab?: boolean;
  setShowTab?: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowTab?: any;
}) => {
  console.log(showTab);
  return (
    <Editor
      currentTab={currentTab}
      setShowTab={setShowTab}
      showTab={showTab}
      handleShowTab={handleShowTab}
    />
  );
};

export default page;
