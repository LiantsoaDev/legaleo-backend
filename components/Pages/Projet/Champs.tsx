"use client";

import { Input } from "@/components/Form";
import { Paragraphe, Title } from "@/components/Typography";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const Champs = () => {
  const [showRedacteur, setShowRedacteur] = useState(false);
  const [showPourCocontractant, setShowPourCocontractant] = useState(false);
  return (
    <div className="flex flex-col gap-0">
      <div className="flex justify-between items-center p-5 border-b border-gray">
        <Title className="font-bold text-base text-black" level={3}>
          Champs
        </Title>
        <div className="flex flex-row gap-2.5 items-center">
          <span className="py-1 px-2.5 bg-[#FEEDEA] text-[#F35029] font-bold text-xs rounded-sm uppercase">
            à completer
          </span>
          <span className="px-1.5 py-0.5 bg-[#F2F2F2] rounded-full text-[#828282] text-[10px]">
            0/3
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-5 border-b border-gray px-5 py-5">
        <div
          className="flex flex-row justify-between items-center cursor-pointer"
          onClick={() => setShowRedacteur(!showRedacteur)}
        >
          <Title className="font-semibold text-sm text-black">
            👤 Rédacteur du contrat
          </Title>
          {showRedacteur ? (
            <FontAwesomeIcon icon={faChevronUp} className="text-sm" />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
          )}
        </div>
        {showRedacteur && (
          <div className="px-3 py-2.5 flex flex-col gap-5">
            <Paragraphe className="font-medium text-xs text-[#828282] leading-5">
              Ces champs sont à compléter par vous, en tant que rédacteur du
              contrat.
            </Paragraphe>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col gap-3">
                  <span className="font-semibold text-black text-xs">
                    Lorem ipsum dolor sit amet
                  </span>
                  <span className="font-medium text-[10px] text-[#828282]">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <span className="py-1 px-2.5 bg-[#FEEDEA] text-[#F35029] font-bold text-xs rounded-sm uppercase">
                  à completer
                </span>
              </div>
              <Input
                type="text"
                placeholder="Entrez une valeur..."
                name="text"
                classname="placeholder:text-xs text-xs"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col gap-3">
                  <span className="font-semibold text-black text-xs">
                    Lorem ipsum dolor sit amet
                  </span>
                  <span className="font-medium text-[10px] text-[#828282]">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <span className="py-1 px-2.5 bg-[#FEEDEA] text-[#F35029] font-bold text-xs rounded-sm uppercase">
                  à completer
                </span>
              </div>
              <Input
                type="text"
                placeholder="Entrez une valeur..."
                name="text"
                classname="placeholder:text-xs text-xs"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col gap-3">
                  <span className="font-semibold text-black text-xs">
                    Lorem ipsum dolor sit amet
                  </span>
                  <span className="font-medium text-[10px] text-[#828282]">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <span className="py-1 px-2.5 bg-[#FEEDEA] text-[#F35029] font-bold text-xs rounded-sm uppercase">
                  à completer
                </span>
              </div>
              <Input
                type="text"
                placeholder="Entrez une valeur..."
                name="text"
                classname="placeholder:text-xs text-xs"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 border-b border-gray px-5 py-5">
        <div
          className="flex flex-row justify-between items-center cursor-pointer"
          onClick={() => setShowPourCocontractant(!showPourCocontractant)}
        >
          <Title className="font-semibold text-sm text-black">
            🤝 Pour le co-contractant
          </Title>
          {showRedacteur ? (
            <FontAwesomeIcon icon={faChevronUp} className="text-sm" />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
          )}
        </div>
        {showPourCocontractant && (
          <div className="px-3 py-2.5 flex flex-col gap-5">
            <Paragraphe className="font-medium text-xs text-[#828282] leading-5">
              Ces champs seront à faire compléter ou vérifier par votre
              co-contractant.
            </Paragraphe>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col gap-3">
                  <span className="font-semibold text-black text-xs">
                    Lorem ipsum dolor sit amet
                  </span>
                  <span className="font-medium text-[10px] text-[#828282]">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
              <Input
                type="text"
                placeholder="Entrez une valeur..."
                name="text"
                classname="placeholder:text-xs text-xs"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col gap-3">
                  <span className="font-semibold text-black text-xs">
                    Lorem ipsum dolor sit amet
                  </span>
                  <span className="font-medium text-[10px] text-[#828282]">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
              <Input
                type="text"
                placeholder="Entrez une valeur..."
                name="text"
                classname="placeholder:text-xs text-xs"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col gap-3">
                  <span className="font-semibold text-black text-xs">
                    Lorem ipsum dolor sit amet
                  </span>
                  <span className="font-medium text-[10px] text-[#828282]">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
              <Input
                type="text"
                placeholder="Entrez une valeur..."
                name="text"
                classname="placeholder:text-xs text-xs"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
