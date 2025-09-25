"use client";

import { Check } from "lucide-react";
import { useState } from "react";

export default function NotificationsList() {
  const [allChecked, setAllChecked] = useState(false);

  const items = [
    "Lorem ipsum dolor",
    "Lorem ipsum dolor",
    "Lorem ipsum dolor",
    "Lorem ipsum dolor",
  ];

  return (
    <div className="space-y-2">
      {/* Checkbox principale */}
      <label className="flex items-center gap-2 font-medium">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={() => setAllChecked(!allChecked)}
          className="h-4 w-4 rounded border-gray-400"
        />
        Recevoir toutes les notifications
      </label>

      {/* Liste des items */}
      <ul className="space-y-2 pl-6">
        {items.map((text, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-green-500">
              <Check className="h-4 w-4 text-white" />
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
