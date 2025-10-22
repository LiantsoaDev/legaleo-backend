"use client";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_TABLE_COMMAND } from "@lexical/table";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Form";
import { Title } from "../Typography";

interface AddTablePopupProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddTablePopup = ({ show, setShow }: AddTablePopupProps) => {
  const [editor] = useLexicalComposerContext();
  const [columns, setColumns] = useState("3");
  const [rows, setRows] = useState("3");

  useEffect(() => {
    console.log("Rows:", rows, "Columns:", columns);
  }, [rows, columns]);

  const insertTable = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const columnValue = parseInt(form.column.value) || 3;
      const rowsValue = parseInt(form.ligne.value) || 3;

      editor.dispatchCommand(INSERT_TABLE_COMMAND, {
        columns: String(columnValue),
        rows: String(rowsValue),
      });
      setShow(false);
    },
    [editor]
  );

  return (
    <form
      onSubmit={(e) => insertTable(e)}
      className="flex flex-col gap-2.5 p-3.5 bg-white border border-[#E3E3E3] rounded-sm w-[298px] shadow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <Title className="font-bold text-xl">Inserer un tableau</Title>
      <div className="flex flex-col gap-2.5">
        <Input
          type="text"
          placeholder="Nombre de column default 3"
          name="column"
          onChange={(e) => setColumns(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Nombre de ligne default 3"
          name="ligne"
          onChange={(e) => setRows(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-row gap-2.5 mt-5 items-center justify-end">
        <Button
          classname="!text-[#087F83] !text-xs !font-semibold w-fit"
          href="#"
          onclick={(e) => {
            e.preventDefault();
            setShow(false);
          }}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          classname="!w-fit !px-2.5 !py-1.5 !bg-[#087F83] !text-xs !font-semibold !text-white hover:!border-none"
        >
          Ajouter
        </Button>
      </div>
    </form>
  );
};
