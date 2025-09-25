"use client";

import { useState } from "react";

type WorkspaceItemProps = {
  name: string;
};

export const WorkspaceItem = ({ name }: WorkspaceItemProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="w-4 h-4 border-gray-400 rounded"
      />
      <div className="flex items-center gap-2">
        {/* Avatar rond avec initiale */}
        <div className="w-7 h-7 rounded-full bg-[#E6F2F2] flex items-center justify-center">
          <span className="text-[#087F83] font-semibold">A</span>
        </div>
        {/* Texte */}
        <span className="text-sm text-[#1F120E] font-medium">{name}</span>
      </div>
    </label>
  );
};
