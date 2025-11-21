export type CapitalDetentionEntry = {
  Identification?: {
    TypePersonne?: string;
    Denomination?: string | null;
    Siren?: string | null;
  };
  PourcentageDetention?: number;
};

export type DataInfogreffeResponse = {
  Data?: {
    Data?: {
      SocieteInfos?: {
        Denomination?: string | null;
      };
      CapitalDetention?: CapitalDetentionEntry[];
    };
  };
};

export const extractMainEntityName = (
  response: DataInfogreffeResponse
): string | null => {
  return response?.Data?.Data?.SocieteInfos?.Denomination ?? null;
};

export const extractMajorShareholder = (
  response: DataInfogreffeResponse
): { denomination: string; siren?: string | null } | null => {
  const entries = response?.Data?.Data?.CapitalDetention;

  if (!entries || !Array.isArray(entries)) return null;

  const personneMorale = entries
    .filter(
      (entry) =>
        entry?.Identification?.TypePersonne === "Personne Morale" &&
        typeof entry.PourcentageDetention === "number"
    )
    .sort(
      (a, b) => (b.PourcentageDetention ?? 0) - (a.PourcentageDetention ?? 0)
    );

  if (!personneMorale.length) return null;

  const top = personneMorale[0];
  const denomination = top?.Identification?.Denomination;

  if (!denomination) return null;

  return {
    denomination,
    siren: top?.Identification?.Siren ?? null,
  };
};

export const resolveWorkspaceName = (
  response: DataInfogreffeResponse
): { workspaceName: string | null; companyName: string | null; shareholder?: { denomination: string; siren?: string | null } | null } => {
  const companyName = extractMainEntityName(response);
  const shareholder = extractMajorShareholder(response);
  const workspaceName = shareholder?.denomination ?? companyName ?? null;

  return { workspaceName, companyName, shareholder };
};
