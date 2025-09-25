// components/ToggleList.tsx
"use client";

import { useState } from "react";

export default function ToggleList() {
  // 3 toggles avec état
  const [toggles, setToggles] = useState([true, true, false]);

  const handleToggle = (index: number) => {
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
  };

  return (
    <div className="space-y-3">
      {toggles.map((value, i) => (
        <div key={i} className="flex items-center space-x-2">
          {/* bouton toggle */}
          <button
            onClick={() => handleToggle(i)}
            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
              value ? "bg-teal-700" : "bg-gray-300"
            }`}
          >
            <span
              className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                value ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>

          {/* texte */}
          <span className="text-gray-700 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </span>
        </div>
      ))}
    </div>
  );
}
