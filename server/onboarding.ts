import { toast } from "react-toastify";

export const getOnboardings = async () => {
  try {
    const res = await fetch("/api/user/onboarding");
    if (!res.ok) throw new Error("Erreur serveur");
    return await res.json();
  } catch (error) {
    toast.error("Impossible de recuperer les données", {
      position: "top-right",
      theme: "colored",
    });
    return null;
  }
};

export const postOnboardingData = async (data: Record<string, any>) => {
  try {
    const res = await fetch("/api/user/onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur serveur");
    console.log("Données envoyées avec succès", res);
    return await res.json();
  } catch (error) {
    toast.error("Impossible d'envoyer les données", {
      position: "top-right",
      theme: "colored",
    });
    return null;
  }
};
