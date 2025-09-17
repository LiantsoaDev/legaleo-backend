"use client";

import { Title } from "@/components/Typography";
import { useState } from "react";
import { BulkImport } from "./BulkImport";
import { ManualImport } from "./ManualImport";

export const ImportClause = () => {
  const [showBulkImport, setShowBulkImport] = useState(false);
  return (
    <div className="bg-white w-1/2 h-screen absolute top-0 right-0 z-10 py-10 px-6 shadow-lg">
      <Title level={3} className="text-xl font-semibold mb-4 text-black">
        Importer une clause
      </Title>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center">
          <div
            className={`w-1/2 py-3 font-semibold text-xs text-center cursor-pointer ${
              showBulkImport ? "" : "border-b-2 border-b-[#62E7EB]"
            }`}
            onClick={() => setShowBulkImport(!showBulkImport)}
          >
            Importer manuellement
          </div>
          <div
            className={`w-1/2 py-3 font-semibold text-xs text-center cursor-pointer ${
              showBulkImport ? "border-b-2 border-b-[#62E7EB]" : ""
            }`}
            onClick={() => setShowBulkImport(!showBulkImport)}
          >
            Bulk import
          </div>
        </div>
      </div>
      {showBulkImport ? <BulkImport /> : <ManualImport />}
    </div>
  );
};
