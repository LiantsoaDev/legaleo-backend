"use client";
import {
  ImportImage,
  Input,
  RadioGroup,
  TextareaAndFiles,
  TextareaIA,
} from "@/components/Form";
import { Paragraphe } from "@/components/Typography";
import { Question } from "@/utils/types";
import { useEffect, useState } from "react";

interface ConditionnalFormProps {
  questions: Question[];
}

export default function ConditionalForm({ questions }: ConditionnalFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [visibleQuestions, setVisibleQuestions] = useState<string[]>(["q1"]);

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
          // si condition non définie -> visible (optionnel)
          const condMet = q.condition ? parentValue === q.condition : true;
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
  }, [answers]);

  const handleAnswer = (id: string, value: string) => {
    // debug
    // console.log("handleAnswer", id, value);
    setAnswers((prev) => ({ ...prev, [id]: value }));
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
                  name={question.label}
                  questionId={question.id}
                  setAnswers={setAnswers}
                  id={question.label}
                  showLogo={question.showLogo ? true : false}
                />
              </div>
            );

          case "text":
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
                    type="text"
                    className="w-full border border-opacity-60 rounded-sm px-2 py-3 md:px-4 md:py-4 lg:px-2 lg:py-3 md:text-lg lg:text-base focus:outline-none focus:bg-white focus:text-black outline-none text-black"
                    name={question.label}
                    placeholder={
                      question.placeholder
                        ? question.placeholder
                        : question.label
                    }
                    id={question.id}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
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
                      name={question.subquestion.label}
                      placeholder={
                        question.subquestion.placeholder
                          ? question.subquestion.placeholder
                          : question.subquestion.label
                      }
                      id={question.subquestion.id}
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
                    name={question.label}
                    placeholder={
                      question.placeholder
                        ? question.placeholder
                        : question.label
                    }
                    id={question.id}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
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
                      name={question.subquestion.label}
                      placeholder={
                        question.subquestion.placeholder
                          ? question.subquestion.placeholder
                          : question.subquestion.label
                      }
                      id={question.subquestion.id}
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
                  name={question.label}
                  suggestions={[
                    "Générer un exemple selon mon secteur",
                    "M’aider à structurer ma réponse",
                    "Reformuler ma réponse actuelle",
                  ]}
                />
              </div>
            ) : (
              <Input
                key={question.id}
                name={question.label}
                label={question.label}
                placeholder={
                  question.placeholder ? question.placeholder : question.label
                }
                type="textarea"
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M28.8886 30.0009H11.1108"
                      stroke="#545FFF"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M25.5556 20L19.9989 25.5567L14.4434 20"
                      stroke="#545FFF"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleAnswer(question.id, file.name);
                  }}
                />
              </div>
            );

          case "textareaAndFile":
            return (
              <div className="flex flex-col gap-2" key={question.id}>
                <p className="font-medium">{question.label}</p>
                <TextareaAndFiles
                  id={question.id}
                  name={question.label}
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
                          name={qst.label}
                          placeholder={
                            qst.placeholder ? qst.placeholder : qst.label
                          }
                          id={index}
                        />
                      )}
                      {qst.type === "yesno" && (
                        <RadioGroup
                          options={
                            qst.option ? qst.option : ["✅ Oui", "❌ Non"]
                          }
                          name={qst.label}
                          setAnswers={setAnswers}
                          id={qst.label}
                          showLogo={qst.showLogo ? true : false}
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
