"use client";
import {
  DynamicTextInputs,
  ImportImage,
  Input,
  RadioGroup,
  TextareaAndFiles,
  TextareaIA,
} from "@/components/Form";
import { Paragraphe } from "@/components/Typography";
import { updateFormData } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import { Question } from "@/utils/types";
import { useEffect, useMemo, useState } from "react";
import { useOnboardingFormData } from "./OnboardingFormContext";

interface ConditionnalFormProps {
  questions: Question[];
  formKey?: string;
}

export default function ConditionalForm({
  questions,
  formKey,
}: ConditionnalFormProps) {
  const onboardingFormData = useOnboardingFormData();
  const dispatch = useAppDispatch();
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [visibleQuestions, setVisibleQuestions] = useState<string[]>(["q1"]);

  const getFieldName = (questionId: string) =>
    formKey ? `${formKey}.${questionId}` : questionId;

  const savedAnswers = useMemo(() => {
    const initial: Record<string, string | string[]> = {};
    questions.forEach((question) => {
      const storedValue = onboardingFormData?.[getFieldName(question.id)];
      if (typeof storedValue === "string" || Array.isArray(storedValue)) {
        initial[question.id] = storedValue;
      }
    });
    return initial;
  }, [onboardingFormData, questions, formKey]);

  // Recalculer quelles questions doivent être visibles à chaque changement des réponses.
  useEffect(() => {
    const visible = new Set<string>();
    // la première question est toujours visible (si tu veux une autre règle, adapte ici)
    visible.add("q1");

    // itérer plusieurs fois si besoin (pour gérer des chaînes plus longues)
    let changed = true;
    while (changed) {
      changed = false;
      for (const q of questions) {
        if (q.dependsOn && visible.has(q.dependsOn)) {
          const parentValue = answers[q.dependsOn];
          const normalizedParentValue =
            typeof parentValue === "string" ? parentValue : undefined;
          // si condition non définie -> visible (optionnel)
          const condMet = q.condition
            ? normalizedParentValue === q.condition
            : true;
          if (condMet && !visible.has(q.id)) {
            visible.add(q.id);
            changed = true;
          }
        }
      }
    }

    const nextVisible = Array.from(visible);
    // debug
    // console.log("Recomputed visibleQuestions:", nextVisible, "answers:", answers);

    setVisibleQuestions(nextVisible);
  }, [answers, questions]);

  useEffect(() => {
    if (!Object.keys(savedAnswers).length) return;
    setAnswers((prev) => ({ ...savedAnswers, ...prev }));
  }, [savedAnswers]);

  const persistAnswer = (
    questionId: string,
    value: string | string[],
    { skipUpdate }: { skipUpdate?: boolean } = {}
  ) => {
    if (skipUpdate) return;
    const fieldName = getFieldName(questionId);
    dispatch(updateFormData({ [fieldName]: value }));
  };

  const handleAnswer = (
    id: string,
    value: string | string[],
    options: { skipUpdate?: boolean } = {}
  ) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    persistAnswer(id, value, options);
  };

  const resolveValue = (questionId: string) => {
    const currentValue = answers[questionId];
    if (typeof currentValue === "string") return currentValue;
    const storedValue = onboardingFormData?.[getFieldName(questionId)];
    if (typeof storedValue === "string") return storedValue;
    return "";
  };

  return (
    <div className="flex flex-col gap-8">
      {questions.map((question) => {
        if (!visibleQuestions.includes(question.id)) return null;

        switch (question.type) {
          case "yesno":
            return (
              <div key={question.id} className="flex flex-col gap-8">
                <p className="font-medium mb-2">{question.label}</p>
                <RadioGroup
                  options={
                    question.option ? question.option : ["✅ Oui", "❌ Non"]
                  }
                  name={getFieldName(question.id)}
                  questionId={question.id}
                  id={question.label}
                  showLogo={question.showLogo ? true : false}
                  defaultValue={resolveValue(question.id)}
                  onChange={(normalizedValue) =>
                    handleAnswer(question.id, normalizedValue)
                  }
                />
                {question.hasAutre && (
                  <div className="flex items-center gap-2">
                    <span className="text-text text-xl font-medium">
                      Autre:{" "}
                    </span>
                    <Input
                      type="text"
                      name={`${getFieldName(question.id)}.autre`}
                      placeholder="Autre"
                      classname="max-w-[600px] px-6 py-4"
                      defaultValue={resolveValue(`${question.id}.autre`)}
                      onChange={(e) =>
                        handleAnswer(`${question.id}.autre`, e.target.value)
                      }
                    />
                  </div>
                )}
                {question.hasTextarea && (
                  <Input
                    key={question.label}
                    name={`${getFieldName(question.id)}.precision`}
                    placeholder="Ajouter des précisions si besoin."
                    type="textarea"
                    defaultValue={resolveValue(`${question.id}.precision`)}
                    onChange={(e) =>
                      handleAnswer(`${question.id}.precision`, e.target.value)
                    }
                  />
                )}
              </div>
            );

          case "text":
            return (
              <div className="flex flex-col gap-5" key={question.id}>
                <div className="flex flex-col gap-2">
                  {question.hasMultipleInputs ? (
                    <>
                      <DynamicTextInputs
                        key={question.id}
                        question={question}
                        onChange={(values: any) =>
                          handleAnswer(question.id, values)
                        }
                      />
                    </>
                  ) : question.inputListQuestions ? (
                    <>
                      <label
                        htmlFor={question.id}
                        className="font-semibold text-md text-black"
                      >
                        {question.label}
                      </label>
                      <div className="flex flex-row items-center gap-7">
                        {question.inputListQuestions.map((inputQst, index) => (
                          <Input
                            key={index}
                            name={getFieldName(
                              `${question.id}.${inputQst.name ?? index}`
                            )}
                            placeholder={inputQst.placeholder}
                            type={inputQst.type}
                            label={inputQst.label}
                            defaultValue={resolveValue(
                              `${question.id}.${inputQst.name ?? index}`
                            )}
                            onChange={(e) =>
                              handleAnswer(
                                `${question.id}.${inputQst.name ?? index}`,
                                e.target.value
                              )
                            }
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <label
                        htmlFor={question.id}
                        className="font-semibold text-md text-black"
                      >
                        {question.label}
                      </label>
                      <input
                        type="text"
                        className="w-full border border-opacity-60 rounded-sm px-2 py-3 md:px-4 md:py-4 lg:px-2 lg:py-3 md:text-lg lg:text-base focus:outline-none focus:bg-white focus:text-black outline-none text-black"
                        name={getFieldName(question.id)}
                        placeholder={
                          question.placeholder
                            ? question.placeholder
                            : question.label
                        }
                        id={question.id}
                        onChange={(e) =>
                          handleAnswer(question.id, e.target.value)
                        }
                        value={resolveValue(question.id)}
                      />
                    </>
                  )}

                  {question.hasTextarea && (
                    <Input
                      key={question.label}
                      name={`${getFieldName(question.id)}.precision`}
                      placeholder="Ajouter des précisions si besoin."
                      type="textarea"
                      defaultValue={resolveValue(`${question.id}.precision`)}
                      onChange={(e) =>
                        handleAnswer(`${question.id}.precision`, e.target.value)
                      }
                    />
                  )}
                </div>
                {question.subquestion && (
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={question.subquestion.id}
                      className="font-semibold text-md text-black"
                    >
                      {question.subquestion.label}
                    </label>
                    <input
                      type={question.subquestion.type}
                      className="w-full border border-opacity-60 rounded-sm px-2 py-3 md:px-4 md:py-4 lg:px-2 lg:py-3 md:text-lg lg:text-base focus:outline-none focus:bg-white focus:text-black outline-none text-black"
                      name={`${getFieldName(question.id)}.subquestion`}
                      placeholder={
                        question.subquestion.placeholder
                          ? question.subquestion.placeholder
                          : question.subquestion.label
                      }
                      id={question.subquestion.id}
                      value={resolveValue(`${question.id}.subquestion`)}
                      onChange={(e) =>
                        handleAnswer(`${question.id}.subquestion`, e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            );

          case "number":
            return (
              <div className="flex flex-col gap-5" key={question.id}>
                <div className="flex flex-col gap-2">
                <label
                  htmlFor={question.id}
                  className="font-semibold text-md text-black"
                >
                  {question.label}
                </label>
                <input
                  type="number"
                  className="w-full border border-opacity-60 rounded-sm px-2 py-3 md:px-4 md:py-4 lg:px-2 lg:py-3 md:text-lg lg:text-base focus:outline-none focus:bg-white focus:text-black outline-none text-black"
                  name={getFieldName(question.id)}
                  placeholder={
                    question.placeholder
                      ? question.placeholder
                      : question.label
                  }
                  id={question.id}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  value={resolveValue(question.id)}
                />
                </div>
                {question.subquestion && (
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={question.subquestion.id}
                      className="font-semibold text-md text-black"
                    >
                      {question.subquestion.label}
                    </label>
                    <input
                      type={question.subquestion.type}
                      className="w-full border border-opacity-60 rounded-sm px-2 py-3 md:px-4 md:py-4 lg:px-2 lg:py-3 md:text-lg lg:text-base focus:outline-none focus:bg-white focus:text-black outline-none text-black"
                      name={`${getFieldName(question.id)}.subquestion`}
                      placeholder={
                        question.subquestion.placeholder
                          ? question.subquestion.placeholder
                          : question.subquestion.label
                      }
                      id={question.subquestion.id}
                      value={resolveValue(`${question.id}.subquestion`)}
                      onChange={(e) =>
                        handleAnswer(`${question.id}.subquestion`, e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            );

          case "textarea":
            return question.needIA ? (
              <div className="flex flex-col gap-8" key={question.id}>
                <p className="font-medium mb-2">{question.label}</p>
                <TextareaIA
                  name={getFieldName(question.id)}
                  suggestions={[
                    "Générer un exemple selon mon secteur",
                    "M’aider à structurer ma réponse",
                    "Reformuler ma réponse actuelle",
                  ]}
                  classname=""
                />
              </div>
            ) : (
              <Input
                key={question.id}
                name={getFieldName(question.id)}
                label={question.label}
                placeholder={
                  question.placeholder ? question.placeholder : question.label
                }
                type="textarea"
                defaultValue={resolveValue(question.id)}
                onChange={(e) => handleAnswer(question.id, e.target.value)}
              />
            );
          case "image":
            return (
              <div className="flex flex-col gap-5" key={question.id}>
                <p className="font-medium mb-2">{question.label}</p>
                <ImportImage />
              </div>
            );

          case "file":
            return (
              <div
                key={question.id}
                className="flex flex-col gap-2.5 justify-center"
              >
                <Paragraphe className="font-medium text-xl">
                  {question.label}
                </Paragraphe>
                <label
                  htmlFor={question.id}
                  className="flex flex-col gap-3 bg-[#F8F9FA] p-5 rounded-md items-center w-[526px] cursor-pointer"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="40" height="40" rx="20" fill="#E5E7FF" />
                    <path
                      d="M19.9999 25.5556V10"
                      stroke="#545FFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M28.8886 30.0009H11.1108"
                      stroke="#545FFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M25.5556 20L19.9989 25.5567L14.4434 20"
                      stroke="#545FFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Paragraphe className="font-medium text-base text-black">
                    Glissez ou importez votre fichier içi
                  </Paragraphe>
                  <span className="font-medium text-sm text-[#828282]">
                    Format accepté: PDF ou DOCX
                  </span>
                </label>
                <input
                  type="file"
                  className="hidden"
                  id={question.id}
                  name={getFieldName(question.id)}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file)
                      handleAnswer(question.id, file.name, { skipUpdate: true });
                  }}
                />
              </div>
            );

          case "textareaAndFile":
            return (
              <div className="flex flex-col gap-2" key={question.id}>
                <p className="font-medium">{question.label}</p>
                <TextareaAndFiles
                  id={getFieldName(question.id)}
                  name={getFieldName(question.id)}
                  placeholder={
                    question.placeholder ? question.placeholder : question.label
                  }
                />
              </div>
            );

          case "array":
            return (
              <div className="flex flex-col gap-2" key={question.id}>
                {question.questions &&
                  question.questions.map((qst, index: any) => (
                    <div key={index} className="flex flex-col gap-2">
                      <label htmlFor="" className="font-medium">
                        {qst.label}
                      </label>
                      {qst.type !== "yesno" && (
                        <input
                          type={qst.type}
                          className="w-full border border-opacity-60 rounded-sm px-2 py-3 md:px-4 md:py-4 lg:px-2 lg:py-3 md:text-lg lg:text-base focus:outline-none focus:bg-white focus:text-black outline-none text-black"
                          name={`${getFieldName(question.id)}.${index}`}
                          placeholder={
                            qst.placeholder ? qst.placeholder : qst.label
                          }
                          id={index}
                          value={
                            typeof answers[`${question.id}-${index}`] ===
                            "string"
                              ? (answers[`${question.id}-${index}`] as string)
                              : ""
                          }
                          onChange={(e) =>
                            handleAnswer(
                              `${question.id}-${index}`,
                              e.target.value
                            )
                          }
                        />
                      )}
                      {qst.type === "yesno" && (
                        <RadioGroup
                          options={
                            qst.option ? qst.option : ["✅ Oui", "❌ Non"]
                          }
                          name={`${getFieldName(question.id)}.${index}`}
                          id={qst.label}
                          showLogo={qst.showLogo ? true : false}
                          defaultValue={resolveValue(`${question.id}-${index}`)}
                          onChange={(normalizedValue) =>
                            handleAnswer(`${question.id}-${index}`, normalizedValue)
                          }
                        />
                      )}
                    </div>
                  ))}
              </div>
            );

          default:
            return null;
        }
      })}

      {/* <pre className="bg-gray-100 text-sm p-2 rounded">
        {JSON.stringify({ visibleQuestions, answers }, null, 2)}
      </pre> */}
    </div>
  );
}
