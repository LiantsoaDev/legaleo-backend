"use client";
import { getErrorMessage, getInputValue } from "@/utils/functions";
import {
  CheckBoxProps,
  InputFilesProps,
  InputProps,
  MultiSelectGroupProps,
  RadioProps,
  SelectProps,
} from "@/utils/types";
import {
  faChevronDown,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import { WorkspaceItem } from "../Pages/MonCompte";
import { Documents } from "../Pages/Onboarding/Documents";
import { useOnboardingFormData } from "../Pages/Onboarding/OnboardingFormContext";
import { Paragraphe, Title } from "../Typography";
import { Notices } from "../Typography/Tips";
import { SearchBar } from "./SearchBar";

export const Input = ({
  type,
  placeholder,
  label,
  isrequired,
  name,
  classname,
  nombreCaractere,
  onChange,
  defaultValue,
}: InputProps) => {
  const onboardingFormData = useOnboardingFormData();
  const contextValue =
    onboardingFormData && name in onboardingFormData
      ? onboardingFormData[name]
      : undefined;
  const initialValue =
    typeof contextValue === "string"
      ? contextValue
      : typeof defaultValue === "string"
      ? defaultValue
      : "";

  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const computedType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  useEffect(() => {}, [value, error, showPassword]);

  useEffect(() => {
    if (typeof contextValue === "string") {
      setValue(contextValue);
      setError(false);
    } else if (typeof defaultValue === "string") {
      setValue(defaultValue);
      setError(false);
    } else if (contextValue === undefined && defaultValue === undefined) {
      setValue("");
      setError(false);
    }
  }, [contextValue, defaultValue]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    getInputValue(e, setValue, setError);
    onChange?.(e);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className="form-label font-manrope text-sm font-semibold"
        htmlFor={name}
      >
        {label ? label : ""}
      </label>
      {type === "textarea" ? (
        <textarea
          className={`w-full border rounded-md px-2 py-3 md:px-4 md:py-4 lg:px-2 lg:py-3 md:text-lg lg:text-base focus:outline-none focus:bg-white focus:text-black outline-none text-black resize-none ${
            error ? "border-danger" : "border-gray"
          } bg-transparent placeholder:capitalize ${classname}`}
          placeholder={placeholder}
          name={name}
          required={isrequired}
          id={name}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <div className="relative">
          <input
            className={`w-full border border-opacity-60 rounded-sm px-2 py-3 md:px-4 md:py-4 lg:px-2 lg:py-3 md:text-lg lg:text-base focus:outline-none focus:bg-white focus:text-black outline-none text-black ${
              error ? "border-danger" : "border-gray"
            } bg-transparent ${classname}`}
            type={computedType}
            placeholder={placeholder}
            name={name}
            required={isrequired}
            id={name}
            formNoValidate
            value={value}
            onChange={handleChange}
          />
          {type === "password" && (
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[50%] translate-y-[-50%] transform cursor-pointer"
            />
          )}
          {nombreCaractere && (
            <div className="flex justify-end text-xs text-[#828282] mt-2">
              {value.length} / {nombreCaractere}
            </div>
          )}
        </div>
      )}
      {error && (
        <span className="text-danger text-sm md:text-lg lg:text-sm mt-1">
          {getErrorMessage(type, value)}
        </span>
      )}
    </div>
  );
};

export const CheckBox = ({
  value,
  id,
  isSelected,
  onSelect,
  name,
  type,
  showLogo,
  classLabel = "",
  classSelected,
  hasToRedirectTo,
  redirectTo,
}: CheckBoxProps) => {
  useEffect(() => {
    if (value.toLocaleLowerCase().includes("non") && redirectTo && isSelected) {
      redirect(redirectTo);
    }
  }, [value, hasToRedirectTo, isSelected]);

  return (
    <div>
      <label
        htmlFor={id}
        className={`py-3 px-5 font-manrope border border-[#8C8783] select-none text-xl flex items-center gap-2.5 cursor-pointer text-[#8C8783] rounded-md ${classLabel} ${
          isSelected
            ? `bg-[#087F83] text-white border-none ${classSelected}`
            : "bg-transparent"
        }`}
      >
        {showLogo &&
          (isSelected ? (
            <div className="w-5 h-5 bg-[#62E7EB] border border-gray rounded-full" />
          ) : (
            <div className="w-5 h-5 bg-transparent border border-[#8C8783] rounded-full" />
          ))}
        {/* {showLogo && <FontAwesomeIcon icon={faCircle} className="text-base" />} */}
        {value}
      </label>
      <input
        type={type}
        checked={isSelected}
        onChange={onSelect}
        className="hidden"
        name={name}
        id={id}
        value={value}
      />
    </div>
  );
};

export const RadioGroup = ({
  name,
  options,
  showLogo = false,
  classContainer,
  classLabel,
  classSelected,
  redirectTo,
  onChange,
  questionId,
  setAnswers,
  id,
  defaultValue,
}: RadioProps) => {
  const onboardingFormData = useOnboardingFormData();
  const storedValue =
    defaultValue ??
    (name && onboardingFormData && onboardingFormData[name]
      ? onboardingFormData[name]
      : undefined);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const normalizeChoice = (option: string) => {
    const lowered = option.toLocaleLowerCase();
    if (lowered.includes("oui")) {
      return "oui";
    }
    if (lowered.includes("non")) {
      return "non";
    }
    return lowered
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  useEffect(() => {
    if (typeof storedValue !== "string") {
      if (storedValue === undefined) {
        setSelectedValue("");
      }
      return;
    }
    const normalizedStored = normalizeChoice(storedValue);
    const match = options.find((option) => {
      const normalizedOption = normalizeChoice(option);
      return (
        normalizedOption === normalizedStored ||
        option.toLocaleLowerCase() === storedValue.toLocaleLowerCase()
      );
    });
    if (match) {
      setSelectedValue(match);
    }
  }, [options, storedValue]);

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    const normalized = normalizeChoice(option);
    onChange?.(normalized, option);
    if (questionId && setAnswers) {
      setAnswers((prev) => ({ ...prev, [questionId]: normalized }));
    }
  };
  return (
    <div className={`flex gap-4 flex-wrap ${classContainer}`}>
      {options.map((option, index) => (
        <CheckBox
          showLogo={showLogo}
          key={index}
          id={id ? `${id}-${index}` : `radio-${name}-${index}`}
          value={option}
          isSelected={selectedValue === option}
          onSelect={() => handleSelect(option)}
          name={name}
          type="radio"
          classLabel={classLabel}
          classSelected={classSelected}
          redirectTo={redirectTo}
        />
      ))}
    </div>
  );
};

export const MultiSelectGroup = ({
  options,
  showLogo,
  name,
}: MultiSelectGroupProps) => {
  const onboardingFormData = useOnboardingFormData();
  const storedValue =
    name && onboardingFormData && onboardingFormData[name]
      ? onboardingFormData[name]
      : undefined;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(storedValue)) {
      setSelectedOptions(storedValue);
    } else if (typeof storedValue === "string" && storedValue.length > 0) {
      setSelectedOptions([storedValue]);
    } else if (storedValue === undefined) {
      setSelectedOptions([]);
    }
  }, [storedValue]);

  const handleSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      // On retire l'option si elle est déjà sélectionnée
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      // On l'ajoute sinon
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  return (
    <div className="flex gap-4 flex-wrap">
      {options.map((option, index) => (
        <CheckBox
          showLogo={showLogo}
          key={index}
          id={`checkbox-${index}`}
          value={option}
          isSelected={selectedOptions.includes(option)}
          onSelect={() => handleSelect(option)}
          type="checkbox"
          name={name}
        />
      ))}
    </div>
  );
};

export const InputFiles = ({
  label,
  name,
  accept,
  isrequired,
  id,
}: InputFilesProps) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="flex flex-row gap-2.5 py-4 px-8 border-[3px] border-[#A7B0FF] border-dashed font-semibold text-md cursor-pointer rounded-2xl w-full text-xl"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 21.25V3.75"
            stroke="#3300FF"
            strokeWidth="1.875"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 26.25H5"
            stroke="#3300FF"
            strokeWidth="1.875"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.2503 15L14.999 21.2512L8.74902 15"
            stroke="#3300FF"
            strokeWidth="1.875"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {label}{" "}
        {fileName && <span className="text-gray-600 text-xl">{fileName}</span>}
      </label>
      <input
        type="file"
        className="hidden"
        name={name}
        id={id}
        required={isrequired}
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
};

export const Select = ({
  id,
  name,
  options,
  isMultiple = false,
  classname = "",
  isFilter = false,
  defaultValue = "Sélectionnez une option",
  onChange,
}: SelectProps) => {
  const [selects, setSelects] = useState([0]);
  const onboardingFormData = useOnboardingFormData();
  const storedValue =
    onboardingFormData && name && onboardingFormData[name]
      ? onboardingFormData[name]
      : undefined;
  const [selectedValue, setSelectedValue] = useState<string>(
    typeof storedValue === "string" ? storedValue : ""
  );

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onChange?.(option);
  };

  useEffect(() => {
    if (typeof storedValue === "string") {
      setSelectedValue(storedValue);
    } else if (storedValue === undefined) {
      setSelectedValue("");
    }
  }, [storedValue]);

  const addSelect = () => {
    setSelects((prev) => [...prev, prev.length]);
  };

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-between">
      {selects.map((index) => (
        <div className="flex flex-col gap-10 w-full" key={index}>
          <div className="flex flex-row w-full">
            <div className="relative w-full">
              <select
                name={name}
                id={id}
                className={`w-[80%] border border-gray relative rounded-md px-8 py-5 bg-white text-black focus:outline-none appearance-none after:content-[''] ${classname}`}
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
                value={selectedValue}
                onChange={(e) => handleSelect(e.target.value)}
              >
                {!isFilter && (
                  <option value="" disabled>
                    {defaultValue}
                  </option>
                )}

                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute top-[50%] translate-y-[-50%] z-10 right-[10px] text-xs text-[#86A2A3]"
              />
            </div>
            {isMultiple && index === selects.length - 1 && (
              <button
                className="appearance-none text-lg ml-3 text-accent cursor-pointer"
                onClick={addSelect}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </div>
          {selectedValue.toLocaleLowerCase() === "autre" && (
            <Input
              type="textarea"
              placeholder="Veuillez préciser"
              name="autre"
              classname="h-56"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export const SelectWithSearch = () => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="relative z-20">
      <div
        className="flex gap-2 items-center relative bg-[#F2F8F8] text-[#86A2A3] text-xs font-semibold rounded-md px-3 py-2.5 w-fit cursor-pointer"
        onClick={() => setShowOptions(!showOptions)}
      >
        Workspace
        <FontAwesomeIcon
          icon={faChevronDown}
          className="text-xs text-[#86A2A3]"
        />
      </div>
      {showOptions && (
        <div className="w-80 h-80 rounded-md py-3.5 bg-white border border-[#E3E3E3] absolute top-9 left-0">
          <div className="px-5 border-b border-b-gray pb-3.5">
            <SearchBar
              classname="w-full focus-within:shadow-none border border-gray"
              iconClassname="text-xl"
            />
          </div>
          <div className="px-5 h-[60%] py-3.5">
            <WorkspaceItem name="workspace" />
          </div>
          <div className="border-t border-t-gray py-3.5 px-5">
            <div className="flex flex-row justify-between items-center">
              <Button
                classname="!bg-[#F2F2F2] !py-2 !px-4 !rounded-sm !text-sm !font-bold !cursor-pointer !text-[#828282] hover:!bg-[#E0E0E0] !transition hover:!border-none !w-fit"
                onclick={() => setShowOptions(false)}
              >
                Annuler
              </Button>
              <Button classname="!bg-[#087F83] !py-2 !px-4 !rounded-sm !text-sm !font-bold !cursor-pointer !text-white hover:!bg-[#087F83] hover:opacity-70 !transition hover:!border-none !w-fit">
                Appliquer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const has_dip = ["✅ Oui, je l’ai déjà", "❌ Non, pas encore"];

interface SelectTypeReseauProps {
  options: string[];
  id: string;
  name: string;
  classname?: string;
}

export const SelectTypeReseau = ({
  options,
  id,
  name,
  classname,
}: SelectTypeReseauProps) => {
  const onboardingFormData = useOnboardingFormData();
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    if (
      onboardingFormData &&
      name &&
      typeof onboardingFormData[name] === "string"
    ) {
      setSelectedType(onboardingFormData[name]);
    } else if (!onboardingFormData || onboardingFormData[name] === undefined) {
      setSelectedType("");
    }
  }, [onboardingFormData, name]);

  return (
    <>
      <Paragraphe className="font-medium text-xl">
        Quel est le type de votre réseau ?
      </Paragraphe>
      <Select
        options={options}
        id={id}
        name={name}
        classname={classname}
        onChange={(val) => setSelectedType(val)}
      />
      <Notices classname="mt-10">
        Nous configurons vos modèles selon la structure choisie.
      </Notices>
      {(selectedType === "Franchise" ||
        selectedType === "Licence de marque" ||
        selectedType === "Concession" ||
        selectedType === "Commission-affiliation" ||
        selectedType === "Cooperative") && (
        <>
          <Paragraphe className="font-medium text-xl">
            Disposez-vous déjà d’un DIP (Document d’Information
            Précontractuelle) ?
          </Paragraphe>
          <RadioGroup
            showLogo={false}
            options={has_dip}
            name={`${name}_dip_status`}
          />
        </>
      )}
      {(selectedType === "Distribution sélective" ||
        selectedType === "Partenariat") && (
        <>
          <Paragraphe className="font-medium text-xl">
            Souhaitez-vous générer un modèle adapté à ce type de réseau ?
          </Paragraphe>
          <RadioGroup
            showLogo={false}
            options={has_dip}
            name={`${name}_modele`}
          />
        </>
      )}
    </>
  );
};

interface SelectCRMProps {
  options: string[];
  name: string;
}

const CRM = ["Cerca", "Cleonet", "Hubspot", "Pipedrive", "Autre"];

export const SelectCRM = ({ name, options }: SelectCRMProps) => {
  const onboardingFormData = useOnboardingFormData();
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    if (
      onboardingFormData &&
      name &&
      typeof onboardingFormData[name] === "string"
    ) {
      setSelectedType(onboardingFormData[name]);
    } else if (!onboardingFormData || onboardingFormData[name] === undefined) {
      setSelectedType("");
    }
  }, [onboardingFormData, name]);
  return (
    <>
      <Paragraphe className="font-medium text-xl">
        Utilisez-vous un CRM pour suivre vos candidats ?
      </Paragraphe>
      <RadioGroup
        showLogo={false}
        options={options}
        name={name}
        onChange={(val) => setSelectedType(val)}
      />
      {selectedType.toLocaleLowerCase().includes("oui") && (
        <>
          <Paragraphe className="font-medium text-xl">
            Quel CRM utilisez-vous ? :
          </Paragraphe>
          <Select
            options={CRM}
            id="crm_outil"
            name="crm_outil"
            classname="w-full"
          />
        </>
      )}
    </>
  );
};

interface SelectImporterProps {
  options: string[];
  name: string;
  onClick: () => void;
}

export const SelectImporter = ({
  options,
  name,
  onClick,
}: SelectImporterProps) => {
  const onboardingFormData = useOnboardingFormData();
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    if (
      onboardingFormData &&
      name &&
      typeof onboardingFormData[name] === "string"
    ) {
      setSelectedType(onboardingFormData[name]);
    } else if (!onboardingFormData || onboardingFormData[name] === undefined) {
      setSelectedType("");
    }
  }, [onboardingFormData, name]);
  return (
    <>
      <div className="flex flex-col gap-5 min-h-screen justify-center px-32 py-20 w-full">
        <Title className="font-bold text-4xl leading-[100%] mb-5 w-full">
          Rédaction et gestion de contrat
        </Title>
        <Paragraphe className="font-medium text-xl">
          Disposez-vous aujourd’hui d’un service (interne ou externe) dédié au
          recrutement de vos franchisés ?
        </Paragraphe>
        <RadioGroup
          showLogo={false}
          options={options}
          name={name}
          onChange={(val) => setSelectedType(val)}
        />
      </div>
      {selectedType.toLocaleLowerCase().includes("oui") && (
        <Documents onClick={() => onClick()} />
      )}
    </>
  );
};

interface TextareaIAProps {
  name: string;
  suggestions: string[];
  classname?: string;
}

export const TextareaIA = ({
  name,
  suggestions,
  classname,
}: TextareaIAProps) => {
  const onboardingFormData = useOnboardingFormData();
  const storedValue =
    onboardingFormData && name && onboardingFormData[name]
      ? onboardingFormData[name]
      : undefined;
  const [value, setValue] = useState(
    typeof storedValue === "string" ? storedValue : ""
  );

  useEffect(() => {
    if (typeof storedValue === "string") {
      setValue(storedValue);
    } else if (storedValue === undefined) {
      setValue("");
    }
  }, [storedValue]);
  return (
    <div
      className={`w-full h-56 border border-[#E3E3E3] rounded-xl relative p-5 ${classname}`}
    >
      <textarea
        name={name}
        id=""
        className="w-full h-full appearance-none outline-none focus-within:outline-none resize-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <AssistantTextarea
        suggestions={suggestions}
        setSuggeredValue={setValue}
        classname="absolute bottom-5 right-5"
      />
    </div>
  );
};

interface AssistantTextareaProps {
  suggestions: string[];
  classname?: string;
  setSuggeredValue: React.Dispatch<React.SetStateAction<string>>;
}

export const AssistantTextarea = ({
  suggestions,
  classname,
  setSuggeredValue,
}: AssistantTextareaProps) => {
  const [showSuggestion, setShowSuggestion] = useState(false);

  const handleSetSuggeredAnswers = (suggestion: string) => {
    setSuggeredValue(
      `Generer via: ${suggestion}: Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias maxime atque consectetur nam! Suscipit voluptates iusto porro ratione a iure magnam ipsa aliquid. Illo, blanditiis iusto eos sint a iste.`
    );
    setShowSuggestion(false);
  };

  return (
    <div className={`flex flex-col gap-2.5  items-end ${classname}`}>
      <div className="flex flex-row items-center gap-3 cursor-pointer">
        {!showSuggestion && (
          <span
            onClick={() => setShowSuggestion(!showSuggestion)}
            className="text-base font-semibold text-[#087F83] bg-[#F2F8F8] px-3.5 py-2 rounded-full"
          >
            Besoin d'un coup de main ?
          </span>
        )}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setShowSuggestion(!showSuggestion)}
        >
          <rect width="48" height="48" rx="24" fill="#62E7EB" />
          <path
            d="M25.9082 12.9769C24.7408 12.2473 23.2596 12.2473 22.0922 12.9769L14.8922 17.4769C13.8396 18.1348 13.2002 19.2884 13.2002 20.5297V27.4693C13.2002 28.7105 13.8396 29.8642 14.8922 30.5221L22.0922 35.0221C23.2596 35.7517 24.7408 35.7517 25.9082 35.0221L33.1082 30.5221C34.1608 29.8642 34.8002 28.7105 34.8002 27.4693V20.5297C34.8002 19.2884 34.1608 18.1348 33.1082 17.4769L25.9082 12.9769Z"
            fill="white"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        {showSuggestion && (
          <span
            className="font-semibold text-base text-black"
            onClick={() => setShowSuggestion(!showSuggestion)}
          >
            Assistant Legaleo
          </span>
        )}
      </div>
      {showSuggestion && (
        <div className="flex flex-col items-end gap-2.5">
          {suggestions.map((suggestion: string, index: number) => (
            <span
              key={index}
              onClick={() => handleSetSuggeredAnswers(suggestion)}
              className="text-base font-semibold text-[#087F83] bg-[#F2F8F8] px-3.5 py-2 rounded-full cursor-pointer"
            >
              {suggestion}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export const ImportImage = () => {
  const [imageSrc, setImageSrc] = useState<any>(
    "../../app/assets/images/pdp.png"
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file); // crée une URL temporaire
      setImageSrc(url);
    }
  };

  const handleRemoveImage = (e: any) => {
    e.preventDefault();
    setImageSrc("../../app/assets/images/pdp.png");
  };

  return (
    <div className="flex flex-row items-center gap-4 mb-5">
      <Image
        src={imageSrc}
        alt="photo de profil"
        width={80}
        height={80}
        className="rounded-full w-20 h-20"
      />
      <div className="flex flex-row gap-4 items-center">
        <label
          htmlFor="photo_profil"
          className="bg-[#F2F2F2] py-2 px-4 rounded-sm text-xs font-bold cursor-pointer text-[#828282] hover:bg-[#E0E0E0] transition"
        >
          Importer une image
        </label>
        <input
          type="file"
          name="photo_profil"
          id="photo_profil"
          className="hidden"
          onChange={handleImageChange}
        />
        <Button
          href="#"
          classname="!text-xs"
          onclick={(e) => handleRemoveImage(e)}
        >
          Supprimer
        </Button>
      </div>
    </div>
  );
};

interface TextareaAndFilesProps {
  name: string;
  id: string;
  classname?: string;
  placeholder: string;
}

export const TextareaAndFiles = ({
  id,
  name,
  classname,
  placeholder,
}: TextareaAndFilesProps) => {
  const [value, setValue] = useState<string | File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setValue(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div
      className="flex flex-col gap-0 border border-[#E3E3E3] rounded-xl h-[307px] relative p-5"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <textarea
        name={`textarea-${name}`}
        id={`textarea-${id}`}
        className="appearance-none p-0 text-xl font-medium text-black h-full w-full resize-none outline-none"
        placeholder={placeholder}
        onChange={handleTextChange}
      ></textarea>
      <label htmlFor={`file-${id}`} className="absolute bottom-7 right-5">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="20" fill="#E5E7FF" />
          <path
            d="M20.0009 25.5556V10"
            stroke="#545FFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28.8911 30.0009H11.1133"
            stroke="#545FFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25.5575 20L20.0009 25.5567L14.4453 20"
            stroke="#545FFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>
      <input
        type="file"
        className="hidden"
        id={`file-${id}`}
        name={`file-${name}`}
        onChange={handleFileChange}
      />
    </div>
  );
};
