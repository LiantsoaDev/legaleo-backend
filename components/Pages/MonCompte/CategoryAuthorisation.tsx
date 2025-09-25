"use client";

import { useState } from "react";

type Category = {
  title: string;
  items: string[];
};

export default function CategoryAuthorisation() {
  const categories: Category[] = [
    { title: "Catégorie 1", items: Array(7).fill("Lorem ipsum dolor") },
    { title: "Catégorie 2", items: Array(5).fill("Lorem ipsum dolor") },
    { title: "Catégorie 3", items: Array(6).fill("Lorem ipsum dolor") },
  ];

  // état pour savoir quelle catégorie est ouverte
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleCategory = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-xl space-y-4">
      {categories.map((category, index) => (
        <div key={index} className="rounded-lg border shadow-sm">
          {/* Header */}
          <button
            onClick={() => toggleCategory(index)}
            className="w-full flex justify-between items-center px-4 py-3 font-medium text-gray-800 hover:bg-gray-50 rounded-t-lg"
          >
            {category.title}
            <span
              className={`transform transition-transform ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
            >
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 1L7.70711 6.29289C7.31658 6.68342 6.68342 6.68342 6.29289 6.29289L1 1"
                  stroke="#86A2A3"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>

          {/* Contenu */}
          {openIndex === index && (
            <div className="px-4 pb-4">
              <ul className="space-y-2 mt-2">
                {category.items.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`cat-${index}-item-${idx}`}
                      className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                    />
                    <label
                      htmlFor={`cat-${index}-item-${idx}`}
                      className="text-sm text-gray-700"
                    >
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
