"use client";

import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  usePlateEditorRef,
  toggleMark,
  toggleNodeType,
  setAlign,
} from "@udecode/plate-common";

export function Toolbar() {
  const editor = usePlateEditorRef();

  return (
    <div className="flex items-center gap-2 border-b p-2 bg-gray-50">
      <Toggle
        pressed={false}
        onPressedChange={() => toggleMark(editor, { key: "bold" })}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={false}
        onPressedChange={() => toggleMark(editor, { key: "italic" })}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={false}
        onPressedChange={() => toggleMark(editor, { key: "underline" })}
      >
        <Underline className="h-4 w-4" />
      </Toggle>

      <Toggle
        pressed={false}
        onPressedChange={() => toggleNodeType(editor, { activeType: "h1" })}
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={false}
        onPressedChange={() => toggleNodeType(editor, { activeType: "h2" })}
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>

      <Toggle
        pressed={false}
        onPressedChange={() => setAlign(editor, { align: "left" })}
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={false}
        onPressedChange={() => setAlign(editor, { align: "center" })}
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={false}
        onPressedChange={() => setAlign(editor, { align: "right" })}
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>

      <Toggle
        pressed={false}
        onPressedChange={() => toggleNodeType(editor, { activeType: "ul" })}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={false}
        onPressedChange={() => toggleNodeType(editor, { activeType: "ol" })}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
