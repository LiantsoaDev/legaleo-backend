"use client";
import { $createDynamicFieldNode } from "@/components/blocks/editor-00/DynamicFieldNode";
import { SearchBar } from "@/components/Form";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";
import { useState } from "react";

interface DynamiqueChampsCardProps {
  champs: string[];
  classname?: string;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DynamiqueChampsCard = ({
  champs,
  classname,
  setShow,
}: DynamiqueChampsCardProps) => {
  const [isCocontractant, setIsCocontractant] = useState(true);

  const [editor] = useLexicalComposerContext();

  const insertField = (name: string) => {
    if (setShow) {
      setShow(false);
    }
    editor.update(() => {
      const node = $createDynamicFieldNode(name);
      $insertNodes([node]);
    });
  };

  return (
    <div
      className={`bg-white shadow border border-gray rounded-sm flex flex-col gap-2.5 absolute w-[300px] z-10 ${classname}`}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-0 bg-[#F2F2F2] border p-3">
        <div
          className={`py-1 bg-[#F2F2F2] cursor-pointer font-semibold text-xs text-center ${
            isCocontractant
              ? "bg-white text-black rounded-sm"
              : "bg-black text-white rounded-sm"
          } w-1/2`}
          onClick={() => setIsCocontractant(!isCocontractant)}
        >
          👤 Vous
        </div>
        <div
          className={`py-1 bg-[#F2F2F2] cursor-pointer font-semibold text-xs text-center ${
            isCocontractant
              ? "bg-black text-white rounded-sm"
              : "bg-white text-black rounded-sm"
          } w-1/2`}
          onClick={() => setIsCocontractant(!isCocontractant)}
        >
          🤝 Cocontractant
        </div>
      </div>
      <div className="px-3">
        <SearchBar
          classname="w-full border-none text-sm px-2.5 py-0 shadow-none rounded-none focus-within:shadow-none"
          placeholder="Rechercher"
        />
      </div>
      <div className="w-full h-[1px] bg-[#E3E3E3] mb-2.5" />
      {isCocontractant ? (
        <div className="flex flex-col gap-0 pb-5">
          {champs.map((champ, index) => (
            <div
              className="flex flex-row gap-2.5 bg-white font-medium text-sm py-2.5 px-5 hover:bg-[#F2F8F8] cursor-pointer"
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                insertField(champ);
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.09829 3.18C4.15424 2.98413 4.27247 2.81181 4.43508 2.68912C4.59769 2.56643 4.79584 2.50004 4.99954 2.5H14.9995C15.2032 2.50004 15.4014 2.56643 15.564 2.68912C15.7266 2.81181 15.8448 2.98413 15.9008 3.18L16.5258 5.3675C16.5624 5.48668 16.5749 5.61197 16.5625 5.73604C16.5502 5.86011 16.5131 5.98046 16.4537 6.09006C16.3942 6.19965 16.3135 6.29628 16.2162 6.37429C16.119 6.4523 16.0071 6.51012 15.8872 6.54438C15.7673 6.57863 15.6418 6.58863 15.518 6.57378C15.3942 6.55893 15.2746 6.51953 15.1662 6.4579C15.0579 6.39626 14.9629 6.31363 14.8868 6.21483C14.8107 6.11603 14.7552 6.00305 14.7233 5.8825L14.292 4.375H10.937L10.932 15.625H11.8745C12.1232 15.625 12.3616 15.7238 12.5375 15.8996C12.7133 16.0754 12.812 16.3139 12.812 16.5625C12.812 16.8111 12.7133 17.0496 12.5375 17.2254C12.3616 17.4012 12.1232 17.5 11.8745 17.5H8.12454C7.8759 17.5 7.63744 17.4012 7.46163 17.2254C7.28581 17.0496 7.18704 16.8111 7.18704 16.5625C7.18704 16.3139 7.28581 16.0754 7.46163 15.8996C7.63744 15.7238 7.8759 15.625 8.12454 15.625H9.05704L9.06204 4.375H5.70704L5.27454 5.8825C5.24268 6.00305 5.1871 6.11603 5.11104 6.21483C5.03498 6.31363 4.93998 6.39626 4.83159 6.4579C4.7232 6.51953 4.60361 6.55893 4.47981 6.57378C4.35602 6.58863 4.2305 6.57863 4.11061 6.54438C3.99073 6.51012 3.87887 6.4523 3.78161 6.37429C3.68434 6.29628 3.60361 6.19965 3.54415 6.09006C3.48468 5.98046 3.44768 5.86011 3.4353 5.73604C3.42292 5.61197 3.43541 5.48668 3.47204 5.3675L4.09829 3.18Z"
                  fill="#828282"
                />
              </svg>
              {champ}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-0 pb-5">
          {champs.map((champ, index) => (
            <div
              className="flex flex-row gap-2.5 bg-white font-medium text-sm py-2.5 px-5 hover:bg-[#F2F8F8] cursor-pointer"
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                insertField(champ);
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.09829 3.18C4.15424 2.98413 4.27247 2.81181 4.43508 2.68912C4.59769 2.56643 4.79584 2.50004 4.99954 2.5H14.9995C15.2032 2.50004 15.4014 2.56643 15.564 2.68912C15.7266 2.81181 15.8448 2.98413 15.9008 3.18L16.5258 5.3675C16.5624 5.48668 16.5749 5.61197 16.5625 5.73604C16.5502 5.86011 16.5131 5.98046 16.4537 6.09006C16.3942 6.19965 16.3135 6.29628 16.2162 6.37429C16.119 6.4523 16.0071 6.51012 15.8872 6.54438C15.7673 6.57863 15.6418 6.58863 15.518 6.57378C15.3942 6.55893 15.2746 6.51953 15.1662 6.4579C15.0579 6.39626 14.9629 6.31363 14.8868 6.21483C14.8107 6.11603 14.7552 6.00305 14.7233 5.8825L14.292 4.375H10.937L10.932 15.625H11.8745C12.1232 15.625 12.3616 15.7238 12.5375 15.8996C12.7133 16.0754 12.812 16.3139 12.812 16.5625C12.812 16.8111 12.7133 17.0496 12.5375 17.2254C12.3616 17.4012 12.1232 17.5 11.8745 17.5H8.12454C7.8759 17.5 7.63744 17.4012 7.46163 17.2254C7.28581 17.0496 7.18704 16.8111 7.18704 16.5625C7.18704 16.3139 7.28581 16.0754 7.46163 15.8996C7.63744 15.7238 7.8759 15.625 8.12454 15.625H9.05704L9.06204 4.375H5.70704L5.27454 5.8825C5.24268 6.00305 5.1871 6.11603 5.11104 6.21483C5.03498 6.31363 4.93998 6.39626 4.83159 6.4579C4.7232 6.51953 4.60361 6.55893 4.47981 6.57378C4.35602 6.58863 4.2305 6.57863 4.11061 6.54438C3.99073 6.51012 3.87887 6.4523 3.78161 6.37429C3.68434 6.29628 3.60361 6.19965 3.54415 6.09006C3.48468 5.98046 3.44768 5.86011 3.4353 5.73604C3.42292 5.61197 3.43541 5.48668 3.47204 5.3675L4.09829 3.18Z"
                  fill="#828282"
                />
              </svg>
              {champ}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
