"use client";
import { Title } from "@/components/Typography";
import { useEffect, useState } from "react";

export const DocumentName = () => {
  const [currentName, setCurrentName] = useState("Nouveaut document");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {}, [currentName]);

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          onChange={(e) => setCurrentName(e.target.value)}
          value={currentName}
          className="font-bold border-none outline-none"
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <Title onDbClick={() => setIsEditing(true)} className="font-bold">
          {currentName}
        </Title>
      )}
    </div>
  );
};
