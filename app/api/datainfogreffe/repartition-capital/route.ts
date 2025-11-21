import { NextResponse } from "next/server";

const API_KEY = process.env.DATAINFOGREFFE_API_KEY;
const BASE_URL = process.env.DATAINFOGREFFE_BASE_URL;

const REPARTITION_PATH = "/api/v1/Entreprise/RepartitionCapital";

const buildUrl = (siren: string) => {
  const trimmedBase = BASE_URL?.replace(/\/$/, "") ?? "";
  const query = new URLSearchParams({
    siren,
    restitution: "json",
  });

  if (API_KEY) {
    query.append("token", API_KEY);
  }

  return `${trimmedBase}${REPARTITION_PATH}?${query.toString()}`;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const siret = searchParams.get("siret") ?? "";
  const siren = siret.replace(/\D/g, "").slice(0, 9);

  if (!siren || siren.length < 9) {
    return NextResponse.json(
      { error: "Numéro SIRET/SIREN invalide." },
      { status: 400 }
    );
  }

  if (!API_KEY || !BASE_URL) {
    return NextResponse.json(
      {
        error:
          "Configuration manquante : veillez à renseigner DATAINFOGREFFE_API_KEY et DATAINFOGREFFE_BASE_URL.",
      },
      { status: 500 }
    );
  }

  try {
    const url = buildUrl(siren);
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Impossible de récupérer les données de DataInfogreffe." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur DataInfogreffe", error);
    return NextResponse.json(
      { error: "Erreur lors de l'appel à DataInfogreffe." },
      { status: 500 }
    );
  }
}
