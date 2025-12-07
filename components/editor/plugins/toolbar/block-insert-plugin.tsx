"use client";

import { TableIcon } from "lucide-react";

import { useEditorModal } from "@/components/Editor/editor-hooks/use-modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from "@/components/ui/select";

export function BlockInsertPlugin({ children }: { children: React.ReactNode }) {
  const [modal] = useEditorModal();

  return (
    <>
      {modal}
      <Select value={""}>
        <SelectTrigger className="!h-8 w-min gap-1">
          <TableIcon className="size-5 !text-[#087F83]" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{children}</SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
