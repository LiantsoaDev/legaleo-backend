"use client";
import { useState } from "react";
import { TableUsers } from "./TableUsers";

const contracts = [
  {
    name: "Thomas Morel",
    email: "th.morel@boulangerielune.fr",
    role: "Signataire",
    documentAssocier: "Contrat ACME",
    status: "En attente",
    date_invitation: "12/09/2023",
  },
  {
    name: "Thomas Morel",
    email: "th.morel@boulangerielune.fr",
    role: "Lecteur",
    documentAssocier: "Contrat ACME",
    status: "Acceptée",
    date_invitation: "12/09/2023",
  },
  {
    name: "Thomas Morel",
    email: "th.morel@boulangerielune.fr",
    role: "Commentateur",
    documentAssocier: "NDA BagelCorner",
    status: "Expirée",
    date_invitation: "12/09/2023",
  },
  {
    name: "Thomas Morel",
    email: "th.morel@boulangerielune.fr",
    role: "Commentateur",
    documentAssocier: "NDA BagelCorner",
    status: "Refusée",
    date_invitation: "12/09/2023",
  },
];

export const Invites = () => {
  const [selectedContrat, setSelectedContrat] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <TableUsers
        contrats={contracts}
        selectedContrat={selectedContrat}
        setSelectedContrat={setSelectedContrat}
        isMembers={false}
      />
    </div>
  );
};
